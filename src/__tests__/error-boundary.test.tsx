import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../app/error-boundary'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';

// Mock the Next.js useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    back: vi.fn(),
  }),
}));

// Component that throws an error
const ErrorThrowingComponent = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  it('renders the fallback UI when an error is thrown', async () => {
    // Render the ErrorBoundary with a component that throws an error
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    // Wait for the error UI to appear
    await waitFor(() => {
      expect(screen.getByText('500 - Server Error')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Something went wrong on our end. Please try again later.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('calls router.refresh when Retry button is clicked', async () => {
    const { refresh } = useRouter();

    // Render the ErrorBoundary with a component that throws an error
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    // Wait for the error UI to appear
    await waitFor(() => screen.getByText('500 - Server Error'));

    // Click the Retry button
    fireEvent.click(screen.getByText('Retry'));

    expect(refresh).toHaveBeenCalled(); // Check if refresh was called
  });

  it('calls router.back when Go Back button is clicked', async () => {
    const { back } = useRouter();

    // Render the ErrorBoundary with a component that throws an error
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    // Wait for the error UI to appear
    await waitFor(() => screen.getByText('500 - Server Error'));

    // Click the Go Back button
    fireEvent.click(screen.getByText('Go Back'));

    expect(back).toHaveBeenCalled(); // Check if back was called
  });
});
