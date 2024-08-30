import React, { useEffect, useState } from 'react';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';
import styles from './Profile.module.css';

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
      } catch (error: any) {
        console.error('Failed to fetch user data:', error.message);
      }
    } else {
      console.warn('No authData found');
    }
  };

  const fetchAttendanceData = async () => {
    const authDataString = localStorage.getItem('authData');
    console.log('Retrieved authData from localStorage:', authDataString);

    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token; // Adjusted to match your structure
        console.log('Extracted token:', token);

        const response = await fetch('https://boostify-back-end.vercel.app/api/personalrec', {
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
        setAttendanceData(data.attendancesTime);
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
    <div className={styles.container}>
      <HomeNav />
      <main className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {profileData?.image_url ? (
              <img src={profileData.image_url} alt="User Avatar" className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarText}>
                {profileData?.assisstant_code || 'N/A'}
              </div>
            )}
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
            <p>No attendance history available</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
