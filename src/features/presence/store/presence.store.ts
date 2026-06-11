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
                users: [...users].sort((a, b) => {
                    if (a.onlineYn === b.onlineYn) {
                        return a.nickname.localeCompare(b.nickname);
                    }

                    return a.onlineYn === "Y" ? -1 : 1;
                }),
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
        ) =>
            set((state) => {

                const users = state.users
                    .map((user) => {

                        if (user.userKey !== userKey) {
                            return user;
                        }
                        return {
                            ...user,
                            onlineYn: online ? "Y" : "N",
                            lastActiveAt: new Date().toISOString(),
                        };
                    })
                    .sort((a, b) => {

                        if (a.onlineYn === b.onlineYn) {
                            return a.nickname.localeCompare(
                                b.nickname
                            );
                        }
                        return a.onlineYn === "Y"
                            ? -1
                            : 1;
                    });
                return {
                    users,
                };
            }),
    }));