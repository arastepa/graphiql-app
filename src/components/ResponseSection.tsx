'use client';

import React from 'react';
import styles from '../styles/ResponseSection.module.css';
import dynamic from 'next/dynamic';

const JsonViewer = dynamic(
  () => import('@andypf/json-viewer/dist/esm/react/JsonViewer'),
  { ssr: false },
) as typeof import('@andypf/json-viewer/dist/esm/react/JsonViewer');

interface ResponseSectionProps {
  responseCode: number | null;
  responseStatus: string | null;
  responseBody: string | null;
  responseErrors?: object[] | null;
}

const getStatusDescription = (code: number | null): string => {
  if (code === 200) return 'OK';
  if (code === 201) return 'Created';
  if (code === 204) return 'No Content';
  if (code === 400) return 'Bad Request';
  if (code === 401) return 'Unauthorized';
  if (code === 403) return 'Forbidden';
  if (code === 404) return 'Not Found';
  if (code === 500) return 'Internal Server Error';
  return 'Unknown Status';
};

const ResponseSection: React.FC<ResponseSectionProps> = ({
  responseCode,
  responseStatus,
  responseBody,
  responseErrors,
}) => {
  const statusDescription = responseCode
    ? getStatusDescription(responseCode)
    : responseStatus;

  return (
    <section className={styles.responseSection}>
      <h2>Response Details</h2>
      <div className={styles.responseCode}>
        <strong>HTTP Response Code:</strong>{' '}
        {responseCode !== null ? responseCode : 'N/A'}
      </div>
      <div className={styles.responseStatus}>
        <strong>Status:</strong> {statusDescription ? statusDescription : 'N/A'}
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
        {/* GraphQL Errors (if applicable) */}

        {responseErrors && responseErrors.length > 0 && (
          <div className={styles.responseErrors}>
            <strong>Response Errors:</strong>
            <JsonViewer
              data={responseErrors}
              indent={2}
              expanded={2}
              theme="default-light"
              showDataTypes={false}
              showToolbar={false}
              showCopy={false}
              showSize={false}
              expandIconType="arrow"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ResponseSection;
