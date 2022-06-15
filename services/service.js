import { axiosInstance } from "./axiosConfig";

export const login = async (data) => {
  const response = await axiosInstance.post(
    "canopi-payments/registration/v1/authenticate",
    data
  );
  return response.data;
};
