import { create } from "zustand";
import type { ChatRoomParticipant, PresenceUser } from "../types/presence.type";

interface PresenceState {
    users: PresenceUser[];

    roomParticipants: ChatRoomParticipant[];

    setUsers: (
        users: PresenceUser[]
    ) => void;

    setRoomParticipants: (roomParticipants :ChatRoomParticipant[]) => void;

    updateUserStatus: (
        userKey: string,
        online: boolean
    ) => void;

    clearRoomParticipants: () => void;
}

export const usePresenceStore =
    create<PresenceState>((set) => ({
        users: [],

        roomParticipants: [],

        setUsers: (users) =>
            set({
                users,
            }),

        setRoomParticipants: (roomParticipants) =>
            set({
                roomParticipants,
            }),

        clearRoomParticipants: () =>
            set({
                roomParticipants: [],
            }),

        updateUserStatus: (
            userKey,
            online
        ) => set((state) => ({
            users: state.users.map((user) => {
                if(user.userKey !== userKey){
                    return user;
                }

                return {
                    ...user,
                    onlineYn: online ? "Y" : "N",
                    lastActiveAt: new Date().toISOString(),
                };
            }),
        })),
    }));