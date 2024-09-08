import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '@/app/error-boundary';

const mockBack = vi.fn();
const mockPush = vi.fn();

const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload,
  },
  writable: true,
});

const mockHistory = { length: 2 };

vi.spyOn(window.history, 'length', 'get').mockImplementation(
  () => mockHistory.length,
);

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
  }),
}));

const TestComponent = () => {
  throw new Error('Test error');
  return <div>Test Component</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    mockBack.mockClear();
    mockPush.mockClear();
    mockReload.mockClear();
  });

  it('renders error fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('500 - Server Error')).toBeTruthy();
    expect(
      screen.getByText(
        'Something went wrong on our end. Please try again later.',
      ),
    ).toBeTruthy();
    expect(screen.getByText('Retry')).toBeTruthy();
    expect(screen.getByText('Go Back')).toBeTruthy();
  });

  it('calls window.location.reload when Retry button is clicked', async () => {
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    await waitFor(() => {
      expect(screen.getByText('Retry')).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Retry'));
    await waitFor(() => {
      expect(mockReload).toHaveBeenCalledTimes(1);
    });
  });

  it('calls router.back when Go Back button is clicked and history.length > 1', async () => {
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    mockHistory.length = 2;

    await waitFor(() => {
      expect(screen.getByText('Go Back')).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Go Back'));
    await waitFor(() => {
      expect(mockBack).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledTimes(0);
    });
  });

  it('calls router.push when Go Back button is clicked and history.length <= 1', async () => {
    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    mockHistory.length = 1;

    await waitFor(() => {
      expect(screen.getByText('Go Back')).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Go Back'));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockBack).toHaveBeenCalledTimes(0);
    });
  });
});
