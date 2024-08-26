import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Homenav from '../components/HomeNav';
import Footer from '../components/Footer';
import styles from './About.module.css';

const About: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulasikan pengecekan status autentikasi, ini bisa berupa pengecekan token, cookie, dll.
    const token = localStorage.getItem('token'); // Misalnya, token disimpan di localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {/* Tampilkan Homenav jika sudah sign in, jika tidak, tampilkan Navbar */}
      {isAuthenticated ? <Homenav /> : <Navbar />}
      <div className={styles.container}>
        <h1 className={styles.title}>FEATURES</h1>

        <div className={styles.featuresSection}>
          <div className={styles.featureBox}>
            <h2 className={styles.subTitle}>HOW DOES IT WORK?</h2>
            <ul className={styles.featureList}>
              <li>👤 Stand in front of Boostify</li>
              <li>😊 Smile to the camera</li>
              <li>✔ Presence completes when emoticon appears</li>
            </ul>
          </div>

          <div className={styles.imageBox}>
            <img src="/front-view.png" alt="Boostify Device" className={styles.deviceImage} />
          </div>
        </div>

        <div className={styles.featuresSection}>
          <div className={styles.imageBox}>
            <img src="/back-view.png" alt="Boostify Device" className={styles.deviceImage} />
          </div>

          <div className={styles.featureBox}>
            <h2 className={styles.subTitle}>BOOSTIFY FEATURES</h2>
            <ul className={styles.featureList}>
              <li>▶ TFT Display</li>
              <li>▶ Web Integration</li>
              <li>▶ Speaker</li>
              <li>▶ Anti Spoofing Protection</li>
            </ul>
          </div>
        </div>

        <div className={styles.benefitsSection}>
          <h2 className={styles.benefitTitle}>WHY CHOOSE BOOSTIFY?</h2>

          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>😊</span>
            <div>
              <h3 className={styles.benefitSubTitle}>Happiness and Productivity</h3>
              <p>Smiles have a positive effect on mood and productivity. BOOSTIFY integrates happiness in the attendance process.</p>
            </div>
          </div>

          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>🔒</span>
            <div>
              <h3 className={styles.benefitSubTitle}>High Security</h3>
              <p>Anti-spoofing system ensures the security of attendance data with advanced facial recognition technology.</p>
            </div>
          </div>

          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>📈</span>
            <div>
              <h3 className={styles.benefitSubTitle}>Ease of Monitoring</h3>
              <p>Live reports and attendance data recap make it easy for management to monitor attendance in real-time.</p>
            </div>
          </div>

          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>💬</span>
            <div>
              <h3 className={styles.benefitSubTitle}>Positive Feedback</h3>
              <p>A pleasant feedback voice makes the attendance process a positive and motivating experience.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
