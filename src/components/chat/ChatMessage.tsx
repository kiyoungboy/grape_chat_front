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
  
  if(message.messageType === "SYSTEM"){
    return (
      <div className={styles.systmeMessage}>
        {message.messageContent}
      </div>
    );
  }


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
          {message.senderNickname}
        </span>
      )}

      <div className={styles.bubble}>
        {message.messageContent}
      </div>

      {
        message.readCount !== undefined && (
          <span className={styles.readCount}>
            {
              message.readCount === undefined ? "" : message.readCount > 0 ? message.readCount : "읽음"
            }
          </span>
        )
      }

      <span className={styles.time}>
        {message.createdAt?.replace("T","")?.substring(11,16)}
      </span>
    </div>
  );
}