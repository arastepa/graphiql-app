'use client';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import SignInForm from '../components/SignInForm';
import { AuthContext } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';
import React from 'react';
import '@testing-library/jest-dom';
import { User } from 'firebase/auth';

const MockAuthProvider: React.FC<{
  children: React.ReactNode;
  signIn: (email: string, password: string) => Promise<User>;
}> = ({ children, signIn }) => {
  const mockUser = null;

  return (
    <AuthContext.Provider
      value={{
        user: mockUser,
        signIn,
        signUp: null,
        logOut: null,
        isAuthenticated: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('SignInForm', () => {
  it('renders the form and handles successful sign in', async () => {
    const mockSignIn = vi.fn().mockResolvedValueOnce(undefined); // Define mockSignIn here

    render(
      <MockAuthProvider signIn={mockSignIn}>
        <SignInForm />
      </MockAuthProvider>,
    );

    expect(screen.getByLabelText(/Auth.EmailLabel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Auth.PasswordLabel/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();

    fireEvent.input(screen.getByLabelText(/Auth.EmailLabel/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/Auth.PasswordLabel/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );
    });
  });

  it('handles sign in errors', async () => {
    const mockSignIn = vi
      .fn()
      .mockRejectedValueOnce(
        new FirebaseError('auth/wrong-password', 'Wrong password'),
      );

    render(
      <MockAuthProvider signIn={mockSignIn}>
        <SignInForm />
      </MockAuthProvider>,
    );

    fireEvent.input(screen.getByLabelText(/Auth.EmailLabel/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/Auth.PasswordLabel/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        'test@example.com',
        'wrongpassword',
      );
    });

    expect(screen.getByText('auth/wrong-password')).toBeInTheDocument();
  });
});
