import { siteConfig } from "@/config/site";
import axios, { AxiosError } from "axios";
const api = axios.create({
  baseURL: siteConfig.mangadexAPI.proxyUrl + siteConfig.mangadexAPI.baseURL,
  timeout: 10000,
});

api.interceptors.response.use((res) => res, errorHandler);

async function errorHandler(error: AxiosError) {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
  return Promise.reject(error);
}

export default api;
