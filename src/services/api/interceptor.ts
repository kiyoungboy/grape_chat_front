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

export default axiosInstance;