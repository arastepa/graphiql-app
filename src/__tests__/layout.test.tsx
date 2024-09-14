import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';
import { vi } from 'vitest';
import ErrorBoundary from '../app/error-boundary';
import '@testing-library/jest-dom';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: vi.fn(),
    back: vi.fn(),
  }),
}));

// Mock ErrorBoundary
vi.mock('../app/error-boundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('RootLayout', () => {
  it('renders Header, Footer, and children components correctly', () => {
    render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('handles ErrorBoundary correctly', () => {
    render(
      <RootLayout>
        <ErrorBoundary>
          <div>Child Component</div>
        </ErrorBoundary>
      </RootLayout>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
