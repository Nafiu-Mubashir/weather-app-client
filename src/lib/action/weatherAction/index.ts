import { AxiosError } from "axios";
import { toast } from "react-toastify";

import axiosInstance from "../../../api";
import { DashboardResponse } from "../../../types";
import { fetchWeatherSuccess } from "../../reducer/weatherReducer";
import { AppDispatch } from "../..";

export const fetchWeatherData =
  ({ city }: { city: string }) =>
  async (dispatch: AppDispatch): Promise<DashboardResponse | undefined> => {
    console.log(city);

    try {
      const res = await axiosInstance.get("/dashboard", {
        params: { city },
      });

      if (res?.status === 200) {
        dispatch(fetchWeatherSuccess(res.data.payload));
        toast.success(res?.data?.message);
      }
      // console.log(res.data, "data");
      // setResData(data?.data.payload);
      return res.data as DashboardResponse;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.message);
      }
    }
  };
