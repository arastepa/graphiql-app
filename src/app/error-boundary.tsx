'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import styles from '../styles/NotFound.module.css';

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
    location.reload();
  };

  const handleBack = () => {
    console.log('Back button clicked');
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <ReactErrorBoundary
      fallbackRender={({ error }) => (
        <section className={styles.notFound}>
          <div className={styles.notFoundContent}>
            <h1>500 - Server Error</h1>
            <div className={styles.errorMsg}>
              <p>Something went wrong on our end. Please try again later.</p>
              <pre>{error.message}</pre>
              <button onClick={handleRetry} className={styles.retryBtn}>
                Retry
              </button>
              <button onClick={handleBack} className={styles.retryBtn}>
                Go Back
              </button>
            </div>
          </div>
        </section>
      )}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
