'use client';
import React from 'react';
import WelcomeSection from '@/components/WelcomeSection';
import styles from '@/styles/HomePageContent.module.css';
import UserSection from '@/components/UserSection';
import { useAuth } from '@/context/AuthContext';
import { User } from 'firebase/auth';

const HomePageContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {isAuthenticated ? (
          <UserSection username={(user as User).email as string} />
        ) : (
          <WelcomeSection />
        )}
      </main>
    </div>
  );
};

export default HomePageContent;
