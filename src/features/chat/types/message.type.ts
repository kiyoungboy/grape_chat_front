export type messageType =
    | "TEXT"
    | "SYSTEM"
    | "FILE"
    | "IMAGE"

export interface MessageEventPayload {
    messageKey: string;
    roomKey: string;
    senderUserKey: string;
    senderNickname: string;
    messageType: messageType;
    messageContent: string;
    fileKey?: string;
    createdAt: string;
    readCount?: number;
}