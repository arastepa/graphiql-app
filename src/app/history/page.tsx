'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/History.module.css';
import Link from 'next/link';

const History = () => {
  const router = useRouter();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      typeof window !== 'undefined'
        ? localStorage.getItem('requestHistory')
        : '';
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleRequestClick = (type: 'REST' | 'GRAPHQL', timestamp: string) => {
    const queryString = new URLSearchParams({ timestamp }).toString();
    if (type === 'REST') {
      router.push(`/rest-client?${queryString}`);
    } else if (type === 'GRAPHQL') {
      router.push(`/graphiql?${queryString}`);
    }
  };

  if (history.length === 0) {
    return (
      <div className={styles.historyContainer}>
        <h2>You haven&rsquo;t executed any requests yet</h2>
        <p>It&rsquo;s empty here. Try:</p>
        <Link href="/rest-client" className={styles.button}>
          REST Client
        </Link>
        <Link href="/graphiql" className={styles.button}>
          GraphiQL Client
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyText}>History Requests</h2>
      <ul className={styles.requestContainer}>
        {history.map((requestData, index) => (
          <li className={styles.request} key={index}>
            <button
              onClick={() =>
                handleRequestClick(requestData.type, requestData.timestamp)
              }
            >
              {requestData.type === 'REST'
                ? `[${requestData.method}] ${requestData.endpoint}`
                : `[GRAPHQL] ${requestData.endpoint}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
