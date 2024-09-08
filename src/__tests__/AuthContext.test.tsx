import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    onAuthStateChanged: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  };
});

const MockComponent = () => {
  const { user, isAuthenticated, signIn, signUp, logOut } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? 'User' : 'No User'}</div>
      <div data-testid="isAuthenticated">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <button
        data-testid="signIn"
        onClick={() => signIn('test@example.com', 'password123')}
      >
        Sign In
      </button>
      <button
        data-testid="signUp"
        onClick={() => signUp('test@example.com', 'password123')}
      >
        Sign Up
      </button>
      <button data-testid="logOut" onClick={() => logOut()}>
        Log Out
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  const mockAuth = {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  };

  beforeEach(() => {
    (getAuth as jest.Mock).mockReturnValue(mockAuth);
    (initializeApp as jest.Mock).mockReturnValue({});
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return () => {};
    });
  });

  it('renders the AuthProvider and checks initial state', async () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('user').textContent).toBe('No User');
    expect(screen.getByTestId('isAuthenticated').textContent).toBe(
      'Not Authenticated',
    );
  });

  it('handles sign in and sign up', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: {} });
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: {},
    });

    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>,
    );

    act(() => {
      screen.getByTestId('signIn').click();
    });

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'test@example.com',
        'password123',
      );
    });

    act(() => {
      screen.getByTestId('signUp').click();
    });

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'test@example.com',
        'password123',
      );
    });
  });

  it('handles log out', async () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>,
    );

    act(() => {
      screen.getByTestId('logOut').click();
    });

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});
