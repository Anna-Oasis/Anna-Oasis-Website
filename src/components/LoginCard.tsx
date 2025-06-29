import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "@/utils/auth/authUtil";
import { handleLogin, getToken, verifyToken } from "@/utils/auth/authUtil";

const LoginCard = () => {
  const navigate = useNavigate();

  return (
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
                  navigate("/User/Student");
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
        <Form className="space-y-4 max-w-md mx-auto p-6 rounded-lg">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <label htmlFor="email" className="mb-1 font-semibold">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="p-2 border rounded"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="p-2 border rounded"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            onSubmit={() => handleSubmit()}
            className="w-full mt-6 p-2 bg-slate-900 text-white font-semibold rounded-lg"
          >
            Login
          </button>
           <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>

        </Form>
      )}
    </Formik>
  );
};


export default LoginCard;
