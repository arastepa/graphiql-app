import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { LanguageProvider } from '../context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';
import Cookies from 'js-cookie'; 
import { vi } from 'vitest'; 

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
    vi.spyOn(Cookies, 'get').mockReturnValue('mockToken');
    renderHeader();
    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === 'a' &&
          /sign out|გასვლა/i.test(content)
        );
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/sign out|გასვლა/i)); // Updated matcher
    expect(screen.getByText(/sign in|შესვლა/i)).toBeInTheDocument(); // Updated matcher
    expect(screen.getByText(/sign up|რეგისტრაცია/i)).toBeInTheDocument();
  });
});
