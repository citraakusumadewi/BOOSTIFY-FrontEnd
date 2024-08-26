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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchAttendanceData = async (page: number) => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`https://73n0gdqw-3000.asse.devtunnels.ms/api/attendances?page=${page}`, {
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
        setTotalPages(data.totalPages);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData(currentPage);
  }, [currentPage]);

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
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
        {currentPage > 1 && (
          <button 
            className={styles.arrowButton} 
            onClick={handlePreviousPage}
          >
            ◀
          </button>
        )}
        <button className={styles.pageButton} disabled>
          PAGE {currentPage}
        </button>
        {currentPage < totalPages && (
          <button 
            className={styles.arrowButton} 
            onClick={handleNextPage}
          >
            ▶
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LiveReport;
