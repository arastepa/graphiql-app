'use client';

import React, { useContext, useEffect } from 'react';
import { JsonEditor } from 'json-edit-react';
import { useSearchParams } from 'next/navigation';
import { ResponseContext } from '../context/ResponseContext';

const ResponseSection: React.FC = () => {
  const searchParams = useSearchParams();
  const { responseCode, responseStatus, responseBody, setResponseData } =
    useContext(ResponseContext);

  useEffect(() => {
    const urlParam = searchParams.get('url');

    if (urlParam) {
      const fetchData = async () => {
        const decodedUrl = decodeURIComponent(urlParam);
        try {
          const response = await fetch(decodedUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setResponseData({
            responseCode: response.status,
            responseStatus: response.statusText,
            responseBody: data,
          });
        } catch (error) {
          console.error('Error fetching data:', error);
          setResponseData({
            responseCode: null,
            responseStatus: 'Error',
            responseBody: null,
          });
        }
      };

      fetchData();
    }
  }, [searchParams, setResponseData]);

  return (
    <div className="response-section">
      <h2>Response Details</h2>
      <div className="response-code">
        <strong>HTTP Response Code:</strong>{' '}
        {responseCode !== null ? responseCode : 'N/A'}
      </div>
      <div className="response-status">
        <strong>Status:</strong>{' '}
        {responseStatus !== null ? responseStatus : 'N/A'}
      </div>
      <div className="response-body">
        <strong>Response Body:</strong>
        {responseBody ? (
          <JsonEditor data={responseBody} setData={() => {}} />
        ) : (
          'No Response'
        )}
      </div>
    </div>
  );
};

export default ResponseSection;
