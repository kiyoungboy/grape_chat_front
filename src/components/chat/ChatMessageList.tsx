import { useChatUiStore } from "@/features/chat/store/chatUi.store";
import ChatMessage from "./ChatMessage";

import styles from "./ChatMessageList.module.css";

import { useChat } from "@/features/chat/hooks/useChat";

export default function ChatMessageList() {
  const {
    messages,
    messageEndRef,
    messageContainerRef,
    handleScroll,
    scrollBottom
  } = useChat();

  const newMessageCount = useChatUiStore((state) => state.newMessageCount);

  return (
    <div className={styles.list} ref={messageContainerRef} onScroll={handleScroll} data-chat-container="true">
      {messages.map((message) => (
        <ChatMessage
          key={message.messageKey}
          message={message}
        />
      ))}

      {
        newMessageCount > 0 && (
          <button className={styles.newMessageButton} onClick={scrollBottom}>
            새 메시지 {newMessageCount}개
          </button>
        )
      }
      <div id="chat-end" ref={messageEndRef} />
    </div>
  );
}