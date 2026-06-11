import { ENV } from "@/env/env";
import api from "@/services/api/interceptor";
import { responseData } from "../api/response";

export interface MeResponse {
    userKey: string;
    userEmail: string;
    loginAuth: string;
}

export const getMe = async () => {

    if(ENV.USE_MOCK){
            return {
                userKey: "mock-user-001",
                userEmail: "mock@test.com",
                loginAuth: "L",
            };
        }

    const response = await api.get("/auth/me");

    return responseData<MeResponse>(response);
}