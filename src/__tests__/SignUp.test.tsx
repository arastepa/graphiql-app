import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import SignUpForm from '../components/SignUpForm';
import { AuthContext } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';
import React from 'react';
import '@testing-library/jest-dom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const MockAuthProvider: React.FC<{
  children: React.ReactNode;
  signUp: (email: string, password: string) => Promise<User>;
}> = ({ children, signUp }) => {
  const mockUser = null;

  return (
    <AuthContext.Provider
      value={{
        user: mockUser,
        signIn: null,
        signUp,
        logOut: null,
        isAuthenticated: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

describe('SignUpForm', () => {
  it('renders the form and handles successful sign up', async () => {
    const mockSignUp = vi.fn().mockResolvedValueOnce(undefined);
    const mockPush = vi.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(
      <MockAuthProvider signUp={mockSignUp}>
        <SignUpForm />
      </MockAuthProvider>,
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Auth.PasswordInput/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Auth.PasswordConfInput/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText(/Auth.PasswordInput/i), {
      target: { value: 'Password@123' },
    });
    fireEvent.input(screen.getByPlaceholderText(/Auth.PasswordConfInput/i), {
      target: { value: 'Password@123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        'test@example.com',
        'Password@123',
      );
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('handles sign up errors', async () => {
    const mockSignUp = vi
      .fn()
      .mockRejectedValueOnce(
        new FirebaseError('auth/email-already-in-use', 'Email already in use'),
      );

    (useRouter as jest.Mock).mockReturnValue({ push: vi.fn() });

    render(
      <MockAuthProvider signUp={mockSignUp}>
        <SignUpForm />
      </MockAuthProvider>,
    );

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText(/Auth.PasswordInput/i), {
      target: { value: 'Password@123' },
    });
    fireEvent.input(screen.getByPlaceholderText(/Auth.PasswordConfInput/i), {
      target: { value: 'Password@123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        'test@example.com',
        'Password@123',
      );
    });

    console.log(screen.debug());

    expect(screen.getByText(/Auth.EmailAlreadyInUse/i)).toBeInTheDocument();
  });
});
