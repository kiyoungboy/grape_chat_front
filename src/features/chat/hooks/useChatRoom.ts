import { useEffect, useState } from "react";
import { useRoomStore } from "../store/room.store";
import { getChatRooms } from "../api/room.api";

export const useChatRoom = () => {
    const [loading, setLoading] = useState(true);
    const rooms = useRoomStore((state) => state.rooms);

    const currentRoom = useRoomStore(
        (state) => state.currentRoom
    );

    const setRooms = useRoomStore((state) => state.setRooms);

    const setCurrentRoom = useRoomStore(
        (state) => state.setCurrentRoom
    );

    useEffect(() => {
        const initialize = async () => {
            try{
                const response = await getChatRooms();
                setRooms(response);

                if(response.length > 0){
                    setCurrentRoom(response[0]);
                }
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    },[setRooms, setCurrentRoom]);

    return{
        loading,
        rooms,
        currentRoom,
        setCurrentRoom
    }
}