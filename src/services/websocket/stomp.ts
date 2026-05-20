import { Client } from "@stomp/stompjs"
import SockJs from "sockjs-client";
import { ENV } from "@/env/env";

export const createStompClient = () => {
    return new Client({
        webSocketFactory: () =>
            new SockJs(ENV.WS_URL),

        reconnectDelay: 3000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,

        debug: () => {},
    });
};