import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
   firstName: Yup.string()
    .required("First Name is required")
    .min(3, "Must be at least 3 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(1, "Must be at least 1 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
