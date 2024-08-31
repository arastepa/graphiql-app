import SignUpForm from '@/components/SignUpForm';
import styles from '@/styles/SignUp.module.css';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
