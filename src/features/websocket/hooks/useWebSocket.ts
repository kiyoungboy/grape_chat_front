import { useChatStore } from "@/features/chat/store/chat.store";
import { useRoomStore } from "@/features/chat/store/room.store";
import type { StompSubscription } from "@stomp/stompjs"
import { useEffect, useRef } from "react"
import { useWebSocketStore } from "../store/websocket.store";
import { createStompClient } from "@/services/websocket/stomp";

import { useTypingStore }from "@/features/typing/store/typing.store";
import type { ReadEventPayload } from "@/features/chat/types/read.type";
import { useAuthStore } from "@/store/auth.store";
import { usePresenceStore } from "@/features/presence/store/presence.store";
import { getChatRooms } from "@/features/chat/api/room.api";
import { useChatUiStore } from "@/features/chat/store/chatUi.store";

export const useWebSocket = () => {
    const subscriptionRef = useRef<StompSubscription | null>(null);
    const currentRoom = useRoomStore((state) => state.currentRoom);
    const addMessage = useChatStore((state) => state.addMessage);
    const setClient = useWebSocketStore((state) => state.setClient);
    const setConnected = useWebSocketStore((state) => state.setConnected);
    const updateRoomLastMessage = useRoomStore((state) => state.updateRoomLastMessage);
    const increaseUnreadCount = useRoomStore((state) => state.increaseUnreadCount);
    const addRoom = useRoomStore((state) => state.addRoom);
    const setConnecting = useWebSocketStore((state) => state.setConnecting);
    const setTyping = useTypingStore((state) => state.setTyping);
    const removeTyping = useTypingStore((state) => state.removeTyping);
    const markMessageAsRead = useChatStore((state) => state.markMessageAsRead);
    const myUserKey = useAuthStore((state) => state.userKey);
    const setUsers = usePresenceStore((state) => state.setUsers);
    const client = useWebSocketStore((state) => state.client);
    const connected = useWebSocketStore((state) => state.connected);
    const setRooms = useRoomStore((state) => state.setRooms);
    const increaseNewMessage = useChatUiStore((state) => state.increaseNewMessage);

    useEffect(() => {
        const client = createStompClient();

        client.onConnect = () =>{

            setConnecting(false);

            setConnected(true);

            console.log("WebSocket Connected");

            client.subscribe(
                "/subscribe/presence",
                (message) => {
                    const users = JSON.parse(message.body);

                    console.log("ONLINE USERS =",
                        users
                    );

                    setUsers(users);
                }
            );

            if(myUserKey){
                client.subscribe(
                    `/subscribe/users/${myUserKey}`,

                    async (message) => {
                        const event = JSON.parse(message.body);

                        switch(event.eventType){
                            case "ROOM_INVITE": {
                                const rooms = await getChatRooms();
                                setRooms(rooms);
                                break;
                            }

                            case "ROOM_CREATED": {
                                const rooms = await getChatRooms();
                                setRooms(rooms);
                                break;
                            }

                            case "ROOM_MESSAGE": {
                                const payload = event.payload;

                                if(currentRoom?.roomKey !== payload.roomKey){
                                    increaseUnreadCount(payload.roomKey);
                                }
                                break;
                            }

                            default: break;
                        }
                    }
                )
            }

            client.publish({
                destination: "/publish/presence/sync",
                body:""
            });
        };

        client.onDisconnect = () => {
            setConnecting(false);

            setConnected(false);

            console.log("WebSocket Disconnected");
        };

        setConnecting(true);

        client.activate();
        setClient(client);

        return () => { client.deactivate(); };
    }, [setClient, setConnected, setConnecting, myUserKey, addRoom]);

    useEffect(() => {

        if(!client || !currentRoom || !connected){
            return;
        }

        subscriptionRef.current?.unsubscribe();

        console.log("SUBSCRIBE START");

        subscriptionRef.current = client.subscribe(`/subscribe/chat/${currentRoom.roomKey}`,
            (message) => {

                console.log("MESSAGE RECEIVED", message.body);
                const event = JSON.parse(message.body);

                switch(event.eventType) {
                    case "MESSAGE": {
                        const payload = event.payload;
                        addMessage(payload);
                        updateRoomLastMessage(
                            payload.roomKey,
                            payload.messageContent
                        );

                        const container = document.querySelector('[data-chat-container="true"]') as HTMLElement | null;

                        const isNearBottom = !container ? true : (container.scrollHeight - container.scrollTop - container.clientHeight) < 100;

                        if(isNearBottom){
                            setTimeout(() => {
                                document.getElementById("chat-end")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                            }, 0)
                        }else{
                            increaseNewMessage();
                        }

                        if(currentRoom.roomKey !== payload.roomKey){
                            increaseUnreadCount(payload.roomKey);
                        }

                        break;
                    }

                    case "TYPING_START": {
                        const payload = event.payload

                        if(payload.userKey === myUserKey){
                            break;
                        }

                        setTyping(payload.email);
                        break;
                    }

                    case "TYPING_STOP": {
                        const payload = event.payload;

                        if(payload.userKey === myUserKey){
                            break;
                        }

                        removeTyping(payload.email);
                        break;
                    }

                    case "READ": {
                        const payload = event.payload as ReadEventPayload;
                        markMessageAsRead(payload.messageKey, payload.readCount);
                        break;
                    }

                    default: break;
                }
            }
        );

        return () => { subscriptionRef.current?.unsubscribe(); };
    }, [currentRoom, addMessage, updateRoomLastMessage, increaseUnreadCount, setTyping, removeTyping, markMessageAsRead, myUserKey, client, connected]);
};