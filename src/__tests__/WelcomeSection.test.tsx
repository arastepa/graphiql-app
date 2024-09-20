import { expect, vi, describe, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeSection from '../components/WelcomeSection';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('WelcomeSection', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it('renders the welcome section with correct elements', () => {
    render(<WelcomeSection />);

    expect(
      screen.getByRole('heading', { name: 'Header.Title' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Header.Paragraph')).toBeInTheDocument();
    expect(screen.getByAltText('home img')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SignIn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SignUp' })).toBeInTheDocument();
  });

  it('renders a clickable Sign In button', () => {
    render(<WelcomeSection />);
    const signInButton = screen.getByRole('button', { name: 'SignIn' });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).not.toBeDisabled();
  });

  it('renders a clickable Sign Up button', () => {
    render(<WelcomeSection />);
    const signUpButton = screen.getByRole('button', { name: 'SignUp' });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).not.toBeDisabled();
  });
});
