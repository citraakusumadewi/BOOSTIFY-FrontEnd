import React, { useEffect, useState } from 'react';
import styles from './LiveReport.module.css';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';

interface CustomUser {
  id?: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string;
}

interface CustomSession extends DefaultSession {
  user: CustomUser;
}
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data: session } = useSession() as { data: CustomSession }; 

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (session?.user?.token) {
        try {
          const token = session.user.token;

          const response = await fetch(`https://boostify-back-end.vercel.app/api/attendances?page=${currentPage}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data: ApiResponse = await response.json();
          setAttendanceData(data.assistances);
          setTotalPages(data.totalPages);
        } catch (error: any) {
          console.error('Failed to fetch attendance data:', error.message);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAttendanceData();
  }, [currentPage, session]);

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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Add logic here to filter attendanceData based on selectedDate
  };

  const currentDate = selectedDate || new Date();

  return (
    <div className={styles.container}>
      <HomeNav />
      <h1 className={styles.title}>ATTENDANCE</h1>
      <div className={styles.filterSection}>
          <label htmlFor="date-picker" className={styles.filterLabel}>
            Select Date:
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            className={styles.datePicker}
            dateFormat="dd/MM/yyyy"
            placeholderText="Click to select a date"
          />
      </div>
      <div className={styles.attendanceList}>
        {attendanceData.map((item) => (
          <div key={`${item.id}-${item.assisstant_code}`} className={styles.attendanceItem}>
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
