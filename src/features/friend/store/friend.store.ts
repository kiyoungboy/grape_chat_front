import { create } from "zustand";
import type {
    Friend,
    FriendRequest,
    FriendSearchResult,
} from "@/features/friend/types/friend.type";
import type { PresenceUser } from "@/features/presence/types/presence.type";

interface FriendState {
    friends: Friend[];
    requests: FriendRequest[];
    searchResult: FriendSearchResult | null;

    setFriends: (friends: Friend[]) => void;
    setRequests: (requests: FriendRequest[]) => void;
    setSearchResult: (result: FriendSearchResult | null) => void;

    updateFriendPresence: (
        userKey: string,
        onlineYn: "Y" | "N",
        currentRoomKey?: string | null
    ) => void;

    syncFriendPresence: (users: PresenceUser[]) => void;

    clearFriendStore: () => void;
}

export const useFriendStore = create<FriendState>((set) => ({
    friends: [],
    requests: [],
    searchResult: null,

    setFriends: (friends) =>
        set({
            friends: [...friends].sort((a, b) => {
                if (a.onlineYn === b.onlineYn) {
                    return a.friendNickname.localeCompare(
                        b.friendNickname
                    );
                }

                return a.onlineYn === "Y" ? -1 : 1;
            }),
        }),

    setRequests: (requests) => set({ requests }),

    setSearchResult: (result) => set({ searchResult: result }),

    updateFriendPresence: (userKey, onlineYn, currentRoomKey) =>
        set((state) => ({
            friends: state.friends
                .map((friend) =>
                    friend.friendUserKey === userKey
                        ? {
                              ...friend,
                              onlineYn,
                              currentRoomKey:
                                  currentRoomKey ??
                                  friend.currentRoomKey ??
                                  null,
                          }
                        : friend
                )
                .sort((a, b) => {
                    if (a.onlineYn === b.onlineYn) {
                        return a.friendNickname.localeCompare(
                            b.friendNickname
                        );
                    }

                    return a.onlineYn === "Y" ? -1 : 1;
                }),
        })),

    syncFriendPresence: (users) =>
        set((state) => ({
            friends: state.friends
                .map((friend) => {
                    const presenceUser = users.find(
                        (user) =>
                            user.userKey === friend.friendUserKey
                    );

                    if (!presenceUser) {
                        return {
                            ...friend,
                            onlineYn: "N" as const,
                            currentRoomKey: friend.currentRoomKey ?? null,
                        };
                    }

                    return {
                        ...friend,
                        onlineYn: presenceUser.onlineYn as "Y" | "N",
                        currentRoomKey: friend.currentRoomKey ?? null,
                    };
                })
                .sort((a, b) => {
                    if (a.onlineYn === b.onlineYn) {
                        return a.friendNickname.localeCompare(
                            b.friendNickname
                        );
                    }

                    return a.onlineYn === "Y" ? -1 : 1;
                }),
        })),

    clearFriendStore: () =>
        set({
            friends: [],
            requests: [],
            searchResult: null,
        }),
}));