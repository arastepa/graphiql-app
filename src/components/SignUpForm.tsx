'use client';

import { useAuth } from '../context/AuthContext';
import styles from '../styles/SignUp.module.css';
import { validationSchemaSignUp } from '../utils/validate';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaSignUp) });
  const router = useRouter();
  const { user, signUp } = useAuth();
  const { t } = useTranslation();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  if (user) {
    router.push('/');
  }

  const handleSignup = async (data: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  }) => {
    try {
      await signUp(data.email, data.password);
      router.push('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          setFirebaseError(t('Auth.EmailAlreadyInUse'));
        } else {
          setFirebaseError(t('Auth.GenericError'));
        }
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignup)}>
      {firebaseError && <p className={styles.error}>{firebaseError}</p>}
      {errors.email && <p className={styles.error}>{errors.email?.message}</p>}
      <div>
        <label htmlFor="email">{t('Auth.EmailLabel')}</label>
        <input
          type="email"
          id="email"
          name="email"
          {...register('email')}
          placeholder={t('Auth.EmailInput')}
          required
        />
      </div>

      {errors.password && (
        <p className={styles.error}>{errors.password?.message}</p>
      )}
      <div>
        <label htmlFor="password">{t('Auth.PasswordLabel')}</label>
        <input
          type="password"
          id="password"
          name="password"
          {...register('password')}
          placeholder={t('Auth.PasswordInput')}
          required
        />
      </div>

      {errors.confirmPassword && (
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
      )}
      <div>
        <label htmlFor="confirmPassword">{t('Auth.PasswordConfLabel')}</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          {...register('confirmPassword')}
          placeholder={t('Auth.PasswordConfInput')}
          required
        />
      </div>

      <button type="submit" className={styles.btn}>
        {t('Submit')}
      </button>
    </form>
  );
};

export default SignUpForm;
