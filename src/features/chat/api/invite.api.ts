import api from "@/services/api/interceptor";

export const inviteUsers =
    async (
        roomKey: string,
        userKeys: string[]
    ) => {

    await api.post(
        `/chat/rooms/${roomKey}/invite`,
        userKeys
    );
};