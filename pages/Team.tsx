import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './Team.module.css';
import Navbar from '../components/Navbar';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';

const OurTeam: React.FC = () => {
  const { data: session, status } = useSession(); // Use status for better control

  useEffect(() => {
    console.log('Session Data:', session);
    console.log('Session Status:', status);
  }, [session, status]);

  return (
    <div className={styles.container}>
      {status === 'authenticated' ? <HomeNav /> : <Navbar />} {/* Conditionally render Navbar or HomeNav */}

      <main className={styles.mainContent}>
        <h1 className={styles.title}>RESEARCH DIVISION 22</h1>

        <div className={styles.cardSection}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Fullstack</h2>
            <div className={styles.members}>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>MMA</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>SZN</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Frontend</h2>
            <div className={styles.members}>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>CIT</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>LIA</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>ATX</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>AFN</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Machine Learning</h2>
            <div className={styles.members}>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>KNP</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>AKA</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>MFT</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>KSF</p>
              </div>
              <div className={styles.member}>
                <div className={styles.avatar}>
                  <img src="/user.png" alt="User" className={styles.avatarImage} />
                </div>
                <p className={styles.name}>JIN</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OurTeam;
