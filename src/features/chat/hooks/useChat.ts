import { useEffect, useRef } from "react"
import { useChatStore } from "../store/chat.store";
import { getMessages } from "../api/chat.api";
import { useRoomStore } from "../store/room.store";
import { useWebSocketStore } from "@/features/websocket/store/websocket.store";
import { useAuthStore } from "@/store/auth.store";

export const useChat = () => {
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const currentRoom = useRoomStore((state) => state.currentRoom);
    const messages = useChatStore((state) => state.messages);
    const setMessages = useChatStore((state) => state.setMessages);
    const clearMessages = useChatStore((state) => state.clearMessages);
    const client = useWebSocketStore((state) => state.client);
    const userKey = useAuthStore((state) => state.userKey);

    useEffect(() => {
        const initialize = async () => {
            if(!currentRoom) {
                return;
            }

            try{
                clearMessages();

                const response = await getMessages(currentRoom.roomKey);
                setMessages(response);
                const lastMessage = response[response.length - 1];

                if(lastMessage && client){
                    client.publish({
                        destination:"publish/chat/event",
                        body: JSON.stringify({
                            eventType: "READ",
                            payload: {
                                roomKey: currentRoom.roomKey,
                                userKey,
                                messageKey: lastMessage.messageKey,
                            },
                        }),
                    });
                }
            } catch(error){
                console.error(error);
            }
        };

        initialize();
    }, [currentRoom, setMessages, clearMessages, client, userKey]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return { currentRoom, messages, messageEndRef};
};