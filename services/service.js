/* eslint-disable no-undef */
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

export const registerUserInfoService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/register/address-info",
    body
  );
};
export const uploadDocService = (data) => {
  return new Promise((resolve, reject) => {
    const body = new FormData();
    for (let key in data) {
      body.append(key, data[key]);
    }
    axiosInstance
      .post("canopi-payments/portal/register/document-info", body)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const verifyOTPService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/register/verify-mobileNo",
    body
  );
};

export const verifyEmailOtpService = (body) => {
  return axiosInstance.post(
    "canopi-payments/registration/v1/verify-email-otp",
    body
  );
};

export const resendOTPService = (mobile) => {
  return axiosInstance.get(
    `/canopi-payments/portal/register/resend-otp/${mobile}`
  );
};

export const forgetPasswordService = (body) => {
  return axiosInstance.post(
    "canopi-payments/registration/v1/forgot-password",
    body
  );
};

export const resetPasswordService = (body) => {
  return axiosInstance.post(
    "canopi-payments/registration/v1/reset-password",
    body
  );
};
