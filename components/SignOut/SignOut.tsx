import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import styles from './SignOut.module.css';
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

interface SignOutPopupProps {
  onClose: () => void;
  onSignOut: () => void;
}

const SignOutPopup: React.FC<SignOutPopupProps> = ({ onClose, onSignOut }) => {
  const router = useRouter();
  const { data: session } = useSession() as { data: CustomSession }; 

  const handleGoBack = () => {
    onClose(); // Close the popup
    router.back(); // Redirect to the HomePage
  };

  const handleSignOut = async () => {
    if (session?.user?.token) {
      const token = session.user.token; // Access the token inside the nested structure
      console.log('Sending token to backend for logout:', token);

      if (token) {
        try {
          const response = await fetch('https://boostify-back-end.vercel.app/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ token }), // Sending the token to the API for invalidation
          });

          if (response.ok) {
            console.log('Sign-out successful');
            await signOut({ redirect: false }); // Menghindari redirect otomatis
            router.push('/'); // Arahkan ke halaman utama setelah sign-out
          } else {
            console.error('Sign-out failed, response status:', response.status);
          }
        } catch (error) {
          console.error('Error during sign-out:', error);
        }
      } else {
        console.error('No token found in session');
      }
    } else {
      console.error('No session found');
    }

    onSignOut(); // Additional actions after sign-out, if needed
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Are You Sure?</h2>
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.goBackButton}>Go Back</button>
          <button onClick={handleSignOut} className={styles.signOutButton}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default SignOutPopup;