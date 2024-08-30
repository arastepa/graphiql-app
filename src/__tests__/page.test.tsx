import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('../components/WelcomeSection', () => ({
  default: () => (
    <div data-testid="mocked-welcome-section">Mocked WelcomeSection</div>
  ),
}));

vi.mock('../app/page.module.css', () => ({
  default: {
    page: 'mocked-page-class',
    main: 'mocked-main-class',
  },
}));

describe('HomePage', () => {
  it('renders the homepage with the correct structure', () => {
    render(<HomePage />);

    const mainElement = screen.getByRole('main');
    expect(mainElement.className).toBe('mocked-main-class');

    expect(screen.getByTestId('mocked-welcome-section')).toBeDefined();
  });
});
