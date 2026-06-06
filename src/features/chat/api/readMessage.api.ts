import api from "@/services/api/interceptor";


export const readMessage = async (
    roomKey: string,
) => {

    await api.post(
        "/chat/read",
        { 
            roomKey,
         }
    );
};