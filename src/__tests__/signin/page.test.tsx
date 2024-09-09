import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import SignIn from '../../app/signin/page';
import styles from '../../styles/SignUp.module.css';
import '@testing-library/jest-dom';

// Mock the SignInForm component
vi.mock('../../components/SignInForm', () => ({
  __esModule: true,
  default: () => <div>Mocked SignInForm</div>,
}));

describe('SignIn', () => {
  it('renders the SignInForm inside the container div', () => {
    render(<SignIn />);

    // Check if the container div with the correct class is rendered
    const containerDiv = screen.getByTestId('sign-in-container'); // Use a test ID instead
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass(styles.container);

    // Check if the SignInForm is rendered within the container
    const signInForm = screen.getByText(/mocked signinform/i);
    expect(signInForm).toBeInTheDocument();
  });
});
