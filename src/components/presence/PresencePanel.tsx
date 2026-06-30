import styles from "./PresencePanel.module.css";

import { useEffect, useState } from "react";

import PresenceUserItem from "./PresenceUserItem";

import { usePresenceStore } from "@/features/presence/store/presence.store";
import { useRoomStore } from "@/features/chat/store/room.store";

import { getRoomParticipants } from "@/features/chat/api/room.api";

import FriendList from "@/components/friend/FriendList";
import FriendRequestList from "@/components/friend/FriendRequestList";
import AddFriendModal from "@/components/friend/AddFriendModal";

import {
    getFriends,
    getFriendRequests,
} from "@/features/friend/services/friend.service";

import { useFriendStore } from "@/features/friend/store/friend.store";

import type { Friend } from "@/features/friend/types/friend.type";

export default function PresencePanel() {
    const [activeTab, setActiveTab] = useState<"friend" | "group">("friend");
    const [showRequests, setShowRequests] = useState(false);
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

    const currentRoom = useRoomStore((state) => state.currentRoom);

    const roomParticipants = usePresenceStore(
        (state) => state.roomParticipants
    );

    const setRoomParticipants = usePresenceStore(
        (state) => state.setRoomParticipants
    );

    const clearRoomParticipants = usePresenceStore(
        (state) => state.clearRoomParticipants
    );

    const friends = useFriendStore((state) => state.friends);
    const requests = useFriendStore((state) => state.requests);

    const setFriends = useFriendStore((state) => state.setFriends);
    const setRequests = useFriendStore((state) => state.setRequests);
    const setSearchResult = useFriendStore((state) => state.setSearchResult);

    const isRoomMode = !!currentRoom?.roomKey;

    const loadFriends = async () => {
        const data = await getFriends();
        setFriends(data);
    };

    const loadFriendRequests = async () => {
        const data = await getFriendRequests();
        setRequests(data);
    };

    const refreshFriendData = async () => {
        await Promise.all([
            loadFriends(),
            loadFriendRequests(),
        ]);
    };

    useEffect(() => {
        const loadRoomParticipants = async () => {
            if (!currentRoom?.roomKey) {
                clearRoomParticipants();
                return;
            }

            const participants = await getRoomParticipants(currentRoom.roomKey);

            setRoomParticipants(participants);
        };

        loadRoomParticipants();
    }, [
        currentRoom?.roomKey,
        setRoomParticipants,
        clearRoomParticipants,
    ]);

    useEffect(() => {
        if (isRoomMode) return;

        refreshFriendData();
    }, [isRoomMode]);

    const handleOpenAddFriendModal = () => {
        setSearchResult(null);
        setIsAddFriendModalOpen(true);
    };

    const handleDoubleClickFriend = async (friend: Friend) => {
        console.log("친구 더블클릭:", friend);

        /*
         * 다음 단계에서 연결
         *
         * 1. POST /api/chat/rooms/direct
         * 2. 기존 방 있으면 반환
         * 3. 없으면 생성
         * 4. currentRoom 세팅
         * 5. 메시지 목록 로드
         */
    };

    return (
        <aside className={styles.panel}>
            {isRoomMode ? (
                <>
                    <div className={styles.header}>
                        <h3>참여자</h3>
                    </div>

                    <div className={styles.userList}>
                        {roomParticipants.map((user) => (
                            <PresenceUserItem
                                key={user.userKey}
                                user={user}
                                roomMode={true}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.header}>
                        <h3>Presence</h3>
                    </div>

                    <div className={styles.tabs}>
                        <button
                            type="button"
                            className={
                                activeTab === "friend" ? styles.activeTab : ""
                            }
                            onClick={() => setActiveTab("friend")}
                        >
                            친구
                        </button>

                        <button
                            type="button"
                            className={
                                activeTab === "group" ? styles.activeTab : ""
                            }
                            onClick={() => setActiveTab("group")}
                        >
                            그룹
                        </button>
                    </div>

                    {activeTab === "friend" && (
                        <>
                            <div className={styles.actionBar}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowRequests((prev) => !prev)
                                    }
                                >
                                    요청
                                    {requests.length > 0 &&
                                        ` (${requests.length})`}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleOpenAddFriendModal}
                                >
                                    친구 추가
                                </button>
                            </div>

                            {showRequests && (
                                <div className={styles.requestBox}>
                                    <FriendRequestList
                                        requests={requests}
                                        onChanged={refreshFriendData}
                                    />
                                </div>
                            )}

                            <div className={styles.userList}>
                                <FriendList
                                    friends={friends}
                                    onDoubleClickFriend={
                                        handleDoubleClickFriend
                                    }
                                />
                            </div>
                        </>
                    )}

                    {activeTab === "group" && (
                        <div className={styles.emptyBox}>
                            그룹 기능은 다음 단계에서 구현합니다.
                        </div>
                    )}

                    <AddFriendModal
                        open={isAddFriendModalOpen}
                        onClose={() => setIsAddFriendModalOpen(false)}
                        onRequested={refreshFriendData}
                    />
                </>
            )}
        </aside>
    );
}