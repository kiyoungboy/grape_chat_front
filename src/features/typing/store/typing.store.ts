import { create } from "zustand";

interface TypingState {
    typingUsers: string[];
    setTyping: (email: string) => void;
    removeTyping: (email: string) => void;
}

export const useTypingStore =
    create<TypingState>((set) => ({
        typingUsers: [],
        setTyping: (email) =>
            set((state) => ({
                typingUsers:[
                    ...new Set([
                        ...state.typingUsers,
                        email,
                    ]),
                ],
            })),

        removeTyping: (email) =>
            set((state) => ({
                typingUsers:
                    state.typingUsers.filter((item) => item !== email),
            })),
    }));