import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React, { useContext } from 'react';
import { ResponseContext, ResponseProvider } from '@/context/ResponseContext';
import '@testing-library/jest-dom';

const useResponseContext = () => {
  const context = useContext(ResponseContext);
  if (!context) {
    throw new Error(
      'useResponseContext must be used within a ResponseProvider',
    );
  }
  return context;
};

const TestComponent: React.FC = () => {
  const { responseCode, responseStatus, responseBody, setResponseData } =
    useResponseContext();

  const updateContext = () => {
    setResponseData({
      responseCode: 200,
      responseStatus: 'OK',
      responseBody: { key: 'value' },
    });
  };

  return (
    <div>
      <button onClick={updateContext}>Update Context</button>
      <div data-testid="response-code">{responseCode}</div>
      <div data-testid="response-status">{responseStatus}</div>
      <div data-testid="response-body">{JSON.stringify(responseBody)}</div>
    </div>
  );
};

describe('ResponseProvider', () => {
  it('provides initial context values', () => {
    render(
      <ResponseProvider>
        <TestComponent />
      </ResponseProvider>,
    );

    expect(screen.getByTestId('response-code')).toHaveTextContent('');
    expect(screen.getByTestId('response-status')).toHaveTextContent('');
    expect(screen.getByTestId('response-body')).toHaveTextContent('null');
  });

  it('updates context values when setResponseData is called', () => {
    render(
      <ResponseProvider>
        <TestComponent />
      </ResponseProvider>,
    );

    act(() => {
      screen.getByText('Update Context').click();
    });

    expect(screen.getByTestId('response-code')).toHaveTextContent('200');
    expect(screen.getByTestId('response-status')).toHaveTextContent('OK');
    expect(screen.getByTestId('response-body')).toHaveTextContent(
      '{"key":"value"}',
    );
  });
});
