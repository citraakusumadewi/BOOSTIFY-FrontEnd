import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../styles/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`flex flex-col justify-center items-center mt-24 py-4 gap-1 ${isDarkMode ? 'bg-[#5B0A0A]' : 'bg-[#7D0A0A]'}`}>
      <div className="flex items-center justify-center gap-4">
        <Link href="/About" className={`text-${isDarkMode ? '[#D7B66A]' : '[#EAD196]'}`}>
          About
        </Link>
        <Link href="/Team" className={`text-${isDarkMode ? '[#D7B66A]' : '[#EAD196]'}`}>
          Team
        </Link>
        <Link href="mailto:info@boostify.com" className="inline-block">
          <Image src="/email-icon.png" alt="Email Icon" width={24} height={24} />
        </Link>
        <Link href="https://www.linkedin.com/company/boostify" className="inline-block">
          <Image src="/linkedin-icon.png" alt="LinkedIn Icon" width={24} height={24} />
        </Link>
      </div>
      <div className="mt-1">
        <Image src="/Boostify-cps.png" alt="Boostify Logo" width={100} height={50} />
      </div>
      <p className={`text-center text-${isDarkMode ? '[#D7B66A]' : '[#EAD196]'} mt-0`}>
        © 2021 All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
