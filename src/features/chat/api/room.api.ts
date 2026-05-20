import { responseData } from "@/services/api/response";
import axios from "@/services/api/interceptor";
import type { ChatRoom } from "../types/room.type";

export const getChatRooms = async () => {
    const response = await axios.get("/api/chat/rooms");

    return responseData<ChatRoom[]>(response);
}