import { expect, vi, describe, it } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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

  it('calls console.log when Sign In button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<WelcomeSection />);

    fireEvent.click(screen.getByRole('button', { name: 'SignIn' }));
    expect(consoleSpy).toHaveBeenCalledWith('Redirect to Sign In');
  });

  it('calls console.log when Sign Up button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<WelcomeSection />);

    fireEvent.click(screen.getByRole('button', { name: 'SignUp' }));
    expect(consoleSpy).toHaveBeenCalledWith('Redirect to Sign Up');
  });
});
