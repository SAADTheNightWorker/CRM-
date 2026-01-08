import { notification } from "antd";
import axios from "axios";

// const baseURL = "https://ops.claimwolfgroup.com/api";
const baseURL = "http://localhost:3000/api/";
// const authURL = "http://localhost:3000/";
 const authURL = "https://ops.claimwolfgroup.com";
// const claim_Wolf = "https://.com/api/";

export const userRequest = axios.create({
  baseURL: baseURL,
});
export const authRequest = axios.create({
  baseURL: authURL,
});

// export const userRequest_claim_Wolf = axios.create({
//   baseURL: claim_Wolf,
// });

// export const emailRequestFromAd = axios.create({
//   baseURL: adURL,
//});

//Add a request interceptor to include the Authorization header with the token

userRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if token is missing
      window.location.href = "/login";
      return Promise.reject("No token found");
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      //Token expired or invalid, redirect // to login page
      localStorage.removeItem("token"); // Clear the token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// userRequestForFL.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// emailRequestFromAd.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

userRequest.interceptors.response.use(
  (response) => {
    // console.log("response");
    return response;
  },
  (error) => {
    // console.log("error in api routes ", error);
    const is401 = error.message === "Request failed with status code 401";
    const is500 = error.message === "Request failed with status code 500";
    const isTooManyReq = error?.response?.status === 429;
    if (isTooManyReq) {
      notification.error({
        message: "Too Many Request",
        description:
          "You have exceeded the limit. Please try again after 15 minutes.",
        placement: "topRight",
        className: "font-inter font-medium",
        duration: 0,
      });
    } else if (is401) {
      // Check for token expiration
      // Redirect to the sign-out page
      // localStorage.removeItem("username");
      // localStorage.removeItem("token");
      // sessionStorage.clear();

      // is401
      //   ? toast.error("Session Expire Need to Signin Again")
      //   : toast.error("Internal Server Error try later");

      // window.location.href = "http://localhost:5173/login";
    }
    return Promise.reject(error);
  }
);
