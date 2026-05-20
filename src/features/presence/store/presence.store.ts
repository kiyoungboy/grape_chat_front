import { create } from "zustand";
import type { PresenceUser } from "../types/presence.type";

interface PresenceState {
    users: PresenceUser[];

    setUsers: (
        users: PresenceUser[]
    ) => void;

    updateUserStatus: (
        userKey: string,
        online: boolean
    ) => void;
}

export const usePresenceStore =
    create<PresenceState>((set) => ({
        users: [],
        setUsers: (users) =>
            set({
                users,
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
                    online,
                    lastActiveAt: new Date().toISOString(),
                };
            }),
        })),
    }));