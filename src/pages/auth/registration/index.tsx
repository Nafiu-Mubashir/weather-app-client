import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { ArrowFatLeft } from "@phosphor-icons/react";

import LoginImg from "../../../assets/login.jpg";
import RegBg from "../../../assets/sunBg.jpg";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { AppDispatch } from "../../../lib";
import { RegAction } from "../../../lib/action/authAction";
import { RegistrationFormValues } from "../../../types";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Firstname is required"),
  lastName: Yup.string().required("Lastname is required"),
  city: Yup.string().required("City is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Registration: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
  // Initial values for the form
  const initialValues: RegistrationFormValues = {
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    password: "",
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex md:justify-center items-center h-screen relative"
      style={{ backgroundImage: `url(${RegBg})` }}>
      <Link
        to={"/"}
        className="">
        <button className="absolute bg-green-500 top-5 left-10 p-2 px-5 rounded flex gap-2 items-center">
          <ArrowFatLeft
            size={26}
            color="white"
            weight="fill"
          />
          {/* Back */}
        </button>
      </Link>
      <div className="grid grid-rows-1 md:grid-cols-2 lg:w-[70%] h-auto m-auto p-3">
        <div
          className="bg-whit rounded-l-xl reg bg-repeat bg-cente bg-cover"
          style={{ backgroundImage: `url(${LoginImg})` }}>
          {/* <img
            src={LoginImg}
            alt=""
          /> */}
        </div>
        <div className="backdrop-blur-sm bg-black/40 rounded-r-xl p-5 md:p-10 space-y-4 text-white">
          <div>
            <h2 className="text-2xl md:text-[2.5rem] font-bold">
              Create Account
            </h2>
            <p>Enter your personal details to create an account</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (
              values: RegistrationFormValues,
              { setSubmitting }: FormikHelpers<RegistrationFormValues>
            ) => {
              const res = await dispatch(RegAction(values));
              // console.log(res);

              if (res?.success === true) {
                // toast.success(res?.message);
                navigate("/login");
              } else {
                toast.error(res?.message);
              }

              setSubmitting(false); // Reset the submitting state after form submission
              // const res = await axiosInstance.post("/register", values);
              // // console.log(res); // Stop submitting state
              // if (res?.data.success === true) {
              //   toast.success(res?.data?.message);
              // } else {
              //   toast.error(res?.data?.message);
              // }
            }}>
            {({ errors, getFieldProps, isSubmitting }) => (
              <Form className="space-y- text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                  {/* Firstname Field */}
                  <Input
                    label="Firstname"
                    type="text"
                    placeholder="Enter your firstname"
                    errors={errors}
                    {...getFieldProps("firstName")} // Use Formik's getFieldProps
                  />

                  {/* Lastname Field */}
                  <Input
                    label="Lastname"
                    type="text"
                    placeholder="Enter your lastname"
                    errors={errors}
                    {...getFieldProps("lastName")} // Use Formik's getFieldProps
                  />
                </div>
                {/* city Field */}
                <Input
                  label="City"
                  type="text"
                  placeholder="Enter your city"
                  errors={errors}
                  {...getFieldProps("city")} // Use Formik's getFieldProps
                />
                <div className="mb-3">
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
          <p className="text-white text-center text-sm md:text-lg">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-green-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
