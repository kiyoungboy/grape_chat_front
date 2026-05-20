
import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;

    userKey?: string;
    userEmail?: string;
    loginAuth?: string;

    setAuth: (data: {
        userKey: string;
        userEmail: string;
        loginAuth: string;
    }) => void;

    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,

    userKey: undefined,
    userEmail: undefined,
    loginAuth: undefined,

    setAuth: (data) => 
        set({
            isAuthenticated: true,

            userKey: data.userKey,
            userEmail: data.userEmail,
            loginAuth: data.loginAuth,
        }),

        clearAuth: () =>
            set({
                isAuthenticated: false,

                userKey: undefined,
                userEmail: undefined,
                loginAuth: undefined,
            }),
}));