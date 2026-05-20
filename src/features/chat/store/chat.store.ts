import { create } from "zustand";

import type { MessageEventPayload } from "../types/message.type";

interface ChatState {
    messages: MessageEventPayload[];

    setMessages: (
        messages: MessageEventPayload[]
    ) => void;

    addMessage: (
        messages: MessageEventPayload
    ) => void;

    clearMessages: () => void;
    markMessageAsRead: (messageKey: string) => void;
}

export const useChatStore = 
    create<ChatState>((set) => ({
        messages: [],

        setMessages: (messages) =>
            set({
                messages,
            }),

        addMessage: (message) =>
            set((state) => {
                const exists = state.messages.some((item) => item.messageKey === message.messageKey);

                if(exists){
                    return state;
                }

                return {
                    messages: [
                        ...state.messages,
                        message,
                    ],
                };
            }),

        clearMessages: () =>
            set({
                messages: [],
            }),

        markMessageAsRead: (messageKey) =>
            set((state) => ({
                messages: state.messages.map((message) => {
                    if(message.messageKey !== messageKey){
                        return message;
                    }

                    return {
                        ...message,
                        readCount: Math.max(0, (message.readCount || 1) - 1),
                    };
                })
            })),
    }));