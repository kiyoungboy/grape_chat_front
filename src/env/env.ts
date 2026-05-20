const HOST = window.location.hostname;

export const ENV = {
    API_BASE_URL: `http://${HOST}:8181`,
    AUTH_LOGIN_URL: `http://${HOST}:5173/signin`,
    WS_URL: `http://${HOST}:8181/ws/chat`,
} as const;