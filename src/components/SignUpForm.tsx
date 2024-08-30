'use client';

import styles from '@/styles/SignUp.module.css';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const SignUpForm = ({
  handleSignup,
}: {
  handleSignup: (
    prevState: unknown,
    data: FormData,
  ) => Promise<
    | {
        message: string;
      }
    | {
        message: string[];
      }
    | undefined
  >;
}) => {
  const [state, handleSignupAction] = useFormState(handleSignup, {
    message: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('accessToken')) router.push('/');
  }, [router]);
  return (
    <form className={styles.form} action={handleSignupAction}>
      <p className={styles.error}>{state?.message}</p>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your email address"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="type your password"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="confirm password"
          required
        />
      </div>

      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
