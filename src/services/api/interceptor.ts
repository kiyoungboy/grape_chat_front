import { getCsrfToken } from "@/utils/cookie";
import { redirectToLogin } from "../auth/auth.redirect";
import axiosInstance from "./axios";

axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;

        if(status === 401) {
            redirectToLogin();
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config) => {

        const csrfToken = getCsrfToken();

        if(csrfToken){
            config.headers["X-CSRF-TOKEN"] = csrfToken;
        }
        return config;
    }
)

export default axiosInstance;