import { create } from "zustand";

interface ChatUiState {
    newMessageCount:number;
    increaseNewMessage:(count?:number)=>void;
    clearNewMessage: ()=>void;
}

export const useChatUiStore =
    create<ChatUiState>((set) => ({
        newMessageCount:0,

        increaseNewMessage: (count=1)=>
            set(state=>({
                newMessageCount: state.newMessageCount + count
            })),

            clearNewMessage: () =>
                set({
                    newMessageCount:0
                }),
    }))