import styles from "./ChatMessage.module.css";

import type { MessageEventPayload as ChatMessageType } from "@/features/chat/types/message.type";

import { useAuthStore } from "@/store/auth.store";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({
  message,
}: Props) {
  const userKey = useAuthStore(
    (state) => state.userKey
  );

  const isMine =
    userKey === message.senderUserKey;

  return (
    <div
      className={`${styles.wrapper} ${
        isMine ? styles.mine : styles.other
      }`}
    >
      {!isMine && (
        <span className={styles.sender}>
          {message.senderEmail}
        </span>
      )}

      <div className={styles.bubble}>
        {message.messageContent}
      </div>

      {
        message.readCount !== undefined && (
          <span className="styles.readCount">
            {
              message.readCount > 0 ? message.readCount : "읽음"
            }
          </span>
        )
      }

      <span className={styles.time}>
        {new Date(
          message.createdAt
        ).toLocaleTimeString()}
      </span>
    </div>
  );
}