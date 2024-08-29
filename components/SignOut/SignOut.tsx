import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import styles from './SignOut.module.css';

interface SignOutPopupProps {
  onClose: () => void;
  onSignOut: () => void;
}

const SignOutPopup: React.FC<SignOutPopupProps> = ({ onClose, onSignOut }) => {
  const router = useRouter();

  const handleGoBack = () => {
    onClose(); // Close the popup
    router.push('/HomePage'); // Redirect to the HomePage
  };

  const handleSignOut = async () => {
    const authData = localStorage.getItem('authData');
    
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      const token = parsedAuthData.token?.token; // Access the token inside the nested structure

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
            console.log('Sign-out successful, removing token from localStorage...');
            localStorage.removeItem('authData'); // Clear the authData from localStorage
            signOut({callbackUrl: '/'});
          } else {
            console.error('Sign-out failed, response status:', response.status);
          }
        } catch (error) {
          console.error('Error during sign-out:', error);
        }
      } else {
        console.error('No token found in localStorage');
      }
    } else {
      console.error('No authData found in localStorage');
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