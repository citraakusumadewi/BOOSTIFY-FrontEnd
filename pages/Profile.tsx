import React from 'react';
import HomeNav from '../components/HomeNav'; 
import Footer from '../components/Footer';
import styles from './Profile.module.css';

type AttendanceItem = {
    date: string;
    time: string;
};

type ProfileProps = {
    name: string;
    attendanceHistory: AttendanceItem[];
};

const Profile: React.FC<ProfileProps> = ({ name, attendanceHistory }) => {
    return (
        <div className={styles.container}>
            <HomeNav />
            
            <main className={styles.main}>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <img src="/user.png" alt="User" className={styles.avatarImage} />
                    </div>
                    <h1 className={styles.name}>{name}</h1>
                </div>
                <section className={styles.attendanceHistory}>
                    <h2>Attendance history</h2>
                    {attendanceHistory.map((item, index) => (
                        <div key={index} className={styles.historyItem}>
                            <span>{item.date}</span>
                            <span>{item.time}</span>
                        </div>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;

export async function getServerSideProps() {
    try {
        // Fetch data from the API endpoint
        const res = await fetch('https://edeb-103-233-100-230.ngrok-free.app/api/profile');
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await res.json();

        // Extract relevant data from the response
        const payload = data.payload || {};
        const name = payload.name || '';
        const attendancesTime = payload.attendancesTime || [];

        // Map attendancesTime to match AttendanceItem type with formatted date and time
        const attendanceHistory = attendancesTime.map((item: { rawTime: string }) => {
            const dateObj = new Date(item.rawTime);

            // Format date to include weekday, day, month, and year
            const formattedDate = new Intl.DateTimeFormat('en-GB', {
                weekday: 'long',  // Full name of the day (e.g., Thursday)
                day: 'numeric',    // Numeric day (e.g., 15)
                month: 'long',     // Full month name (e.g., August)
                year: 'numeric'    // Full year (e.g., 2024)
            }).format(dateObj);

            // Format time as hours and minutes (AM/PM)
            const formattedTime = new Intl.DateTimeFormat('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }).format(dateObj);

            return { date: formattedDate, time: formattedTime };
        });

        // Return the fetched data as props
        return {
            props: {
                name,
                attendanceHistory,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                name: '',
                attendanceHistory: [],
            },
        };
    }
}