import api from "@/services/api/interceptor";

export interface CreateRoomRequest {

    roomName: string;

    roomType: string;

    userKeys: string[];
}

export interface CreateRoomResponse {

    roomKey: string;

    roomName: string;

    roomType: string;

    unreadCount: number;
}

export const createRoom =
    async (
        request: CreateRoomRequest
    ) => {

    const response =
        await api.post(
            "/chat/rooms",
            request
        );

    return response.data;
};