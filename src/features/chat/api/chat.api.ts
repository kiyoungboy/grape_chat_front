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
    const response = await axios.get(`/chat/message/${roomKey}`);

    return responseData<MessageEventPayload[]>(response);
}

export const getHistory = async (
    roomKey: string,
    before: string
) => {
    const response = await axios.get(
        `/chat/message/${roomKey}/history`,
        {
            params: {
                before,
            },
        }
    );

    return response.data;
}

export const sendMessage = async ( request: SendMessageRequest ) => {
    const response = await axios.post("/chat/message", request);

    return responseData<MessageEventPayload>(response);
}