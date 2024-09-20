// HomePageContent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Ensure you are importing 'vi' from 'vitest'
import '@testing-library/jest-dom'; // Import jest-dom matchers
import HomePageContent from '../components/HomePageContent';
import { useAuth } from '../context/AuthContext';

vi.mock('../context/AuthContext', () => ({
  useAuth:
    vi.fn<() => { isAuthenticated: boolean; user: { email: string } | null }>(),
}));

describe('HomePageContent', () => {
  it('renders WelcomeSection when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    render(<HomePageContent />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/header\.title/i)).toBeInTheDocument();
    expect(screen.getByText(/header\.paragraph/i)).toBeInTheDocument();
  });

  it('renders UserSection when user is authenticated', () => {
    // Mock useAuth to return authenticated state
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        email: 'test@example.com',
      },
    });

    render(<HomePageContent />);

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
  });
});
