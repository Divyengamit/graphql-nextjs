import React, { createContext, useCallback, useMemo } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
const baseUrl = "https://ppi-test.canopi.in/";

// const baseUrl =
//   process.env.REACT_APP_API_ENDPOINT || "https://ppi-test.canopi.in/";

const APIContext = createContext();
const { Provider } = APIContext;

const APIProvider = ({ children }) => {
  const auth = useSelector((state) => state?.auth);
  const token = auth?.token;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: headers,
  });

  const login = useCallback(
    ({ email, password }) => {
      return axiosInstance.post(
        "canopi-payments/registration/v1/authenticate",
        {
          emailAddress: email,
          password,
        }
      );
    },
    [axiosInstance]
  );

  const auth_2FA = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/registration/v1/authenticate-by-2fa",
        body
      );
    },
    [axiosInstance]
  );

  const registerUser = useCallback(
    (body) => {
      Object.keys(body).forEach((key) => {
        if (body[key] === undefined) {
          delete body[key];
        }
      });
      body["countryCode"] = "91";

      return axiosInstance.post(
        "canopi-payments/portal/register/basic-info",
        body
      );
    },
    [axiosInstance]
  );

  const verifyOTP = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/portal/register/verify-mobileNo",
        body
      );
    },
    [axiosInstance]
  );

  const resendOTP = useCallback((mobile) => {
    return axiosInstance.get(
      `/canopi-payments/portal/register/resend-otp/${mobile}`
    );
  });

  const createUserPassword = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/portal/register/credentials",
        body
      );
    },
    [axiosInstance]
  );

  const registerUserInfo = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/portal/register/address-info",
        body
      );
    },
    [axiosInstance]
  );

  const uploadDoc = useCallback(
    (data) => {
      const body = new FormData();
      for (let key in data) {
        body.append(key, data[key]);
      }

      return axiosInstance.post(
        "canopi-payments/portal/register/document-info",
        body
      );
    },
    [axiosInstance]
  );

  const fetchDashboardDetails = useCallback(
    (entityId) => {
      return axiosInstance.get(`/canopi-payments/portal/dashboard/${entityId}`);
    },
    [axiosInstance]
  );

  const applyCard = useCallback(
    (entityId) => {
      return axiosInstance.get(
        `/canopi-payments/portal/dashboard/apply-app/${entityId}`
      );
    },
    [axiosInstance]
  );

  const applyCardConfirm = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/portal/dashboard/apply-app-confirm",
        body
      );
    },
    [axiosInstance]
  );

  const forgetPassword = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/registration/v1/forgot-password",
        body
      );
    },
    [axiosInstance]
  );

  const verifyEmailOtp = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/registration/v1/verify-email-otp",
        body
      );
    },
    [axiosInstance]
  );

  const resetPassword = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/registration/v1/reset-password",
        body
      );
    },
    [axiosInstance]
  );

  const enable_2FA = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/portal/dashboard/enable-2fa",
        body
      );
    },
    [axiosInstance]
  );

  const verify_2FA = useCallback(
    (body) => {
      return axiosInstance.post(
        "canopi-payments/portal/dashboard/verify-2fa-code",
        body
      );
    },
    [axiosInstance]
  );

  const applyEquipmentFinance = useCallback(
    (data) => {
      const body = new FormData();
      for (let key in data) {
        body.append(key, data[key]);
      }

      return axiosInstance.post(
        "canopi-payments/portal/dashboard/apply-equipment-finance",
        body
      );
    },
    [axiosInstance]
  );

  const apis = useMemo(
    () => ({
      login,
      registerUser,
      verifyOTP,
      resendOTP,
      createUserPassword,
      registerUserInfo,
      uploadDoc,
      fetchDashboardDetails,
      applyCard,
      applyCardConfirm,
      forgetPassword,
      verifyEmailOtp,
      resetPassword,
      auth_2FA,
      enable_2FA,
      verify_2FA,
      applyEquipmentFinance,
    }),
    [axiosInstance]
  );

  return <Provider value={apis}>{children}</Provider>;
};
export { APIContext, APIProvider };
