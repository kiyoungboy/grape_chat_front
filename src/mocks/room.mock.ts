import type { ChatRoom } from "@/features/chat/types/room.type";
export const mockRooms: ChatRoom[] = [

    {
        roomKey: "room-001",
        roomName: "프론트 UI 테스트방",
        lastMessageContent: "마지막 메시지입니다.",
        lastMessageAt: "2026-06-11T15:00:00",
        unreadCount: 3,
    },

    {
        roomKey: "room-002",
        roomName: "1:1 채팅 테스트",
        lastMessageContent: "안읽음 없음",
        lastMessageAt: "2026-06-11T14:50:00",
        unreadCount: 0,
    },

];