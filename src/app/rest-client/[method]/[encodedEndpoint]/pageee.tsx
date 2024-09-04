'use client';

import { ResponseProvider } from '../../../../context/ResponseContext';
import ResponseSection from '../../../../components/ResponseSection';
import React, { useState } from 'react';
import RestClient from '../../page';
import styles from '@/styles/ResponseSection.module.css';

const RestClientPage: React.FC = () => {
  const [responseData, setResponseData] = useState({
    responseCode: null,
    responseStatus: null,
    responseBody: null,
  });

  return (
    <ResponseProvider>
      <section className={styles.restContainer}>
        <h1 style={{ textAlign: 'center', margin: '20px auto' }}>
          REST Client
        </h1>
        {/* Pass setResponseData to RestClient */}
        <RestClient setResponseData={setResponseData} />
        <ResponseSection responseData={responseData} />
        {responseData.responseBody && (
          <div>
            <h2>Response Data:</h2>
            <pre>{JSON.stringify(responseData.responseBody, null, 2)}</pre>
          </div>
        )}
      </section>
    </ResponseProvider>
  );
};

export default RestClientPage;
