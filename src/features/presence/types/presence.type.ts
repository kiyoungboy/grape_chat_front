export interface PresenceUser {

    userKey: string;

    userEmail: string;

    onlineYn: string;

    socketSessionId: string;

    lastActiveAt: string;

    updatedAt: string;

    nickname: string;
}

export interface ChatRoomParticipant {
    userKey: string;
    userEmail: string;
    nickname: string;
}