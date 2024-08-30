'use client';

import styles from '@/styles/SignUp.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Cookies from 'js-cookie';

const SignInForm = ({
  handleSignin,
}: {
  handleSignin: (
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
  const [state, handleSigninAction] = useFormState(handleSignin, {
    message: '',
  });
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get('accessToken')) router.push('/');
  }, [router]);
  return (
    <form className={styles.form} action={handleSigninAction}>
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

      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

export default SignInForm;
