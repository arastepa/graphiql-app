import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';
import { vi } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';

vi.mock('@/components/Header', () => ({
  default: () => <div>Mock Header</div>,
}));
vi.mock('@/components/Footer', () => ({
  default: () => <div>Mock Footer</div>,
}));
vi.mock('@/context/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('@/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('@/context/ResponseContext', () => ({
  ResponseProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('../loading', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../error-boundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

describe('RootLayout', () => {
  test('renders Header, Footer, and children components correctly', () => {
    render(
      <RootLayout>
        <div>Mock Child Content</div>
      </RootLayout>,
    );

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
    expect(screen.getByText('Mock Child Content')).toBeInTheDocument();
  });

  test('handles ErrorBoundary correctly', () => {
    const ErrorComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <RootLayout>
        <ErrorComponent />
      </RootLayout>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
