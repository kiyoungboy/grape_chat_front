export interface Friend {
    friendUserKey: string;
    friendNickname: string;
    friendEmail: string;
    onlineYn: "Y" | "N";
    currentRoomKey?: string | null;
}

export interface FriendRequest {
    friendKey: string;
    requestUserKey: string;
    requestUserNickname: string;
    requestUserEmail: string;
    createdAt: string;
}

export interface FriendSearchResult {
    userKey: string;
    userNickname: string;
    userEmail: string;
    friendStatus: "NONE" | "REQUESTED" | "RECEIVED" | "ACCEPTED" | "BLOCKED";
}

export interface FriendRequestCommand {
    targetUserKey: string;
}