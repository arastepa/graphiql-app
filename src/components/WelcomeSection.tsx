'use client';
import React from 'react';
import Image from 'next/image';
import mainImage from '../../public/img/homeImg.png';
import styles from '../styles/Welcome.module.css';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const WelcomeSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.welcome} role="banner">
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
        <Link href="/signin" className={styles.welcomeButton} role="button">
          {t(`SignIn`)}
        </Link>
        <Link href="/signup" className={styles.welcomeButton} role="button">
          {t(`SignUp`)}
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;
