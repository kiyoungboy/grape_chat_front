
import api from "@/services/api/interceptor";
import { responseData } from "../api/response";

export interface MeResponse {
    userKey: string;
    userEmail: string;
    loginAuth: string;
}

export const getMe = async () => {
    const response = await api.get("/api/auth/me");

    return responseData<MeResponse>(response);
}