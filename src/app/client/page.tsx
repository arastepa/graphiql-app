import ResponseSection from '../../components/ResponseSection';
import React from 'react';

const RestClientPage: React.FC = () => {
  // Example state (you'll likely manage this with context or another state management solution)
  const responseCode = 200;
  const responseStatus = 'OK';
  const responseBody = { message: 'Success' };

  return (
    <div>
      <h1>REST Client</h1>
      <ResponseSection
        responseCode={responseCode}
        responseStatus={responseStatus}
        responseBody={responseBody}
      />
    </div>
  );
};

export default RestClientPage;
