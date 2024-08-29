"use server";

import SignInForm from "@/components/SignInForm";
import styles from "@/styles/SignUp.module.css";
import { validationSchemaSignUp } from "@/utils/validate";
import * as Yup from "yup";

export const handleSignin = async (prevState: unknown, data: FormData) => {
  try {
    const formDataObject: Record<string, unknown> = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });
    await validationSchemaSignUp.validate(formDataObject, {
      abortEarly: false,
    });
    return { message: "aa" };
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return { message: err.errors };
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
