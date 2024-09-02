'use client';

import { ResponseProvider } from '../../context/ResponseContext';
import ResponseSection from '../../components/ResponseSection';
import React from 'react';

const RestClientPage: React.FC = () => {
  return (
    <ResponseProvider>
      <div>
        <h1>REST Client</h1>
        <ResponseSection />
      </div>
    </ResponseProvider>
  );
};

export default RestClientPage;
