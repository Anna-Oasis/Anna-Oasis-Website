import * as Yup from "yup";

const phoneRegex = /^\+[1-9]\d{5,14}$/;

export const summerVacationValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Parent email is required"),

  mobile: Yup.string()
    .matches(
      phoneRegex,
      "Include country code (e.g., +91...)"
    )
    .required("Mobile number is required"),

  vacation_from: Yup.string()
    .required("Vacation date is required"),

  address_of_stay: Yup.string()
    .required("Address of stay is required"),

  returned_items: Yup.array()
    .min(1, "Select at least one returned item")
    .required("Returned items are required"),
});

export default summerVacationValidation;