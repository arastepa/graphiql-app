import React from 'react';
import styles from '../styles/UserSection.module.css';

interface UserSectionProps {
  username: string;
}

const UserSection: React.FC<UserSectionProps> = ({ username }) => {
  return (
    <div className={styles.userSection}>
      <h1 className={styles.welcomeMessage}><span className={styles.welcome}>Welcome Back,</span> {username}!</h1>
      <div className={styles.buttonContainer}>
        <button>REST Client</button>
        <button>GraphiQL Client</button>
        <button>History</button>
      </div>
    </div>
  );
};

export default UserSection;
