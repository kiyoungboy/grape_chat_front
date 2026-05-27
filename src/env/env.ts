export const ENV = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    AUTH_LOGIN_URL: import.meta.env.VITE_AUTH_LOGIN_URL,
    WS_URL: import.meta.env.VITE_WS_URL,
} as const;