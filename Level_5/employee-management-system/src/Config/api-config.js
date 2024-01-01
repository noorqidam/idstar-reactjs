import axios from "axios";
import qs from "query-string";
import { clientIdData } from "src/Utils/userLocalService";

const cancelTokenSource = axios.CancelToken.source();

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const apiConfig = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 310000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

apiConfig.interceptors.request.use(
  (config) => {
    const token = clientIdData().access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.cancelToken = cancelTokenSource.token;

    return config;
  },
  (error) => Promise.reject(error)
);

apiConfig.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;
    // 400/500 Intermitent/PII Hiden
    // 401/403 Unauthorize

    if (
      (err.response.status === 403 || err.response.status === 401) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiConfig(originalRequest);
          })
          .catch((error) => Promise.reject(error));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        apiConfig
          // eslint-disable-next-line no-undef
          .post(`${process.env.REACT_APP_API_URL}/oauth/token`, {
            refreshToken: clientIdData().refreshToken,
          })
          .then(({ data }) => {
            processQueue(null, data);
            resolve(apiConfig(originalRequest));
          })
          .catch((error) => {
            processQueue(error, null);
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(err);
  }
);

export default apiConfig;
