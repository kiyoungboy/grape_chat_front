import { ENV } from "@/env/env"

export const redirectToLogin = () => {
    window.location.href = ENV.AUTH_LOGIN_URL;
};