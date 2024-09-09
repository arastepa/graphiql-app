import SignUpForm from '@/components/SignUpForm';
import styles from '@/styles/SignUp.module.css';

const SignUp = () => {
  return (
    <div data-testid="sign-up-container" className={styles.container}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
