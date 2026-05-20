export type SocketEventType =
    | "MESSAGE"
    | "TYPING_START"
    | "TYPING_STOP"
    | "READ"
    | "PRESENCE"
    | "ROOM_INVITE";

export interface SocketEvent<T = unknown> {
    eventType: SocketEventType;
    payload: T;
}