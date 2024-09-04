'use client';

import React, { createContext, useState, ReactNode } from 'react';

export type ResponseContextType = {
  responseCode: number | null;
  responseStatus: string | null;
  responseBody: object | null;
  setResponseData: (data: {
    responseCode: number | null;
    responseStatus: string | null;
    responseBody: object | null;
  }) => void;
};

const ResponseContext = createContext<ResponseContextType | undefined>(
  undefined,
);

const ResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responseData, setResponseData] = useState<{
    responseCode: number | null;
    responseStatus: string | null;
    responseBody: object | null;
  }>({
    responseCode: null,
    responseStatus: null,
    responseBody: null,
  });

  return (
    <ResponseContext.Provider value={{ ...responseData, setResponseData }}>
      {children}
    </ResponseContext.Provider>
  );
};

export { ResponseContext, ResponseProvider };
