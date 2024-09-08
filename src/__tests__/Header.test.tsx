import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { User } from 'firebase/auth';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockUser: User = {
  uid: 'test-user-id',
  email: 'test@example.com',
  emailVerified: true,
  isAnonymous: false,
  providerData: [],
  refreshToken: 'test-refresh-token',
  tenantId: null,
  metadata: {
    creationTime: 'Sun, 14 Aug 2024 19:00:00 GMT',
    lastSignInTime: 'Sun, 14 Aug 2024 19:00:00 GMT',
  },
  delete: vi.fn(),
  getIdToken: vi.fn(),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  toJSON: vi.fn(),
  displayName: null, // Add missing properties
  phoneNumber: null, // Add missing properties
  photoURL: null,
  providerId: 'mock-provider-id',
};

const renderHeader = (isAuthenticated = false) => {
  const mockLogOut = vi.fn();
  const user = isAuthenticated ? mockUser : null;

  render(
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated,
          signIn: vi.fn(),
          signUp: vi.fn(),
          logOut: mockLogOut,
        }}
      >
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </AuthContext.Provider>
    </I18nextProvider>,
  );

  return { mockLogOut };
};

describe('Header Component', () => {
  test('renders logo and navigation buttons', () => {
    renderHeader();
    expect(screen.getByAltText('frame')).toBeInTheDocument();
    expect(screen.getByText('WaveQ3')).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('toggles language list visibility', () => {
    renderHeader();
    const langToggle = screen.getByText('EN');
    fireEvent.click(langToggle);
    expect(screen.getByText('KA')).toBeInTheDocument();
    expect(screen.getByText('AM')).toBeInTheDocument();
  });

  test('changes language on button click', () => {
    renderHeader();
    const langToggle = screen.getByText('EN');
    fireEvent.click(langToggle);
    const kaButton = screen.getByText('KA');
    fireEvent.click(kaButton);
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });
});
