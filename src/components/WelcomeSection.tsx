'use client';
import React from 'react';
import Image from 'next/image';
import mainImage from '../../public/img/homeImg.png';
import styles from '../styles/Welcome.module.css';
import { useTranslation } from 'react-i18next';

const WelcomeSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.welcome}>
      <h1 className={styles.welcomePart}>{t(`Header.Title`)}</h1>
      <h4 className={styles.welcomeText}>{t(`Header.Paragraph`)}</h4>
      <Image
        src={mainImage}
        alt="home img"
        priority
        width={600}
        height={337}
        className={styles.welcomeImg}
      />
      <div className={styles.welcomeButtons}>
        <button
          className={styles.welcomeButton}
          onClick={() => console.log('Redirect to Sign In')}
        >
          {t(`SignIn`)}
        </button>
        <button
          className={styles.welcomeButton}
          onClick={() => console.log('Redirect to Sign Up')}
        >
          {t(`SignUp`)}
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
