import styles from "./PresencePanel.module.css";

import { usePresenceStore } from "@/features/presence/store/presence.store";

import PresenceUserItem from "./PresenceUserItem";
import { useRoomStore } from "@/features/chat/store/room.store";
import { useEffect } from "react";
import { getRoomParticipants } from "@/features/chat/api/room.api";

export default function PresencePanel() {

    const currentRoom = useRoomStore((state) => state.currentRoom);

    const users = usePresenceStore(
        (state) => state.users
    );

    const roomParticipants = usePresenceStore((state) => state.roomParticipants);
    
    const setRoomParticipants = usePresenceStore((state) => state.setRoomParticipants);

    const clearRoomParicipants = usePresenceStore((state) => state.clearRoomParticipants);

    const isRoomMode = !!currentRoom?.roomKey;

    useEffect(() => {
        const loadRoomParticipants = async () => {
            if(!currentRoom?.roomKey){
                clearRoomParicipants();
                return;
            }

            const participants = await getRoomParticipants(currentRoom.roomKey);

            setRoomParticipants(participants);
        };

        loadRoomParticipants();
    }, [currentRoom?.roomKey, setRoomParticipants, clearRoomParicipants,]);

    return (
        <aside className={styles.panel}>

            <div className={styles.header}>
                <h3>{isRoomMode ? "참여자" : "접속 상태"}</h3>
            </div>

            <div className={styles.userList}>
                {isRoomMode 
                    ? roomParticipants.map((user) => (
                        <PresenceUserItem 
                            key={user.userKey}
                            user={user}
                            roomMode={true}
                        />
                    ))
                    : users.map((user) => (
                    <PresenceUserItem
                        key={user.userKey}
                        user={user}
                        roomMode={false}
                    />
                    ))
                }

            </div>

        </aside>
    );
}