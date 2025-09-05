import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import { validationSchema } from "@/utils/auth/authUtil";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupProps {
  onSubmit: (values: SignupFormValues) => void;
}

const SignupCard: React.FC<SignupProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-md w-full mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md my-5">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#022B60]">
          Create Account
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Sign up to get started
        </p>
      </div>

      <Formik<SignupFormValues>
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md text-sm sm:text-base"
              />
              <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md text-sm sm:text-base"
              />
              <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md text-sm sm:text-base"
              />
              <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md text-sm sm:text-base"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#022B60] text-white font-semibold rounded-lg mt-4 hover:opacity-90 transition"
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full py-2 px-4 border border-slate-500 text-slate-600 font-semibold rounded-lg mt-3 hover:bg-slate-50 transition"
            >
              Already have an account? Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupCard;
