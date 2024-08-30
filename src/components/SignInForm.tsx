'use client';

import styles from '@/styles/SignUp.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('accessToken')) router.push('/');
  }, [router]);

  return (
    <form className={styles.form} action={handleSigninAction}>
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

      <button type="submit" className={styles.btn}>
        {t(`Submit`)}
      </button>
    </form>
  );
};

export default SignInForm;
