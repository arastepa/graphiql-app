import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../app/page'; // Adjust the import if the path differs

test('renders HomePage with Header, WelcomeSection, and Footer', () => {
  render(<HomePage />);

  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeDefined();
    const mainElement = screen.getByRole('main');
    expect(mainElement.className).toBe('mocked-main-class');

  const welcomeText = screen.getByText('Welcome to Rest/Graphiql Client');
  expect(welcomeText).toBeDefined();

  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeDefined();
    expect(screen.getByTestId('mocked-welcome-section')).toBeDefined();
  });
});
