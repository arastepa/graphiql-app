import { expect, vi, describe, it, afterEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeSection from '../components/WelcomeSection';
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
    role,
  }: {
    children: React.ReactNode;
    href: string;
    className: string;
    role: string;
  }) => (
    <a href={href} className={className} role={role}>
      {children}
    </a>
  ),
}));

describe('WelcomeSection', () => {
  beforeAll(() => {
    i18n.init({
      lng: 'en',
      fallbackLng: 'en',
      ns: ['translations'],
      defaultNS: 'translations',
      resources: {
        en: {
          translations: {
            'Header.Title': 'Welcome to Rest/Graphiql Client',
            'Header.Paragraph': 'Some welcome text',
            SignIn: 'Sign In',
            SignUp: 'Sign Up',
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the welcome section with correct elements', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <WelcomeSection />
      </I18nextProvider>,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Welcome to Rest/Graphiql Client',
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Some welcome text')).toBeInTheDocument();
    expect(screen.getByAltText('home img')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute(
      'href',
      '/signin',
    );
    expect(screen.getByRole('link', { name: 'Sign Up' })).toHaveAttribute(
      'href',
      '/signup',
    );
  });
});
