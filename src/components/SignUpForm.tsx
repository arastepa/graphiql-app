'use client';

import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/SignUp.module.css';
import { useFormState } from 'react-dom';
import { validationSchemaSignUp } from '@/utils/validate';
import * as Yup from 'yup';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { FirebaseError } from 'firebase/app';
import { useTranslation } from 'react-i18next';

// TODO: create wrapper for SignUpForm and store there all non-form related logic
const SignUpForm = () => {
  const { user, signUp } = useAuth();
  const { t } = useTranslation();

  if (user) {
    redirect('/');
  }

  const handleSignup = async (prevState: unknown, data: FormData) => {
    try {
      const formDataObject = Object.fromEntries(data) as {
        email: string;
        password: string;
      };

      await validationSchemaSignUp.validate(formDataObject, {
        abortEarly: false,
      });

      const { email, password } = formDataObject;

      await signUp(email, password);

      redirect('/');
    } catch (err) {
      if (isRedirectError(err)) redirect('/');
      if (err instanceof Yup.ValidationError) {
        return { message: err.errors };
      }
      if (err instanceof FirebaseError) {
        return { message: err.code };
      }
    }
  };

  const [state, handleSignupAction] = useFormState(handleSignup, {
    message: '',
  });

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
