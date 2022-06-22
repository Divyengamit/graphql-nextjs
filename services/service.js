/* eslint-disable no-undef */
import axiosInstance from "./axiosConfig";

// Auth Services
export const login = async (data) => {
  const response = await axiosInstance.post(
    "canopi-payments/registration/v1/authenticate",
    data
  );
  return response.data;
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

export const createUserPasswordService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/register/credentials",
    body
  );
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

export const registerUserInfoService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/register/address-info",
    body
  );
};

// Dashboard Services
export const fetchDashboardDetailService = async (entityId) => {
  const response = await axiosInstance.get(
    `canopi-payments/portal/dashboard/${entityId}`
  );
  return response.data;
};

// export const applyEquipmentFinance = (data) => {
//   return new Promise((resolve, reject) => {
//     const body = new FormData();
//     for (let key in data) {
//       body.append(key, data[key]);
//     }
//     axiosInstance
//       .post("canopi-payments/portal/dashboard/apply-equipment-finance", body)
//       .then((response) => {
//         if (response.status === 200) {
//           resolve(response);
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

export const updateProfileService = (data) => {
  const body = new FormData();
  for (let key in data) {
    body.append(key, data[key]);
  }

  return axiosInstance.post(
    "canopi-payments/portal/dashboard/update-profile",
    body
  );
};

export const addAddressService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/dashboard/save-address",
    body
  );
};

export const setPrimaryAddressService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/dashboard/set-address-primary",
    body
  );
};

export const removeAddressService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/dashboard/delete-address",
    body
  );
};

export const addEmailService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/dashboard/add-aditional-email",
    body
  );
};

export const removeInfoService = (body) => {
  return axiosInstance.post(
    "canopi-payments/portal/dashboard/delete-aditional-contact",
    body
  );
};
