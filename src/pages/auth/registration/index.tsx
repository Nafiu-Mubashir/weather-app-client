import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import axiosInstance from "../../../api";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { RegistrationFormValues } from "../../../types";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  city: Yup.string().required("City is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Registration: React.FC = () => {
  // Initial values for the form
  const initialValues: RegistrationFormValues = {
    firstname: "",
    lastname: "",
    city: "",
    email: "",
    password: "",
  };

  return (
    <div className="bg-yellow-500 flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 w-[70%] h-[85vh] m-auto">
        <div className="bg-white rounded-l-xl reg bg-repeat bg-center bg-cover">
          {/* <img src={loginImage} alt="" /> */}
        </div>
        <div className="backdrop-blur-sm bg-black/40 rounded-r-xl p-10 space-y-4 text-white">
                <div>
                  <h2 className="text-[2.5rem] font-bold">Create Account</h2>
                  <p>Enter your personal details to create an account</p>
                </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const res = await axiosInstance.post("/register", values)
              console.log(res); // Stop submitting state
              if (res?.data.success === true) {
                toast.success(res?.data?.message);
              }else{
                toast.error(res?.data?.message);
              }
            }}>
            {({ errors, getFieldProps, isSubmitting }) => (
              <Form className="space-y- text-white">
                <div className="grid grid-cols-2 gap-2">
                  {/* Firstname Field */}
                  <Input
                    label="Firstname"
                    type="text"
                    placeholder="Enter your firstname"
                    errors={errors}
                    {...getFieldProps("firstname")} // Use Formik's getFieldProps
                  />

                  {/* Lastname Field */}
                  <Input
                    label="Lastname"
                    type="text"
                    placeholder="Enter your lastname"
                    errors={errors}
                    {...getFieldProps("lastname")} // Use Formik's getFieldProps
                  />
                </div>
                {/* city Field */}
                <Input
                  label="city"
                  type="text"
                  placeholder="Enter your city"
                  errors={errors}
                  {...getFieldProps("city")} // Use Formik's getFieldProps
                />
                <div className="">
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
                </div>

                <Button
                  type="submit"
                  value={isSubmitting ? "submitting...." : "Register"}
                />
              </Form>
            )}
          </Formik>
          <p className="text-white text-center">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-[#D13900] underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
