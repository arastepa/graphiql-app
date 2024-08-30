'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import frame from '../../public/img/frame.png';
import enFlag from '../../public/img/en-flag.png';
import geoFlag from '../../public/img/geo-flag.png';
import amFlag from '../../public/img/am-flag.png';
import styles from '../styles/Header.module.css';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Header = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isLangListVisible, setLangListVisible] = useState(false);

  const toggleLangList = () => setLangListVisible((prev) => !prev);

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setLangListVisible(false);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = Cookies.get('accessToken');
  useEffect(() => {
    setIsAuthenticated(token ? true : false);
  }, [token]);
  return (
    <header className={styles.header} role="banner">
      <Link href="/" className="linkLogo">
        <div className={styles.headerLogo}>
          <Image
            src={frame}
            alt="frame"
            width={92}
            height={60}
            className={styles.headerImg}
          />
          <h2 className={styles.logoText}>WaveQ3</h2>
        </div>
      </Link>
      <div className={styles.nav}>
        <button className={styles.langToggle} onClick={toggleLangList}>
          {currentLanguage.toUpperCase()}
        </button>
        {isLangListVisible && (
          <div className={styles.langList}>
            {['en', 'ka', 'am'].map((lang) => (
              <button
                key={lang}
                className={`${styles.langToggle} ${styles.removeBorder}`}
                onClick={() => handleLanguageChange(lang)}
              >
                <Image
                  src={
                    lang === 'en' ? enFlag : lang === 'ka' ? geoFlag : amFlag
                  }
                  alt={`${lang.toUpperCase()} flag`}
                  className={styles.flag}
                  width={20}
                  height={15}
                />
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {isAuthenticated ? (
          <Link
            href="#"
            onClick={() => {
              Cookies.remove('accessToken');
              setIsAuthenticated(false);
            }}
            className={styles.authButton}
          >
            Sign Out
          </Link>
        ) : (
          <>
            <Link href="/signin" className={styles.signInButton}>
              Sign In
            </Link>
            <Link href="signup" className={styles.authButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
