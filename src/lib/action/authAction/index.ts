// /src/lib/action/authAction/index.tsx

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { removeCookie, setCookie } from "typescript-cookie";

import axiosInstance from "../../../api";
import {
  AuthRes,
  LoginFormValues,
  RegistrationFormValues,
} from "../../../types";
import { authFailure, authSuccess, authUser, logout } from "../../reducer/authReducer";
import { AppDispatch, AppThunk } from "../..";

export const LoginAction =
  (values: LoginFormValues) =>
  async (dispatch: AppDispatch): Promise<AuthRes | undefined> => {
    try {
      const response = await axiosInstance.post("/login", values);
      if (response?.status === 200) {
        // Store token and user data in cookies
        setCookie("auth_token", response?.data?.payload?.token, {
          expires: 1, // 1 day expiry for token
          secure: true,
          sameSite: "Lax",
        });
        setCookie("user_data", JSON.stringify(response?.data?.payload?.user), {
          expires: 1,
          secure: true,
          sameSite: "Lax",
        });

        // Dispatch user information to Redux store
        dispatch(
          authUser({
            user: response?.data?.payload?.user,
            token: response?.data?.payload?.token,
          })
        );
        // dispatch(authSuccess(response?.data?.message));
        // toast.success(response?.data?.message);
      } else {
        dispatch(authFailure(response?.data?.message));
        toast.error(response?.data?.message);
      }

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.message);
      }
    }
  };

export const RegAction =
  (values: RegistrationFormValues) =>
  async (dispatch: AppDispatch): Promise<AuthRes | undefined> => {
    try {
      const response = await axiosInstance.post("/register", values);

      dispatch(authSuccess(response?.data?.message));
      toast.success(response?.data?.message);
      const userId = response.data.data._id;
      setCookie("userId", userId);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.message);
      }
    }
  };

export const LogoutAction = (): AppThunk => (dispatch) => {
  dispatch(logout()); // Dispatch the logout action
  removeCookie("auth_token"); // Remove token from cookies
  removeCookie("user_data"); // Remove user data from cookies
  toast.success("Logout successful, redirecting...");
};

// export const verifyEmailAction =
//   (otp: string, navigate: () => void) =>
//   async (dispatch: AppDispatch): Promise<AuthResponse | undefined> => {
//     try {
//       dispatch(authStart());
//       const response = await apiRequest.post("/auth/verify-email", { otp });
//       dispatch(authSuccess(response?.data?.message));
//       toast.success(response?.data?.message);
//       navigate();

//       return { status: response.status, message: response?.data?.message };
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         // AxiosError handling
//         console.log(error.response);
//         toast.error(error.response?.data?.message || "Verification failed.");
//         dispatch(authFailure(error.response?.data?.message));
//       } else {
//         // Generic error handling
//         console.log(error);
//         toast.error("An unexpected error occurred.");
//         dispatch(authFailure("An unexpected error occurred."));
//       }
//     }
//   };

// export const resendOtpAction = (): AppThunk => async (dispatch) => {
//   try {
//     const userId = getCookie("userId"); // Get userId from cookies
//     if (!userId) throw new Error("User ID not found");

//     dispatch(authStart());
//     const response = await apiRequest.post(`/auth/resend-otp/${userId}`);
//     toast.success(response.data.message);
//     dispatch(authSuccess(response.data.message));

//     return response;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   }
// };

// export const forgotPassword =
//   (value: { email: string }) =>
//   async (dispatch: AppDispatch): Promise<AuthResponse | undefined> => {
//     try {
//       dispatch(authStart());
//       const response = await apiRequest.post("/auth/forgot-password", value);

//       dispatch(authSuccess(response?.data?.message));
//       toast.success(response?.data?.message);
//       const userId = response.data.data._id;
//       setCookie("userId", userId);

//       return { status: response.status, message: response?.data?.message };
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         console.log(error.response);
//         toast.error(error.response?.data?.message || "Failed");
//         dispatch(authFailure(error.response?.data?.message));
//       } else {
//         console.log(error);
//         toast.error("An unexpected error occurred.");
//         dispatch(authFailure("An unexpected error occurred."));
//       }
//     }
//   };

// export const resetPassword =
//   (values: { otp: string; password: string }) =>
//   async (dispatch: AppDispatch): Promise<AuthResponse | undefined> => {
//     const userId = getCookie("userId"); // Get userId from cookies
//     if (!userId) throw new Error("User ID not found");
//     try {
//       dispatch(authStart());
//       const response = await apiRequest.post(
//         `/auth/reset-password/${userId}`,
//         values
//       );
//       dispatch(authSuccess(response?.data?.message));
//       toast.success(response?.data?.message);

//       return { status: response.status, message: response?.data?.message };
//     } catch (error: unknown) {
//       if (error instanceof AxiosError) {
//         console.log(error.response);
//         toast.error(
//           error.response?.data?.message || "Failed to reset password."
//         );
//         dispatch(authFailure(error.response?.data?.message));
//       } else {
//         console.log(error);
//         toast.error("An unexpected error occurred.");
//         dispatch(authFailure("An unexpected error occurred."));
//       }
//     }
//   };
