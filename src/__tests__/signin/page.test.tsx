import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import SignIn from '../../app/signin/page';
import styles from '../../styles/SignUp.module.css';
import '@testing-library/jest-dom';

vi.mock('../../components/SignInForm', () => ({
  __esModule: true,
  default: () => <div>Mocked SignInForm</div>,
}));

describe('SignIn', () => {
  it('renders the SignInForm inside the container div', () => {
    render(<SignIn />);

    const containerDiv = screen.getByTestId('sign-in-container');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass(styles.container);

    const signInForm = screen.getByText(/mocked signinform/i);
    expect(signInForm).toBeInTheDocument();
  });
});
