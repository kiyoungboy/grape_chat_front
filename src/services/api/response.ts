import type { AxiosResponse } from "axios";

export const responseData = <T>(
    response: AxiosResponse<T>
): T => {
    return response.data;
};