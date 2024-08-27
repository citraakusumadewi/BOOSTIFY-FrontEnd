import React, { useState, useRef, useEffect } from 'react';
import styles from './Recap.module.css';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';

interface AttendanceItem {
  assisstant_code: string; // Assistant Code
  name: string;
  totalAttendance: number;
}

const Recap: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Default to page 1
  const [totalPages, setTotalPages] = useState<number>(8);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterOpen]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch(`https://boostify-back-end.vercel.app/api/recap?page=${currentPage}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch attendance data');
          }

          const data = await response.json();
          console.log('Fetched data:', data);

          setAttendanceData(data.payload);
          setTotalPages(data.pagination.totalPages); // Update total pages from the response
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
          setLoading(false);
        }
      } else {
        setError('No authentication token found');
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Data for first page's rank section
  const rankedData = attendanceData.slice(0, 3);

  // Data for cards (showing a maximum of 5 cards per page)
  const cardData = attendanceData.slice(3);

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNav />
      <main className={styles.main}>
        <h2 className={styles.heading}>ATTENDANCE RECAP</h2>
        {currentPage === 1 ? (
          // First page specific layout
          <div>
            <div className={styles.recap}>
              {rankedData.map((attendee, index) => {
                const rankClass = index === 0 ? styles.rank1 : index === 1 ? styles.rank2 : styles.rank3;
                const medalIcon = index === 0 
                  ? '/gold-medal.png'
                  : index === 1
                  ? '/silver-medal.png'
                  : '/bronze-medal.png';
                return (
                  <div key={index} className={`${styles.recapItem} ${rankClass}`}>
                    <img src={medalIcon} alt="medal" className={styles.medalIcon} />
                    <div className={styles.badge}>
                      <span>{attendee.assisstant_code}</span> {/* Assistant Code */}
                    </div>
                    <p className={styles.points}>{attendee.totalAttendance}</p> {/* Total Attendance */}
                  </div>
                );
              })}
            </div>
            <div className={styles.filter}>
              <button onClick={toggleFilter} className={styles.filterButton}>Filter</button>
              {filterOpen && (
                <div ref={dropdownRef} className={styles.dropdown}>
                  <p>Sort By:</p>
                  <ul>
                    <li onClick={toggleFilter}>Day</li>
                    <li onClick={toggleFilter}>Month</li>
                    <li onClick={toggleFilter}>Year</li>
                    <li onClick={toggleFilter}>Assistant Code</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.attendanceList}>
              {attendanceData.map((attendee, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.left}>
                    <h3 className={styles.bold}>{attendee.assisstant_code}</h3> {/* Assistant Code */}
                    <p className={styles.bold}>{attendee.name}</p> {/* Name in bold */}
                  </div>
                  <div className={styles.right}>
                    <div className={styles.pointsCard}>
                      <p>{attendee.totalAttendance}</p> {/* Total Attendance */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Other pages layout
          <div className={styles.attendanceList}>
            {attendanceData.map((attendee, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.left}>
                  <h3 className={styles.bold}>{attendee.assisstant_code}</h3> {/* Assistant Code */}
                  <p className={styles.bold}>{attendee.name}</p> {/* Name in bold */}
                </div>
                <div className={styles.right}>
                  <div className={styles.pointsCard}>
                    <p>{attendee.totalAttendance}</p> {/* Total Attendance */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button onClick={handlePreviousPage} className={styles.arrowButton}>
              ◀
            </button>
          )}
          <button className={styles.pageButton} disabled>
            PAGE {currentPage}
          </button>
          {currentPage < totalPages && (
            <button onClick={handleNextPage} className={styles.arrowButton}>
              ▶
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recap;
