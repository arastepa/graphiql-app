'use client';

import React from 'react';
import JsonViewer from '@andypf/json-viewer/dist/esm/react/JsonViewer';
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
          <JsonViewer
            data={responseBody}
            indent={2}
            expanded={2}
            theme="default-light"
            showDataTypes={false}
            showToolbar={false}
            showCopy={false}
            showSize={false}
            expandIconType="arrow"
          />
        ) : (
          'No Response'
        )}
      </div>
    </section>
  );
};

export default ResponseSection;
