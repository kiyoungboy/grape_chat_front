export interface MessageEventPayload {
    messageKey: string;
    roomKey: string;
    senderUserKey: string;
    senderNickname: string;
    messageContent: string;
    createdAt: string;
    readCount?: number;
}