import * as Yup from "yup";

export const validationSchemaSignUp = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .matches(/(?=.*[0-9])/, "Password must contain at least one number.")
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter.",
    )
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter.",
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character.",
    )
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
});
