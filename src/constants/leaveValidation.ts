import * as Yup from "yup";

const phoneRegex = /^\+[1-9]\d{5,14}$/;

const leaveValidation = Yup.object({
  leave_type: Yup.string().required("Leave type is required"),

  from_date: Yup.string()
    .required("From date is required"),

  to_date: Yup.string()
    .required("To date is required")
    .test(
      "date-order",
      "To Date cannot be before From Date",
      function (value) {
        const { from_date } = this.parent;

        if (!from_date || !value) return true;

        return new Date(value) >= new Date(from_date);
      }
    ),

  reason: Yup.string()
    .required("Reason is required"),

  address_of_stay: Yup.string()
    .required("Address of stay is required"),

  mobile: Yup.string()
    .matches(
      phoneRegex,
      "Include country code (e.g., +91...)"
    )
    .required("Required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email address is required"),
});

export default leaveValidation;