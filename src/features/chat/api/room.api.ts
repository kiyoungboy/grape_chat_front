import { responseData } from "@/services/api/response";
import axios from "@/services/api/interceptor";
import type { ChatRoom } from "../types/room.type";
import { ENV } from "@/env/env";
import { mockRooms } from "@/mocks/room.mock";
import { mockParticipants } from "@/mocks/participant.mock";

export const getChatRooms = async () => {

    if(ENV.USE_MOCK){
        return mockRooms;
    }

    const response = await axios.get("/chat/rooms");

    return responseData<ChatRoom[]>(response);
}

export const getRoomParticipants = async (roomKey: string) => {

    if(ENV.USE_MOCK){
        return mockParticipants;
    }
    const response = await axios.get(`/chat/rooms/${roomKey}/participants`, {withCredentials: true},);

    return response.data;
}