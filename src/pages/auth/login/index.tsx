import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import axiosInstance from "../../../api";
import LoginBg from "../../../assets/rainBg.jpg";
import LoginImg from "../../../assets/reg.jpg";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { useCtxt } from "../../../context/authContext/userContext";
import { LoginFormValues } from "../../../types";
import { ArrowFatLeft } from "@phosphor-icons/react";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const authContext = useCtxt(); // Access AuthContext

  // Initial form values
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${LoginBg})` }}>
      <Link to={"/"}>
        <button className="absolute bg-white top-5 left-10 p-2 px-5 rounded flex gap-2 items-center">
          <ArrowFatLeft
            size={26}
            color="#3e3d3b"
            weight="fill"
          />
          {/* Back */}
        </button>
      </Link>
      <div className="grid grid-rows-1 md:grid-cols-2 lg:w-[70%] h-auto m-auto p-3">
        <div
          className="bg-white rounded-l-xl login bg-repeat bg-center bg-cover hidden md:block"
          style={{ backgroundImage: `url(${LoginImg})` }}>
          {/* Image for the left section if needed */}
        </div>
        <div className="bg-black/40 rounded-r-xl p-5 md:p-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (
              values: LoginFormValues,
              { setSubmitting }: FormikHelpers<LoginFormValues>
            ) => {
              try {
                const res = await axiosInstance.post("/login", values);
                console.log(res);

                if (res?.data.success === true) {
                  toast.success(res?.data?.message);

                  // Log the user in by calling the context's login method
                  authContext?.login(
                    res?.data?.payload.token,
                    res?.data?.payload.user
                  ); // Assuming API returns token and user data

                  // Redirect to dashboard
                  navigate("/dashboard");
                } else {
                  toast.error(res?.data?.message);
                }
              } catch (error) {
                toast.error("Login failed. Please try again.");
                console.log(error);
              }

              setSubmitting(false); // Reset the submitting state after form submission
            }}>
            {({ errors, getFieldProps, isSubmitting }) => (
              <Form className="space-y-6 text-white">
                <div>
                  <h2 className="text-[2.5rem] font-bold">Login</h2>
                  <p>
                    Enter your email and password to login to your Classroom.
                  </p>
                </div>

                {/* Email Field */}
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  errors={errors}
                  {...getFieldProps("email")} // Use Formik's getFieldProps
                />

                {/* Password Field */}
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  errors={errors}
                  {...getFieldProps("password")} // Use Formik's getFieldProps
                />
                {/* <Link
                  to="/auth/reset-password"
                  className="text-yellow-500 underline">
                  Forget password?
                </Link> */}
                <Button
                  type="submit"
                  value={isSubmitting ? "Submitting..." : "Login"}
                />
              </Form>
            )}
          </Formik>

          <p className="text-white text-center">
            I do not have an account;{" "}
            <Link
              to="/auth/registration"
              className="text-yellow-500 underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
