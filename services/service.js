import axiosInstance from "./axiosConfig";

export const login = async (data) => {
  const response = await axiosInstance.post(
    "canopi-payments/registration/v1/authenticate",
    data
  );
  return response.data;
};

export const fetchDashboardDetailService = async (entityId) => {
  const response = await axiosInstance.get(
    `canopi-payments/portal/dashboard/${entityId}`
  );
  return response.data;
};
