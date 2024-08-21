import React, { useEffect, useState } from 'react';
import styles from './LiveReport.module.css';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';

interface AttendanceItem {
  id: number;
  assisstant_code: string;
  name: string;
  time: string;
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
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('https://73n0gdqw-3000.asse.devtunnels.ms/api/attendances', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

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
              <div className={styles.attendanceDate}>{formatDate(item.time)}</div>
              <div className={styles.attendanceTime}>{formatTime(item.time)}</div>
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
