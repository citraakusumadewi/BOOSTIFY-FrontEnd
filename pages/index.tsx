import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import HomeNav from '../components/HomeNav'; // Import HomeNav component
import Footer from '../components/Footer';
import styles from './LandingPage.module.css'; // Import file CSS
import { useTheme } from '../styles/ThemeContext';
import Image from 'next/image'; // Import Next.js Image component
import Link from 'next/link'; // Import Next.js Link component

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get the session data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const { isDarkMode } = useTheme(); // Get the theme (dark/light mode)

  useEffect(() => {
    if (status === 'loading') {
      // Wait for session loading to finish
      return;
    }

    if (session) {
      // Redirect to HomePage if the user is already logged in
      router.push('/HomePage');
    } else {
      // If not logged in, set loading to false
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (isLoading) {
    // Optionally render a loading spinner or message
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']} min-h-screen flex flex-col`}>
      {session ? <HomeNav /> : <Navbar />}

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Text Section */}
        <div className={styles.textSection}>
          <h1 className={styles.title}>Capture Your Smile, Capture Your Presence</h1>
          <p className={styles.description}>
            This device is an attendance system based on facial recognition technology that requires users to smile as a sign of presence. With just a smile, your attendance is automatically recorded, enhancing the positive atmosphere in the workplace or school. Additionally, this device aims to boost peoples enthusiasm and motivation to start their day with a smile, creating a more positive and productive environment.
          </p>
          <div>
            <Link href="/SignIn" passHref>
              <button className={styles.attendanceButton}>
                See Your Attendance
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.imageSection}>
          <Image src="/smile-image.png" alt="Smiling Face" width={500} height={500} className={styles.smileImage} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
