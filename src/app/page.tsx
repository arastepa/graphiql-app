'use client';

import React from 'react';
import WelcomeSection from '../components/WelcomeSection';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <WelcomeSection />
      </main>
    </div>
  );
};

export default HomePage;
