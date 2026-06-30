import axiosInstance from "@/services/api/axios";
import type {
    Friend,
    FriendRequest,
    FriendSearchResult,
    FriendRequestCommand,
} from "@/features/friend/types/friend.type";

export const searchFriend = async (
    type: "nickname" | "email",
    keyword: string
): Promise<FriendSearchResult | null> => {
    const response = await axiosInstance.get("/friends/search", {
        params: {
            type,
            keyword,
        },
    });

    return response.data;
};

export const requestFriend = async (
    command: FriendRequestCommand
): Promise<void> => {
    await axiosInstance.post("/friends/request", command);
};

export const getFriendRequests = async (): Promise<FriendRequest[]> => {
    const response = await axiosInstance.get("/friends/requests");
    return response.data;
};

export const acceptFriendRequest = async (
    friendKey: string
): Promise<void> => {
    await axiosInstance.post(`/friends/${friendKey}/accept`);
};

export const rejectFriendRequest = async (
    friendKey: string
): Promise<void> => {
    await axiosInstance.post(`/friends/${friendKey}/reject`);
};

export const getFriends = async (): Promise<Friend[]> => {
    const response = await axiosInstance.get("/friends");
    return response.data;
};