import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import SignUp from '../../app/signup/page';
import styles from '../../styles/SignUp.module.css';
import '@testing-library/jest-dom';

vi.mock('../../components/SignUpForm', () => ({
  __esModule: true,
  default: () => <div>Mocked SignUpForm</div>,
}));

describe('SignIn', () => {
  it('renders the SignInForm inside the container div', () => {
    render(<SignUp />);

    const containerDiv = screen.getByTestId('sign-up-container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass(styles.container);

    const signInForm = screen.getByText(/mocked signupform/i);
    expect(signInForm).toBeInTheDocument();
  });
});
