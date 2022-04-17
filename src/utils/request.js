import axios from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";

const request = axios.create({
  baseURL: process.env.REACT_APP_API,

  paramsSerializer: (params) =>
    queryString.stringify(params, {
      skipEmptyString: true,
      skipNull: true,
    }),
});

request.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${Cookies.get(process.env.REACT_APP_TOKEN)}`,
  },
}));

request.interceptors.response.use(
  (response) => response.data,
  (error) => {

    if (error.response) {
      if (
        !error.request.responseURL.endsWith("login") &&
        (error.response.status === 401 || error.response.status === 403) &&
        typeof window !== "undefined"
      ) {
        document.cookie = `${process.env.REACT_APP_TOKEN}=`;
        window.location.href = "/login";
      }

      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(
        new Error("The request was made but no response was received")
      );
    }
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(new Error("Something went wrong, Please try again."));
  }
);

export default request;
