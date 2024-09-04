import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { LanguageProvider } from '../context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';

describe('Header Component', () => {
  const renderHeader = () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </I18nextProvider>,
    );
  };

  test('renders logo and navigation buttons', () => {
    renderHeader();
    expect(screen.getByAltText('frame')).toBeInTheDocument();
    expect(screen.getByText('WaveQ3')).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument(); // Updated matcher
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

  test('handles authentication state', () => {
    renderHeader();
    // Check for the presence of the "sign out" or "logout" button
    const signOutButton = screen.getByRole('button', {
      name: /sign out|logout|გასვლა/i,
    });
    expect(signOutButton).toBeInTheDocument();

    // Simulate signing out
    fireEvent.click(signOutButton);

    // Check for the presence of the "sign in" and "sign up" buttons
    expect(
      screen.getByRole('button', { name: /sign in|შესვლა/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up|რეგისტრაცია/i }),
    ).toBeInTheDocument();
  });
});
