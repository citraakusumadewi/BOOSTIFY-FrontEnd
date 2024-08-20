import React, { useEffect, useState } from 'react';
import styles from './LiveReport.module.css';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';

interface AttendanceItem {
  id: number;
  assisstant_code: string;
  name: string;
  formattedTime: string;
}

interface ApiResponse {
  assistances: AttendanceItem[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const LiveReport: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('https://c8ec-103-233-100-230.ngrok-free.app/'); // Replace with your Ngrok URL
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        setAttendanceData(data.assistances);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <HomeNav />
      <h1 className={styles.title}>ATTENDANCE</h1>
      <div className={styles.attendanceList}>
        {attendanceData.map((item) => (
          <div key={item.id} className={styles.attendanceItem}>
            <div className={styles.attendanceInfo}>
              <div className={styles.attendanceID}>{item.assisstant_code}</div>
              <div className={styles.attendanceName}>{item.name}</div>
            </div>
            <div>
              <div className={styles.attendanceDate}>{item.formattedTime}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button className={styles.pageButton}>PAGE 1</button>
        <button className={styles.arrowButton}>▶</button>
      </div>
      <Footer />
    </div>
  );
};

export default LiveReport;
