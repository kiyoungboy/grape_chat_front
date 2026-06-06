import styles from "./ChatPage.module.css";
import { useState } from "react";
import ChatRoomList from "@/components/chat/ChatRoomList";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInviteModal from "@/components/chat/ChatInviteModal";
import PresencePanel from "@/components/presence/PresencePanel";
import { useWebSocket } from "@/features/websocket/hooks/useWebSocket";
import { useTypingStore } from "@/features/typing/store/typing.store";
import { useRoomStore } from "@/features/chat/store/room.store";

export default function ChatPage() {

    useWebSocket();

    const typingUsers =
        useTypingStore(
            (state) => state.typingUsers
        );

    const [
        isInviteModalOpen,
        setIsInviteModalOpen
    ] = useState(false);

    const currentRoom = useRoomStore((state) => state.currentRoom);

    return (

        <div className={styles.page}>
            <aside className={styles.roomPanel}>
                <div className={styles.panelHeader}>
                    <h2>채팅</h2>
                    <button
                        className={
                            styles.inviteButton
                        }
                        onClick={() =>
                            setIsInviteModalOpen(true)
                        }
                    >
                        유저 초대
                    </button>

                </div>
                <ChatRoomList />
            </aside>
            <main className={styles.chatPanel}>
                {currentRoom ? (
                    <>
                        <ChatHeader />
                        <div className={styles.messageArea}>
                            <ChatMessageList />
                        </div>

                        {typingUsers.length > 0 && (
                            <div className={styles.typing}>
                                {typingUsers.join(", ")}
                                입력 중...
                            </div>
                        )}

                        <footer className={styles.inputArea}>
                            <ChatInput />
                        </footer>
                    </>
                ) : (
                    <div className={styles.emptyRoom}>
                        <div className={styles.emptyTitle}>
                            채팅방을 선택해주세요
                        </div>

                        <div className={styles.emptyDescription}>
                            왼쪽 목록에서 채팅방을 선택하면
                            대화가 표시됩니다.
                        </div>
                    </div>
                )}
            </main>
            <PresencePanel />
            <ChatInviteModal
                open={isInviteModalOpen}
                onClose={() =>
                    setIsInviteModalOpen(false)
                }
            />
        </div>
    );
}