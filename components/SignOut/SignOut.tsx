import React from 'react';
import styles from './SignOut.module.css';

interface SignOutPopupProps {
  onClose: () => void;
  onSignOut: () => void;
}

const SignOutPopup: React.FC<SignOutPopupProps> = ({ onClose, onSignOut }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Are You Sure?</h2>
        <div className={styles.buttons}>
            <a href="/HomePage">
                <button onClick={onClose} className={styles.goBackButton}>Go Back</button>
            </a>
            <a href="/">
                <button onClick={onSignOut} className={styles.signOutButton}>Yes</button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default SignOutPopup;
