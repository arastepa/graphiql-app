import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ResponseProvider } from '@/context/ResponseContext';
import useResponseContext from '@/hooks/useResponseContext';
import '@testing-library/jest-dom';

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

describe('useResponseContext', () => {
  it('throws error when used outside of ResponseProvider', () => {
    const TestComponentWithoutProvider: React.FC = () => {
      try {
        useResponseContext();
        return <div />;
      } catch (error) {
        if (error instanceof Error) {
          return <div data-testid="error">{error.message}</div>;
        }
      }
    };

    render(<TestComponentWithoutProvider />);

    expect(screen.getByTestId('error')).toHaveTextContent(
      'useResponseContext must be used within a ResponseProvider',
    );
  });

  it('provides initial context values and updates context values', () => {
    render(
      <ResponseProvider>
        <TestComponent />
      </ResponseProvider>,
    );

    expect(screen.getByTestId('response-code')).toHaveTextContent('');
    expect(screen.getByTestId('response-status')).toHaveTextContent('');
    expect(screen.getByTestId('response-body')).toHaveTextContent('null');

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
