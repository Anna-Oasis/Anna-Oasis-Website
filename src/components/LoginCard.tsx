import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "@/utils/auth/authUtil";
import { handleLogin, getToken, verifyToken } from "@/utils/auth/authUtil";
import { LogIn, Mail, Lock } from "lucide-react";

const LoginCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 w-full max-w-md mx-auto">
      <div className="text-center">
        <img
          src="/images/login_logo.png"
          alt="Anna Oasis"
          className="w-56 h-56 mx-auto"
        />
        <h2 className="text-xl font-bold mb-2" style={{color: '#022B60'}}>
          Welcome Back
        </h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) =>
          handleLogin(values, async () => {
            const token = await getToken();
            if (token) {
              const user = await verifyToken(token);
              if (user) {
                console.log("Login successful, redirecting based on role...", user.role);
                switch (user.role) {
                  case "student":
                    navigate("/User/Student/admission");
                    break;
                  case "manager":
                    navigate("/Manager");
                    break;
                  case "rc":
                    navigate("/RC");
                    break;
                  case "DeputyWarden":
                    navigate("/DeputyWarden");
                    break;
                  case "ExecutiveWarden":
                    navigate("/ExecutiveWarden");
                    break;
                  default:
                    alert("Unknown role, redirecting to home.");
                    navigate("/");
                }
              } else {
                alert("Invalid token, please login again.");
              }
            }
          })
        }
      >
        {({ handleSubmit }) => (
          <Form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{'--tw-ring-color': '#022B60'} as React.CSSProperties}
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{'--tw-ring-color': '#022B60'} as React.CSSProperties}
                />
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              onSubmit={() => handleSubmit()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              style={{backgroundColor: '#022B60'}}
            >
              <LogIn className="h-5 w-5" />
              Sign In
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a 
                  href="/register" 
                  className="font-semibold hover:underline transition-all duration-200"
                  style={{color: '#022B60'}}
                >
                  Register here
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginCard;
