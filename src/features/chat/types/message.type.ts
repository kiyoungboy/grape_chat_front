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
    messageType: string;
    messageContent: string;
    fileKey?: string;
    createdAt: string;
    readCount?: number;
}