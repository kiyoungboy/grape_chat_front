import ChatMessage from "./ChatMessage";

import styles from "./ChatMessageList.module.css";

import { useChat } from "@/features/chat/hooks/useChat";

export default function ChatMessageList() {
  const {
    messages,
    messageEndRef,
    messageContainerRef,
    handleScroll,
  } = useChat();

  return (
    <div className={styles.list} ref={messageContainerRef} onScroll={handleScroll}>
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