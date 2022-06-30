/* eslint-disable no-undef */
import axios from "axios";
import { getLocal } from "../utils/storage";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getLocal("access_token");
  config.headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    console.log("error response", error?.response);
    if (response?.status === 401) {
      if (error?.response?.data?.error !== "Unauthorized") {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      localStorage.clear();
      return Promise.reject(response);
    } else {
      return Promise.reject(error?.response);
    }
  }
);
export default axiosInstance;

// import axios from "axios";
// // import { API_BASE_URL } from "config";
// // import { showToast } from "./function/function";
// // import { getLocal, removeLocal, setLocal } from "./function/storage";
// import { getLocal, removeLocal, setLocal } from "../utils/storage";

// // export const axiosInstance = axios.create({
// //   baseURL: API_BASE_URL,
// // });

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
// });
// // For Refreshing Token
// let isAlreadyFetchingAccessToken = false;

// // For Refreshing Token
// let subscribers = [];

// // Add a request interceptor
// axiosInstance.interceptors.request.use(function (config) {
//   const token = getLocal("access_token");
//   config.headers = {
//     "Content-Type": "application/json",
//   };
//   if (token) config.headers.Authorization = `${token}`;
//   return config;
// });

// // Add a response interceptor || Middleware for 401
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     const originalRequest = config;
//     if (status === 401) {
//       const refresh_token = getLocal("refresh_token");
//       if (refresh_token) {
//         // Refresh Token Promise
//         if (!isAlreadyFetchingAccessToken) {
//           isAlreadyFetchingAccessToken = true;

//           refreshAccessToken(refresh_token)
//             .then((response) => {
//               isAlreadyFetchingAccessToken = false;
//               // Replacing Tokens
//               removeLocal("access_token");
//               removeLocal("refresh_token");
//               setLocal("access_token", response.data.data.access_token);
//               setLocal("refresh_token", response.data.data.refresh_token);

//               onAccessTokenFetched(response.data.data.access_token);
//             })
//             .catch((error) => {
//
//               isAlreadyFetchingAccessToken = false;
//               // Removing User State
//               removeLocal("access_token");
//               removeLocal("refresh_token");

//               // showToast("Error !", error.response.data.message, "error");
//               setTimeout(() => {
//                 window.location.reload();
//               }, 500);
//             });
//         }

//         const retryOriginalRequest = new Promise((resolve) => {
//           addSubscriber((accessToken) => {
//             // Make sure to assign accessToken according to your response.
//             // Change Authorization header
//             originalRequest.headers["Authorization"] = `${accessToken}`;
//             resolve(axios(originalRequest));
//           });
//         });
//         return retryOriginalRequest;
//       } else {
//         return Promise.reject(error);
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

// const onAccessTokenFetched = (accessToken) => {
//   subscribers = subscribers.filter((callback) => callback(accessToken));
// };

// const addSubscriber = (callback) => {
//   subscribers.push(callback);
// };

// const refreshAccessToken = (refresh_token) =>
//   axiosInstance.post("auth/refresh", { refresh_token });
