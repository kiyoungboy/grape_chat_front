import type { ChatRoomParticipant }
from "@/features/presence/types/presence.type";

export const mockParticipants:
    ChatRoomParticipant[] = [

    {
        userKey: "mock-user-001",
        userEmail: "mock1@test.com",
        nickname: "기영",
    },

    {
        userKey: "mock-user-002",
        userEmail: "mock2@test.com",
        nickname: "히스무",
    },

    {
        userKey: "mock-user-003",
        userEmail: "mock3@test.com",
        nickname: "홍길동",
    },

];