import type { PresenceUser }
from "@/features/presence/types/presence.type";

export const mockPresenceUsers: PresenceUser[] = [

    {
        userKey: "mock-user-001",
        userEmail: "mock1@test.com",
        onlineYn: "Y",
        socketSessionId: "session-001",
        lastActiveAt: "2026-06-11T15:00:00",
        updatedAt: "2026-06-11T15:00:00",
        nickname: "기영",
    },

    {
        userKey: "mock-user-002",
        userEmail: "mock2@test.com",
        onlineYn: "Y",
        socketSessionId: "session-002",
        lastActiveAt: "2026-06-11T15:01:00",
        updatedAt: "2026-06-11T15:01:00",
        nickname: "히스무",
    },

    {
        userKey: "mock-user-003",
        userEmail: "mock3@test.com",
        onlineYn: "N",
        socketSessionId: "",
        lastActiveAt: "2026-06-11T14:30:00",
        updatedAt: "2026-06-11T14:30:00",
        nickname: "홍길동",
    },

];