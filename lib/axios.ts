import { siteConfig } from "@/config/site";
import axios from "axios";

// const NEXT_BASE_URL =
//   process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  //baseURL: NEXT_BASE_URL + "/api/mangadex", // uncomment this line and above if you want to use built-in proxy
  baseURL: siteConfig.suicaodex.apiURL,
});

export default axiosInstance;
