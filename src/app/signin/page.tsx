'use server';

import SignInForm from '@/components/SignInForm';
import styles from '@/styles/SignUp.module.css';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { FirebaseError } from 'firebase/app';

export const handleSignin = async (prevState: unknown, data: FormData) => {
  try {
    const formDataObject: Record<string, unknown> = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });
    await signInWithEmailAndPassword(
      auth,
      formDataObject.email as string,
      formDataObject.password as string,
    );
    redirect('/');
  } catch (err) {
    if (isRedirectError(err)) redirect('/');
    if (err instanceof FirebaseError) {
      return { message: err.code };
    }
  }
};
const SignUp = () => {
  return (
    <div className={styles.container}>
      <SignInForm handleSignin={handleSignin} />
    </div>
  );
};

export default SignUp;
