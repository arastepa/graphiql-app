import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider
import { vi } from 'vitest';

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    getAuth: vi.fn(() => ({
      currentUser: null,
    })),
    onAuthStateChanged: vi.fn((callback) => {
      callback(null);
      return vi.fn();
    }),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  };
});

// Initialize i18n
i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'Header.Title': 'Welcome',
        'Header.Paragraph': 'Welcome text',
      },
    },
  },
});

describe('HomePage', () => {
  it('renders the homepage with the WelcomeSection', () => {
    render(
      <AuthProvider>
        <HomePage />
      </AuthProvider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Welcome' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Welcome text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SignIn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SignUp' })).toBeInTheDocument();
  });
});
