import axios from "axios";

const NEXT_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: NEXT_BASE_URL + "/api/mangadex",
});

export default axiosInstance;
