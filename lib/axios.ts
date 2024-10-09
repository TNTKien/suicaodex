import { siteConfig } from "@/config/site";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: siteConfig.mangadexAPI.proxyUrl + siteConfig.mangadexAPI.baseURL,
});

export default axiosInstance;
