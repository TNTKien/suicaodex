import { siteConfig } from "@/config/site";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: siteConfig.mangadexAPI.baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
