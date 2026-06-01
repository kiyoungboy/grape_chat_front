import { useRoomStore } from "@/features/chat/store/room.store";
import ChatRoomItem from "./ChatRoomItem";
import styles from "./ChatRoomList.module.css";
import { useChatRoom } from "@/features/chat/hooks/useChatRoom";
import ChatRoomModal from "./ChatRoomModal";
import { useState } from "react";
import { readMessage } from "@/features/chat/api/readMessage.api";

export default function ChatRoomList() {
  const {
    loading,

    rooms,

    currentRoom,

    setCurrentRoom,
  } = useChatRoom();

  const [isChatRoomModalOpen, setIsChatRoomModalOpen] = useState(false);

  const clearUnreadCount = useRoomStore((state) => state.clearUnreadCount);

  if (loading) {
    return <div>채팅방 불러오는 중...</div>;
  }

  return (

    <div className={styles.container}>
      <button onClick={() => setIsChatRoomModalOpen(true)}>
      채팅방 생성
      </button>
      <div className={styles.list}>
        {rooms.map((room) => (
          <ChatRoomItem
            key={room.roomKey}
            room={room}
            selected={
              currentRoom?.roomKey === room.roomKey
            }
            onClick={async() => {
              try{
                await readMessage(room.roomKey);
              } catch(error){
                console.error(error);
              }

              clearUnreadCount(room.roomKey);
              setCurrentRoom(room);
            }}
          />
        ))}
      </div>
      <ChatRoomModal open={isChatRoomModalOpen} onClose={() => setIsChatRoomModalOpen(false)} />
    </div>
  );
}