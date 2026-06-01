export interface ChatRoom {
    roomKey: string;
    roomName: string;
    lastMessageContent: string;
    lastMessageAt: string;
    unreadCount: number;
}