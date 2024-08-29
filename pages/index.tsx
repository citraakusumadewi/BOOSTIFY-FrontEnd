import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import HomeNav from '../components/HomeNav'; // Import HomeNav component
import Footer from '../components/Footer';
import styles from './LandingPage.module.css'; // Import file CSS

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get the session data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading

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
    <div className={`${styles.container} min-h-screen flex flex-col`}>
      {session ? <HomeNav /> : <Navbar />}

      {/* Main Content */}
      <main className={`${styles.mainContent} flex flex-col lg:flex-row justify-between items-start my-16 gap-8 flex-grow px-4`}>
        {/* Text Section */}
        <div className={`${styles.textSection} flex flex-col justify-center`}>
          <h1 className={`${styles.title} text-3xl md:text-4xl`}>Capture Your Smile, Capture Your Presence</h1>
          <p className={`${styles.description} text-base md:text-lg`}>
            This device is an attendance system based on facial recognition technology that requires users to smile as a sign of presence. With just a smile, your attendance is automatically recorded, enhancing the positive atmosphere in the workplace or school. Additionally, this device aims to boost people's enthusiasm and motivation to start their day with a smile, creating a more positive and productive environment.
          </p>
          <div>
            <a href="/SignIn">
              <button className={`${styles.attendanceButton} bg-red-800 text-yellow-100 py-3 px-6 md:px-8 rounded-lg text-base md:text-lg font-semibold shadow-md hover:bg-red-700`}>
                See Your Attendance
              </button>
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className={`${styles.imageSection} flex items-center justify-center`}>
          <img src="/smile-image.png" alt="Smiling Face" className={`${styles.smileImage} w-8/4 max-w-xs md:max-w-sm`} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
