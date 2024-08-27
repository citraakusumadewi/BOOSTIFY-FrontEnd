import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './HomeNav.module.css';
import SignOut from './SignOut/SignOut';

const HomeNav: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [assistantCode, setAssistantCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      if (token) {
        try {
          const response = await fetch('https://boostify-back-end.vercel.app/api/whoami', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${JSON.parse(token)}`, // Use the token for authorization
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            if (response.status === 401) {
              // Token invalid, redirect to login
              localStorage.removeItem('authToken');
              router.push('/SignIn');
            } else {
              const errorText = await response.text();
              throw new Error(`Network response was not ok: ${errorText}`);
            }
          }
    
          const data = await response.json();
          setUserName(data.name); // Set the user's name
          setAssistantCode(data.assisstant_code); // Set the assistant code
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      } else {
        console.warn('No token found');
      }
    };
    
    fetchUserData();
  }, []);  

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      router.push('/SignIn');
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/HomePage">
          <img src="/logo.png" alt="Boostify Logo" className={styles.logo} />
        </a>
        <nav className={styles.nav}>
          <a href="/darkmode">
            <img src="/moon.png" alt="Darkmode Logo" className={styles.dmlogo} />
          </a>
          <a href="/About" className={styles.navLink}>About</a>
          <a href="/Team" className={styles.navLink}>Our Team</a>
          {userName ? (
            <>
              <span className={styles.userName}>{userName}</span>
              <a href="#" onClick={() => setShowPopup(true)} className={styles.signOut}>Sign Out</a>
            </>
          ) : (
            <a href="/SignIn" className={styles.signIn}>Sign In</a>
          )}
          <a href="/Profile" className={styles.userAvatarButton}>
            <div className={styles.userAvatar}>
              {assistantCode && (
                <span className={styles.assistantCodeInsideAvatar}>
                  {assistantCode}
                </span>
              )}
            </div>
          </a>
        </nav>
      </header>
  
      {showPopup && <SignOut onClose={() => setShowPopup(false)} onSignOut={handleSignOut} />}
    </div>
  );  
};

export default HomeNav;
