import { render, screen } from '@testing-library/react';
import HomePage from '../app/page'; // Adjust the import if the path differs

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
