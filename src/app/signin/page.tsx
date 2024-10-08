import SignInForm from '../../components/SignInForm';
import styles from '../../styles/SignUp.module.css';

const SignIn = () => {
  return (
    <div data-testid="sign-in-container" className={styles.container}>
      <SignInForm />
    </div>
  );
};

export default SignIn;
