import { siteConfig } from "@/config/site";
import axios from "axios";

const NEXT_BASE_URL = process.env.NEXT_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: NEXT_BASE_URL + "/api/proxy?url=" + siteConfig.mangadexAPI.baseURL,
});

export default axiosInstance;
