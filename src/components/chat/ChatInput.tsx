import { useRef, useState } from "react";

import styles from "./ChatInput.module.css";

import { useRoomStore } from "@/features/chat/store/room.store";

import { useWebSocketStore } from "@/features/websocket/store/websocket.store";

import { useAuthStore } from "@/store/auth.store";
import { sendMessage } from "@/features/chat/api/chat.api";

export default function ChatInput() {

    const [message, setMessage] =
        useState("");

    const typingTimeoutRef =
        useRef<number | null>(null);

    const client =
        useWebSocketStore(
            (state) => state.client
        );

    const currentRoom =
        useRoomStore(
            (state) => state.currentRoom
        );

    const userKey =
        useAuthStore(
            (state) => state.userKey
        );

    const canChat = !!currentRoom;

    const publishTypingStart = () => {
        if (
            !client ||
            !currentRoom
        ) {
            return;
        }

        client.publish({
            destination:
                "/publish/chat/typing",
            body: JSON.stringify({

                roomKey: currentRoom.roomKey,

                userKey,

                typing: true,
            }),
        });
    };

    const publishTypingStop = () => {

        if (!client || !currentRoom) {
            return;
        }
        client.publish({
            destination:
                "/publish/chat/typing",
            body: JSON.stringify({
                roomKey: currentRoom.roomKey,

                userKey,

                typing: false,
            }),
        });
    };

    const handleChange = (
        event:
            React.ChangeEvent<HTMLInputElement>
    ) => {
        setMessage(
            event.target.value
        );

        publishTypingStart();

        if (
            typingTimeoutRef.current
        ) {

            clearTimeout(
                typingTimeoutRef.current
            );
        }

        typingTimeoutRef.current =
            window.setTimeout(() => {

                publishTypingStop();

            }, 1500);
    };

    const handleSend = async() => {
        if (
            !currentRoom
        ) {
            return;
        }

        const trimmed =
            message.trim();

        if (!trimmed) {
            return;
        }

        await sendMessage({
            roomKey: currentRoom.roomKey,
            messageType: "MESSAGE",
            messageContent: trimmed,
            fileKey: null,
        })

        publishTypingStop();

        setMessage("");
    };

    const handleKeyDown = (
        event:
            React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (
            event.key === "Enter"
        ) {

            handleSend();
        }
    };

    return (
        <div className={styles.wrapper}>

            <input
                disabled={!canChat}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={
                    canChat ? "메세지를 입력하세요." : "채팅방을 선택하세요."
                }
            />

            <button
                type="button"
                disabled={!canChat}
                onClick={handleSend}
            >
                전송
            </button>

        </div>
    );
}