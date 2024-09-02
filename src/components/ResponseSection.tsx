'use client';
import React from 'react';
import { JsonEditor } from 'json-edit-react';

type ResponseSectionProps = {
  responseCode: number | null;
  responseStatus: string | null;
  responseBody: object | null;
};

const ResponseSection: React.FC<ResponseSectionProps> = ({
  responseCode,
  responseStatus,
  responseBody,
}) => {
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
