import api
from "@/services/api/interceptor";

export const exitRoom =
    async (
        roomKey: string
    ) => {

    await api.delete(
        `/chat/rooms/${roomKey}`
    );
};