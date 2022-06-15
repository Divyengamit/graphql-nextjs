import { axiosInstance } from "./axiosConfig";

export const login = async (data) => {
  const response = await axiosInstance.post(
    "canopi-payments/registration/v1/authenticate",
    data
  );
  return response.data;
};

export const registerUserService = async (body) => {
  Object.keys(body).forEach((key) => {
    if (body[key] === undefined) {
      delete body[key];
    }
  });
  body["countryCode"] = "91";

  return axiosInstance.post("canopi-payments/portal/register/basic-info", body);
};

export const createUserPasswordService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/register/credentials",
    body
  );
};
