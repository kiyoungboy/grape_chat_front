import { ENV } from "@/env/env";
import axios from "axios";

const axiosInstance = axios.create({

    baseURL: ENV.API_BASE_URL,

    timeout: 10000,

    withCredentials: true,

    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;