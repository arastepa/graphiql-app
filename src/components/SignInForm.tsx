"use client";

import React, { useActionState } from "react";
import styles from "@/styles/SignUp.module.css";

const SignInForm = ({
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
  const [state, handleSignupAction] = useActionState(handleSignup, {
    message: "",
  });
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

      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

export default SignInForm;
