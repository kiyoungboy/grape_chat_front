import axios from "axios";

export interface MeResponse {

    userKey: string;

    userEmail: string;

    loginAuth: string;
}

export const getMe = async () => {

    const response = await axios.get<MeResponse>(
        "http://localhost:8181/api/auth/me",
        {
            withCredentials: true,
        }
    );

    return response.data;
};