import React, { useEffect, useState } from 'react';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';
import styles from './Profile.module.css';
import { useTheme } from '../pages/ThemeContext';

type AttendanceItem = {
  time: string;
  rawTime: string;
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<{ id: number; name: string; assisstant_code: string; image_url: string } | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);
  const { isDarkMode } = useTheme();
  const [profileImage, setProfileImage] = useState<string>('/user.png');
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchUserData = async () => {
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token;

        const response = await fetch('https://boostify-back-end.vercel.app/api/whoami', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfileData(data);
        setProfileImage(data.image_url || '/user.png');
      } catch (error: any) {
        console.error('Failed to fetch user data:', error.message);
      }
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, JPEG, PNG, and HEIC formats are allowed.');
        return;
      }

      const authDataString = localStorage.getItem('authData');
      if (authDataString) {
        try {
          const authData = JSON.parse(authDataString);
          const token = authData.token.token;

          const formData = new FormData();
          formData.append('image', file); // Match the key expected by multer

          const response = await fetch('https://boostify-back-end.vercel.app/api/uploadImage', {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to upload image: ${response.status} ${errorText}`);
          }

          const data = await response.json();
          const updatedImageUrl = data.updatedUser.imageUrl;

          setProfileData((prevState) => {
            if (!prevState) return null;
            return {
              ...prevState,
              image_url: updatedImageUrl, // Use the updated image URL
            };
          });
          setProfileImage(updatedImageUrl);
        } catch (error: any) {
          console.error('Failed to upload image:', error.message);
        }
      }
    }
  };

  const handleDeleteImage = async () => {
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token;

        const response = await fetch('https://boostify-back-end.vercel.app/api/deleteImage', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete image');
        }

        setProfileImage('/user.png');
        setProfileData((prevState) => {
          if (!prevState) return null;
          return {
            ...prevState,
            image_url: '/user.png', // Reset to default image after deletion
          };
        });
        setShowModal(false);
      } catch (error: any) {
        console.error('Failed to delete image:', error.message);
      }
    }
  };

  const fetchAttendanceData = async () => {
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token;

        const response = await fetch('https://boostify-back-end.vercel.app/api/personalrec', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setAttendanceData([]); // Set to an empty array to display "No attendance history available"
          } else {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
          }
        } else {
          const data = await response.json();
          setAttendanceData(data.attendancesTime || []);
        }
      } catch (error: any) {
        console.error('Failed to fetch attendance data:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAttendanceData();
  }, []);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <HomeNav />
      <main className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <img src={profileImage} alt="User Avatar" className={styles.avatarImage} />
            </div>
            <img 
              src={isDarkMode ? "/pencil-dark.png" : "/pencil-light.png"} 
              alt="Edit Profile" 
              className={styles.pencilIcon}
              onClick={() => setShowModal(true)} 
            />
          </div>
          <h2 className={styles.assistantCode}>{profileData?.assisstant_code || 'N/A'}</h2>
          <h1 className={styles.name}>{profileData?.name || 'Loading...'}</h1>
        </div>
        <section className={styles.attendanceHistory}>
          <h2>Attendance History</h2>
          {attendanceData.length > 0 ? (
            attendanceData.map((item: AttendanceItem, index: number) => (
              <div key={index} className={styles.historyItem}>
                <span className={styles.time}>{item.time}</span>
                <span className={styles.rawTime}>{formatTime(item.rawTime)}</span>
              </div>
            ))
          ) : (
            <p className={styles.noHistoryText}>No attendance history available</p>
          )}
        </section>
      </main>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeIcon} onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h3>Edit Profile Picture</h3>
            
            <label className={styles.fileLabel}>
              <input 
                type="file" 
                accept="image/jpeg,image/jpg,image/png,image/heic" 
                onChange={handleFileChange}
                className={styles.fileInput} 
              />
            </label>
            {/* <p className={styles.noFileChosen}>No file chosen</p> */}
            <div className={styles.buttonContainer}>
              <button className={styles.deleteButton} onClick={handleDeleteImage}>Delete Image</button>
              <button className={styles.uploadButton} onClick={() => setShowModal(false)}>Upload</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
