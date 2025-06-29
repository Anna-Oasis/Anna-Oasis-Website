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
    <div className="space-y-4 max-w-md mx-auto p-6 rounded-lg">
      <div className="flex flex-col">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Sign up to get started</p>
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
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
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
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
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
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
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
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-500" />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-slate-900 text-white font-semibold rounded-lg mt-6"
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full py-2 px-4 border border-slate-500 text-slate-500 font-semibold rounded-lg mt-3"
              >
                Already have an account? Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupCard;
