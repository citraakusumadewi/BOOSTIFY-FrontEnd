import React from 'react';
import { useTheme } from '../styles/ThemeContext';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`p-4 rounded-lg shadow-md flex items-center ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100'}`}>
      <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-left">{title}</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-left`}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
