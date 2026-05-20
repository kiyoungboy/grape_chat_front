import { useState } from "react";

import styles from "./ChatInviteModal.module.css";

import { usePresenceStore }
from "@/features/presence/store/presence.store";

import { useRoomStore }
from "@/features/chat/store/room.store";

import { inviteUsers }
from "@/features/chat/api/invite.api";

interface Props {

    open: boolean;

    onClose: () => void;
}

export default function ChatInviteModal({
    open,
    onClose,
}: Props){

    const users = usePresenceStore(
        (state) => state.users
    );

    const currentRoom =
        useRoomStore(
            (state) => state.currentRoom
        );

    const [
        selectedUsers,
        setSelectedUsers
    ] = useState<string[]>([]);

    if(!open || !currentRoom){
        return null;
    }

    const handleInvite =
        async () => {

        try{

            await inviteUsers(
                currentRoom.roomKey,
                selectedUsers
            );

            setSelectedUsers([]);

            onClose();

        } catch(error){

            console.error(error);
        }
    };

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>

                    <h2>
                        유저 초대
                    </h2>

                </div>

                <div className={styles.body}>

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

                                <div
                                    className={styles.userInfo}
                                >

                                    <span
                                        className={
                                            styles.userEmail
                                        }
                                    >
                                        {user.userEmail}
                                    </span>

                                    <span
                                        className={
                                            styles.userStatus
                                        }
                                    >
                                        온라인
                                    </span>

                                </div>

                            </label>
                        ))}

                    </div>

                </div>

                <div className={styles.footer}>

                    <button
                        className={
                            styles.cancelButton
                        }

                        onClick={onClose}
                    >
                        취소
                    </button>

                    <button
                        className={
                            styles.submitButton
                        }

                        onClick={handleInvite}
                    >
                        초대
                    </button>

                </div>

            </div>

        </div>
    );
}