'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import frame from '../../public/img/frame.png';
import enFlag from '../../public/img/en-flag.png';
import geoFlag from '../../public/img/geo-flag.png';
import amFlag from '../../public/img/am-flag.png';
import styles from '@/styles/Header.module.css';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isLangListVisible, setLangListVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('auth');

  const toggleLangList = () => setLangListVisible((prev) => !prev);
  const toggleButton = (button) => {
    setActiveButton(button);
  };
  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setLangListVisible(false);
  };
  const { isAuthenticated, logOut } = useAuth();

  const router = useRouter();

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
            onClick={async () => {
              await logOut();
              router.push('/');
            }}
            className={styles.authButton}
          >
            {t(`SignOut`)}
          </Link>
        ) : (
          <>
            <Link href="/signin" passHref>
              <div
                className={`${styles.signInButton} ${activeButton === 'signIn' ? styles.active : ''}`}
                onClick={() => toggleButton('signIn')}
              >
                {t('SignIn')}
              </div>
            </Link>
            <Link href="/signup" passHref>
              <div
                className={`${styles.authButton} ${activeButton === 'auth' ? styles.active : ''}`}
                onClick={() => toggleButton('auth')}
              >
                {t('SignUp')}
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
