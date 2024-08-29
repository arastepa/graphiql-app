'use server';

import SignUpForm from '@/components/SignUpForm';
import styles from '@/styles/SignUp.module.css';
import { validationSchemaSignUp } from '@/utils/validate';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { FirebaseError } from 'firebase/app';

export const handleSignup = async (prevState: unknown, data: FormData) => {
  try {
    const formDataObject: Record<string, unknown> = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });
    await validationSchemaSignUp.validate(formDataObject, {
      abortEarly: false,
    });
    await createUserWithEmailAndPassword(
      auth,
      formDataObject.email as string,
      formDataObject.password as string,
    );
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
const SignUp = () => {
  return (
    <div className={styles.container}>
      <SignUpForm handleSignup={handleSignup} />
    </div>
  );
};

export default SignUp;
