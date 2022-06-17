import axios from "axios";
import { getLocal } from "../utils/storage";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});
axiosInstance.interceptors.request.use(function (config) {
  console.log("config", config);
  const token = getLocal("access_token");
  config.headers = {
    "Content-Type": "application/json",
  };
  // if (token) {
  //   config.headers["Authorization"] = `Bearer ${token}`;
  // }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("token get", config);
  return config;
});

export default axiosInstance;

// /* eslint-disable no-undef */
// // import { toast } from "react-toastify";
// import axios from "axios";
// // import { API_BASE_URL } from "../config";

// // import "react-toastify/dist/ReactToastify.min.css";
// // import { ErrorToast } from "../components/Toast/Toast";
// const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
// export const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// // For Refreshing Token
// let isAlreadyFetchingAccessToken = false;

// // For Refreshing Token
// let subscribers = [];

// // Add a request interceptor
// axiosInstance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("access_token");
//   // localStorage.getItem("set_old_access_token")
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
//       const refresh_token = localStorage.getItem("refresh_token");
//       if (refresh_token) {
//         // Refresh Token Promise
//         if (!isAlreadyFetchingAccessToken) {
//           isAlreadyFetchingAccessToken = true;

//           refreshAccessToken(refresh_token)
//             .then((response) => {
//               isAlreadyFetchingAccessToken = false;
//               // Replacing Tokens
//               localStorage.removeItem("access_token");
//               localStorage.removeItem("refresh_token");
//               localStorage.setItem(
//                 "access_token",
//                 response.data.data.access_token
//               );
//               localStorage.setItem(
//                 "refresh_token",
//                 response.data.data.refresh_token
//               );
//               onAccessTokenFetched(response.data.data.access_token);
//             })
//             .catch(() => {
//               isAlreadyFetchingAccessToken = false;
//               // Removing User State
//               localStorage.removeItem("access_token");
//               localStorage.removeItem("refresh_token");

//               // showToast("Error !", error.response.data.message, "error");
//               // toast.error(ErrorToast(error.response.data.message), {
//               //   hideProgressBar: true,
//               //   autoClose: "100",
//               // });
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
