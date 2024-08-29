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
    const [profileData, setProfileData] = useState<any>(null);
    const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);

    const fetchUserData = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await fetch('https://boostify-back-end.vercel.app/api/whoami', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfileData(data); // Set the fetched user data into state
            } catch (error: any) {
                console.error('Failed to fetch user data:', error.message);
            }
        } else {
            console.warn('No token found');
        }
    };

    const fetchAttendanceData = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await fetch('https://boostify-back-end.vercel.app/api/personalrec', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAttendanceData(data.attendancesTime); // Set the fetched attendance data into state
            } catch (error: any) {
                console.error('Failed to fetch attendance data:', error.message);
            }
        } else {
            console.warn('No token found');
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
                        <div className={styles.avatarCircle}>
                            {profileData?.assisstant_code || 'N/A'}
                        </div>
                        {profileData?.name && (
                            <h1 className={styles.name}>{profileData.name}</h1>
                        )}
                    </div>
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
