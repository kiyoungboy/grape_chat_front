import type { MessageEventPayload } from "@/features/chat/types/message.type";

export const mockMessagesByRoom:
    Record<string, MessageEventPayload[]> = {

    "room-001": [
        {
            messageKey: "msg-001",
            roomKey: "room-001",
            senderUserKey: "mock-user-001",
            senderNickname: "기영",
            messageType: "TEXT",
            messageContent: "내가 보낸 메시지",
            createdAt: "2026-06-11T15:00:00",
            readCount: 1,
        },

        {
            messageKey: "msg-002",
            roomKey: "room-001",
            senderUserKey: "mock-user-002",
            senderNickname: "히스무",
            messageType: "TEXT",
            messageContent: "상대방 메시지",
            createdAt: "2026-06-11T15:01:00",
            readCount: 0,
        },
    ],

    "room-002": [
        {
            messageKey: "msg-003",
            roomKey: "room-002",
            senderUserKey: "mock-user-003",
            senderNickname: "홍길동",
            messageType: "TEXT",
            messageContent: "1:1 채팅 테스트",
            createdAt: "2026-06-11T15:02:00",
            readCount: 0,
        },
    ],
};