import { responseData } from "@/services/api/response";
import axios from "@/services/api/interceptor";
import type { ChatRoom } from "../types/room.type";

export const getChatRooms = async () => {
    const response = await axios.get("/chat/rooms");

    return responseData<ChatRoom[]>(response);
}

export const getRoomParticipants = async (roomKey: string) => {
    const response = await axios.get(`/chat/rooms/${roomKey}/participants`, {withCredentials: true},);

    return response.data;
}