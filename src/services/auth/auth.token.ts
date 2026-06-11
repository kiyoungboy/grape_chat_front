import { ENV } from "@/env/env";
import axios from "axios";

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

    const response = await axios.get<MeResponse>(
        "http://localhost:8181/auth/me",
        {
            withCredentials: true,
        }
    );

    return response.data;
};