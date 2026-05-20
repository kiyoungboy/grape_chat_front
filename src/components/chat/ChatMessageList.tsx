import ChatMessage from "./ChatMessage";

import styles from "./ChatMessageList.module.css";

import { useChat } from "@/features/chat/hooks/useChat";

export default function ChatMessageList() {
  const {
    messages,

    messageEndRef,
  } = useChat();

  return (
    <div className={styles.list}>
      {messages.map((message) => (
        <ChatMessage
          key={message.messageKey}
          message={message}
        />
      ))}

      <div ref={messageEndRef} />
    </div>
  );
}