import React, { useEffect, useState } from 'react';
import HomeNav from '../components/HomeNav'; 
import Footer from '../components/Footer';
import styles from './Profile.module.css';

type AttendanceItem = {
    time: string;
    rawTime: string;
};

type ProfileProps = {
    name?: string;
    attendanceHistory?: AttendanceItem[];
};

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

const Profile: React.FC<ProfileProps> = () => {
    const [profileData, setProfileData] = useState<any>(null);

    const fetchProfileData = async () => {
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
                setProfileData(data.payload); // Set the fetched data into state
            } catch (error: any) {
                console.error('Failed to fetch profile:', error.message);
            }
        } else {
            console.warn('No token found');
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div className={styles.container}>
            <HomeNav />

            <main className={styles.main}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <div className={styles.avatarText}>{profileData?.assistanceCode || 'N/A'}</div>
                    </div>
                    <h1 className={styles.name}>{profileData?.name || 'Loading...'}</h1>
                </div>
                <section className={styles.attendanceHistory}>
                    <h2>Attendance history</h2>
                    {profileData?.attendancesTime && profileData.attendancesTime.length > 0 ? (
                        profileData.attendancesTime.map((item: AttendanceItem, index: number) => (
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
