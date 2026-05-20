import api from "@/services/api/interceptor";

export const inviteUsers =
    async (
        roomKey: string,
        userKeys: string[]
    ) => {

    await api.post(
        `/api/chat/rooms/${roomKey}/invite`,
        userKeys
    );
};