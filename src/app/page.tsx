import React from 'react';
import WelcomeSection from '../components/WelcomeSection';
import styles from './page.module.css';
import { cookies } from 'next/headers';
import UserSection from '@/components/UserSection';

const HomePage: React.FC = () => {
  const isAuthenticated = Boolean(cookies().get('accessToken')?.value);
  const email = cookies().get('email')?.value;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {isAuthenticated ? (
          <UserSection username={email as string} />
        ) : (
          <WelcomeSection />
        )}
      </main>
    </div>
  );
};

export default HomePage;
