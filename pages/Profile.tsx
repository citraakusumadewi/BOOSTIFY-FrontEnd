import React, { useEffect, useState, useRef } from 'react';
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
    console.log('Retrieved authData from localStorage:', authDataString);

    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token; // Adjusted to match your structure
        console.log('Extracted token:', token);

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
        console.log('Fetched user data:', data);
        setProfileData(data);
        setProfileImage(data.image_url || '/user.png');
      } catch (error: any) {
        console.error('Failed to fetch user data:', error.message);
      }
    } else {
      console.warn('No authData found');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
          setProfileData((prevState) => {
            if (!prevState) return null;
            return {
              ...prevState,
              image_url: data.updatedUser.imageUrl, // Adjust based on the response structure
            };
          });
          setProfileImage(data.updatedUser.imageUrl);
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
    console.log('Retrieved authData from localStorage:', authDataString);
  
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token;
        console.log('Extracted token:', token);
  
        const response = await fetch('https://boostify-back-end.vercel.app/api/personalrec', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
        }
  
        const data = await response.json();
        console.log('Fetched attendance data:', data);
        setAttendanceData(data.attendancesTime || []);
      } catch (error: any) {
        console.error('Failed to fetch attendance data:', error.message);
      }
    } else {
      console.warn('No authData found');
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
            <h3>Edit Profile Picture</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            <button onClick={handleDeleteImage}>Delete Image</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
