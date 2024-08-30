import React from 'react';
import { useTheme } from '../pages/ThemeContext';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`${styles.featureCard} ${isDarkMode ? styles['darkMode'] : ''}`}>
      <div className={isDarkMode ? styles.icon : styles.darkModeIcon}>{icon}</div>
      <div className={styles.ml4}>
        <h3 className={styles.textLgFontSemibold}>{title}</h3>
        <p className={isDarkMode ? styles.textGray400 : styles.textGray600}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;