import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import https from "https";
import queryString from "qs";

const client = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const handleUnAuthorized = () => {
  return null;
};

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    config.paramsSerializer = (params) =>
      queryString.stringify(params, { indices: false });
    return config;
  },
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login/"
    ) {
      handleUnAuthorized();
    }
    return error;
  }
);

client.interceptors.response.use(
  (config: AxiosResponse<any>) => config?.data ?? config,
  (error: any) => {
    if (
      error?.response?.status === 401 &&
      window.location.pathname !== "/login/"
    ) {
      handleUnAuthorized();
    }
    return error;
  }
);

export default client;
