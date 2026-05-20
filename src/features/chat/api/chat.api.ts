import { responseData } from "@/services/api/response";
import axios from "@/services/api/interceptor";
import type { MessageEventPayload } from "../types/message.type";

export interface SendMessageRequest {
    roomKey: string;

    messageType: string;

    messageContent: string;

    fileKey: string | null;
}

export const getMessages = async( roomKey: string ) => {
    const response = await axios.get(`/api/chat/message/${roomKey}`);

    return responseData<MessageEventPayload[]>(response);
}

export const sendMessage = async ( request: SendMessageRequest ) => {
    const response = await axios.post("/api/chat/message", request);

    return responseData<MessageEventPayload>(response);
}