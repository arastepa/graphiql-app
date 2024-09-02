import React from 'react';
import styles from '../styles/UserSection.module.css';
import Link from 'next/link';

interface UserSectionProps {
  username: string;
}

const UserSection: React.FC<UserSectionProps> = ({ username }) => {
  return (
    <div className={styles.userSection}>
      <h1 className={styles.welcomeMessage}>
        <span className={styles.welcome}>Welcome Back,</span> {username}!
      </h1>
      <div className={styles.buttonContainer}>
        <Link href="/client" className={styles.button}>
          REST Client
        </Link>
        <Link href="#" className={styles.button}>
          GraphiQL Client
        </Link>
        <Link href="#" className={styles.button}>
          History
        </Link>
      </div>
    </div>
  );
};

export default UserSection;
