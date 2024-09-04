'use client';

import React from 'react';
import { JsonEditor } from 'json-edit-react';
import styles from '../styles/ResponseSection.module.css';

interface ResponseSectionProps {
  responseCode: number | null;
  responseStatus: string | null;
  responseBody: string | null;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  responseCode,
  responseStatus,
  responseBody,
}) => {
  return (
    <section className={styles.responseSection}>
      <h2>Response Details</h2>
      <div className={styles.responseCode}>
        <strong>HTTP Response Code:</strong>{' '}
        {responseCode !== null ? responseCode : 'N/A'}
      </div>
      <div className={styles.responseStatus}>
        <strong>Status:</strong>{' '}
        {responseStatus !== null ? responseStatus : 'N/A'}
      </div>
      <div className={styles.responseBody}>
        <strong>Response Body:</strong>
        {responseBody ? (
          <JsonEditor data={responseBody} setData={() => {}} />
        ) : (
          'No Response'
        )}
      </div>
    </section>
  );
};

export default ResponseSection;
