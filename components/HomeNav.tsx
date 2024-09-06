import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { useTheme } from '../styles/ThemeContext';
import styles from './HomeNav.module.css';
import SignOut from './SignOut/SignOut';
import { useSession, signOut } from 'next-auth/react';
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

const HomeNav: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [assistantCode, setAssistantCode] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isDarkMode, toggleMode } = useTheme();
  const { data: session } = useSession() as { data: CustomSession }; 
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.token) {
          try {
            const response = await fetch('https://boostify-back-end.vercel.app/api/whoami', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${session.user.token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              if (response.status === 401) {
                console.warn('Token invalid, redirecting to SignIn'); 
                router.push('/SignIn');
              } else {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
              }
            }

            const data = await response.json();
            console.log('Fetched user data:', data);
            setUserName(data.name);
            setAssistantCode(data.assisstant_code);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        } else {
          console.warn('No token found in authData');
        }
    };

    fetchUserData();
  }, [session, router]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/SignIn' });
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setShowPopup(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu Toggled:', isMenuOpen); // Debugging log
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <header className={`${styles.header} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
        <Link href="/HomePage" passHref>
          <Image
            src="/logo.png"
            alt="Boostify Logo"
            className={styles.logo}
            width={50} // Adjust width as needed
            height={50} // Adjust height as needed
          />
        </Link>
        <nav className={styles.nav}>
          <button onClick={toggleMode} className={styles.modeToggle}>
            <Image
              src={isDarkMode ? "/light-mode-icon.png" : "/moon.png"}
              alt={isDarkMode ? "Light Mode Icon" : "Dark Mode Icon"}
              className={styles.dmlogo}
              width={24} // Adjust width as needed
              height={24} // Adjust height as needed
            />
          </button>
          <button className={styles.hamburger} onClick={handleMenuToggle}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
          <ul className={`${styles.navLinks} ${isDarkMode ? styles['dark-mode'] : ''} ${isMenuOpen ? styles.showMenu : ''}`}>
            <li><Link href="/About" passHref><span className={styles.navLink}>About</span></Link></li>
            <li><Link href="/Team" passHref><span className={styles.navLink}>Our Team</span></Link></li>
            <li>
              <button onClick={() => setShowPopup(true)} className={`${styles.navLink} ${styles.signOut}`}>
                Sign Out
              </button>
            </li>
          </ul>
          <Link href="/Profile" passHref>
            <div className={styles.userAvatarButton}>
              <div className={styles.userAvatar}>
                {assistantCode && (
                  <span className={styles.assistantCode}>{assistantCode}</span>
                )}
              </div>
            </div>
          </Link>
        </nav>
      </header>

      {showPopup && <SignOut onClose={() => setShowPopup(false)} onSignOut={handleSignOut} />}
    </div>
  );
};

export default HomeNav;
