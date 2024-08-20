import React, { useState, useRef, useEffect } from 'react';
import styles from './Recap.module.css';
import HomeNav from '../components/HomeNav';
import Footer from '../components/footer';

const Recap = () => {
  const [filterOpen, setFilterOpen] = useState(false);
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

  const attendanceData = [
    { code: 'CIT', name: 'Citra Kusumadewi Sribawono', points: 107, rank: 1, medal: '/gold-medal.png' },
    { code: 'KNP', name: 'Rizki Nugroho Firdaus', points: 90, rank: 3, medal: '/bronze-medal.png' },
    { code: 'LIA', name: 'Aulia Ramadhani', points: 99, rank: 2, medal: '/silver-medal.png' },
    { code: 'MMA', name: 'Mitchel Mohammad Affandi', points: 77, rank: 4 },
    { code: 'CIT', name: 'Citra Kusumadewi Sribawono', points: 50, rank: 5 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNav />
      <main className={styles.main}>
        <h2 className={styles.heading}>ATTENDANCE RECAP</h2>
        <div className={styles.recap}>
          {attendanceData.slice(0, 3).map((attendee, index) => (
            <div key={index} className={`${styles.recapItem} ${styles[`rank${attendee.rank}`]}`}>
              <div className={`${styles.badge} ${styles[`rank${attendee.rank}`]}`}>
                {attendee.rank <= 3 && (
                  <img src={attendee.medal} alt={`${attendee.code} medal`} className={styles.medalIcon} />
                )}
                <span>{attendee.code}</span>
              </div>
              <p className={styles.points}>{attendee.points}</p>
            </div>
          ))}
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
                <h3>{attendee.code}</h3>
                <p>{attendee.name}</p>
              </div>
              <div className={styles.right}>
                <div className={styles.pointsCard}>
                  <p>{attendee.points}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <button className={styles.pageButton}>PAGE 1</button>
          <button className={styles.arrowButton}>▶</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recap;