import { useState } from "react";

import styles from "./ChatRoomModal.module.css";

import { usePresenceStore }
from "@/features/presence/store/presence.store";

import { createRoom } from "@/features/chat/api/createRoom.api";
import { useRoomStore } from "@/features/chat/store/room.store";

export default function ChatRoomModal({
    open,
    onClose,
}: Props){

    const users = usePresenceStore(
        (state) => state.users
    );

    const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);

    const [roomName, setRoomName] =
        useState("");

    const [
        selectedUsers,
        setSelectedUsers
    ] = useState<string[]>([]);

    const handleCreateRoom =
        async () => {

        try{

            if(!roomName.trim()){
                return;
            }

            const response =
                await createRoom({

                    roomName,

                    roomType: "GROUP",

                    userKeys: selectedUsers,
                });
            setCurrentRoom(response);
            
            setRoomName("");

            setSelectedUsers([]);

            onClose();

        } catch(error){

            console.error(error);
        }
    };

    if(!open){
        return null;
    }

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>

                    <h2>
                        채팅방 생성
                    </h2>

                </div>

                <div className={styles.body}>

                    <input
                        className={styles.input}

                        value={roomName}

                        onChange={(event) =>
                            setRoomName(
                                event.target.value
                            )
                        }

                        placeholder="채팅방 이름"
                    />

                    <div className={styles.userList}>

                        {users.map((user) => (

                            <label
                                key={user.userKey}
                                className={styles.userItem}
                            >

                                <input
                                    type="checkbox"

                                    checked={
                                        selectedUsers.includes(
                                            user.userKey
                                        )
                                    }

                                    onChange={(event) => {

                                        if(event.target.checked){

                                            setSelectedUsers([
                                                ...selectedUsers,
                                                user.userKey,
                                            ]);

                                            return;
                                        }

                                        setSelectedUsers(
                                            selectedUsers.filter(
                                                (userKey) =>
                                                    userKey !== user.userKey
                                            )
                                        );
                                    }}
                                />

                                <span>
                                    {user.userEmail}
                                </span>

                            </label>
                        ))}

                    </div>

                </div>

                <div className={styles.footer}>

                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        취소
                    </button>

                    <button
                        className={styles.submitButton}
                        onClick={handleCreateRoom}
                    >
                        생성
                    </button>

                </div>

            </div>

        </div>
    );
}

interface Props {
    open: boolean;

    onClose: () => void;
}