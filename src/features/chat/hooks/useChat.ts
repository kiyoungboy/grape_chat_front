import { useEffect, useRef } from "react"
import { useChatStore } from "../store/chat.store";
import { getHistory, getMessages } from "../api/chat.api";
import { useRoomStore } from "../store/room.store";
import { useWebSocketStore } from "@/features/websocket/store/websocket.store";
import { useAuthStore } from "@/store/auth.store";
import { useChatUiStore } from "../store/chatUi.store";

export const useChat = () => {

    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const currentRoom = useRoomStore((state) => state.currentRoom);
    const messages = useChatStore((state) => state.messages);
    const setMessages = useChatStore((state) => state.setMessages);
    const clearMessages = useChatStore((state) => state.clearMessages);
    const client = useWebSocketStore((state) => state.client);
    const userKey = useAuthStore((state) => state.userKey);
    const prependMessages = useChatStore((state) => state.prependMessages);
    const loadingHistoryRef = useRef(false);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);
    const clearNewMessage = useChatUiStore((state) => state.clearNewMessage);
    const scrollBottom = () => {
        requestAnimationFrame(() => {
            messageEndRef.current?.scrollIntoView({
                behavior: "smooth",
            });

            clearNewMessage();
        })
    }
    const isNearBottom = () => {
        const container = messageContainerRef.current;

        if(!container){
            return true;
        }

        return (container.scrollHeight - container.scrollTop - container.clientHeight) < 100;
    };

    useEffect(() => {
        const initialize = async () => {
            if(!currentRoom) {
                return;
            }

            try{
                clearMessages();

                const response = await getMessages(currentRoom.roomKey);
                setMessages(response);
                requestAnimationFrame(() => {scrollBottom();})
                const lastMessage = response[response.length - 1];

                if(lastMessage && client){
                    client.publish({
                        destination:"publish/chat/read",
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

    /** 이전 메시지 로드 */
    const loadHistory = async () => {
        if(!currentRoom || messages.length === 0 || loadingHistoryRef.current){
            return;
        }

        loadingHistoryRef.current = true;

        try{
            const oldestMessage = messages[0];
            const response = await getHistory(currentRoom.roomKey, oldestMessage.createdAt);

            if(response && response.length > 0){
                const container = messageContainerRef.current;

                const previousHeight = container?.scrollHeight ?? 0;

                prependMessages(response);

                requestAnimationFrame(() => {
                    if(!container){
                        return;
                    }

                    const currentHeight = container.scrollHeight;

                    container.scrollTop += currentHeight - previousHeight;
                });
            }
        } catch(error){
            console.error(error);
        } finally{
            loadingHistoryRef.current = false;
        }
    } 

    /** 스크롤 최상단 감지 */
    const handleScroll = async () => {
        const container = messageContainerRef.current;

        if(!container){
            return;
        }

        if(container.scrollTop <= 20){
            await loadHistory();
        }
    };

    return { currentRoom, messages, messageEndRef, messageContainerRef, handleScroll, scrollBottom, isNearBottom};
};