'use client';

import styles from '@/styles/SignUp.module.css';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        <label htmlFor="email">{t(`Auth.EmailLabel`)}</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={t(`Auth.EmailInput`)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">{t(`Auth.PasswordLabel`)}</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder={t(`Auth.PasswordInput`)}
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">{t(`Auth.PasswordConfLabel`)}</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder={t(`Auth.PasswordConfInput`)}
          required
        />
      </div>

      <button type="submit" className={styles.btn}>
        {t(`Submit`)}
      </button>
    </form>
  );
};

export default SignUpForm;
