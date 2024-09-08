'use client';

import styles from '../styles/SignUp.module.css';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

// TODO: create wrapper for SignInForm and store there all non-form related logic
const SignInForm = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const { user, signIn } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  if (user) {
    router.push('/');
  }

  const handleSignin = async (data: { email?: string; password?: string }) => {
    try {
      await signIn(data.email, data.password);
      router.push('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setErrorMsg(err.code);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignin)}>
      <p className={styles.error}>{errorMsg}</p>
      <div>
        <p className={styles.error}>
          {errors.email ? 'email is required' : ''}
        </p>
        <label htmlFor="email">{t(`Auth.EmailLabel`)}</label>
        <input
          type="email"
          id="email"
          name="email"
          {...register('email', { required: true })}
          placeholder={t(`Auth.EmailInput`)}
        />
      </div>

      <div>
        <p className={styles.error}>
          {errors.password ? 'password is required' : ''}
        </p>
        <label htmlFor="password">{t(`Auth.PasswordLabel`)}</label>
        <input
          type="password"
          id="password"
          name="password"
          {...register('password', { required: true })}
          placeholder={t(`Auth.PasswordInput`)}
        />
      </div>

      <button type="submit" className={styles.btn}>
        {t(`Submit`)}
      </button>
    </form>
  );
};

export default SignInForm;
