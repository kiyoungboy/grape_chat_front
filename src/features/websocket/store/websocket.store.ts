import { create } from "zustand";

import { Client } from "@stomp/stompjs";

interface WebSocketState {
    client?: Client;
    connected: boolean;
    connecting: boolean;
    setClient: ( client?: Client ) => void;
    setConnected: ( connected: boolean ) => void;
    setConnecting: ( connecting: boolean ) => void;
}

export const useWebSocketStore =
    create<WebSocketState>((set) => ({
        client: undefined,
        connected: false,
        connecting:false,

        setClient: (client) =>
            set({
                client,
            }),

        setConnected: (connected) =>
            set({
                connected,
            }),

        setConnecting: (connecting) =>
            set({
                connecting,
            }),
    }));