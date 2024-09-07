'use client';

import { useFormState } from 'react-dom';
import styles from '../styles/SignUp.module.css';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

// TODO: create wrapper for SignInForm and store there all non-form related logic
const SignInForm = () => {
  const { user, signIn } = useAuth();
  const { t } = useTranslation();

  if (user) {
    redirect('/');
  }

  const handleSignin = async (prevState: unknown, data: FormData) => {
    try {
      const { email, password } = Object.fromEntries(data) as {
        email: string;
        password: string;
      };

      await signIn(email, password);

      redirect('/');
    } catch (err) {
      if (isRedirectError(err)) redirect('/');
      if (err instanceof FirebaseError) {
        return { message: err.code };
      }
    }
  };

  const [state, handleSigninAction] = useFormState(handleSignin, {
    message: '',
  });

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
