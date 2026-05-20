export interface MessageEventPayload {
    messageKey: string;
    roomKey: string;
    senderUserKey: string;
    senderEmail: string;
    messageContent: string;
    createdAt: string;
    readCount?: number;
}