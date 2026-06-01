import styles from "./ChatRoomItem.module.css";

import type { ChatRoom } from "@/features/chat/types/room.type";

interface Props {
  room: ChatRoom;

  selected: boolean;

  onClick: () => void;
}

export default function ChatRoomItem({
  room,
  selected,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={`${styles.item} ${
        selected ? styles.active : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.top}>
        <strong>{room.roomName}</strong>

        {room.unreadCount > 0 && (
          <span className={styles.badge}>
            {room.unreadCount}
          </span>
        )}
      </div>

      <p>{room.lastMessageContent || "메시지가 없습니다."}</p>
    </button>
  );
}