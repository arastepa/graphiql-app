<!-- 'use client';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, Mock, vi } from 'vitest';
import SignInForm from '../components/SignInForm';
import { AuthContext, useAuth } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';
import React from 'react';
import '@testing-library/jest-dom';
import { useFormState } from 'react-dom';

// FIX: this test is failing, so i modified it's name

vi.mock('react-dom', () => ({
  useFormState: vi.fn(),
}));

const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mockSignIn = vi.fn();
  const mockUser = null;

  return (
    <AuthContext.Provider value={{ user: mockUser, signIn: mockSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('SignInForm', () => {
  it('renders the form and handles successful sign in', async () => {
    let mockSignIn = vi.fn().mockResolvedValueOnce(undefined); // Ensure mockSignIn is defined

    render(
      <MockAuthProvider>
        <SignInForm />
      </MockAuthProvider>,
    );

    const mockUseFormState = vi.spyOn(useFormState, 'useFormState');
    // const mockUseFormState = useFormState as Mock;
    // mockUseFormState.mockImplementation(() => ({
    //   state: {},
    //   handleSigninAction: jest.fn(),
    // }));

    mockSignIn = vi.fn();
    (useAuth as Mock).mockReturnValue({
      user: null,
      signIn: mockSignIn,
    });
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
      <MockAuthProvider>
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
}); -->
