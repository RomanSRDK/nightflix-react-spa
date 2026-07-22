import MessageItem from "../MessageItem/MessageItem";
import styles from "./MessageList.module.css";

function MessageList({ messages, isLoading, messagesEndRef }) {
  return (
    <div className={styles.messages}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className={`${styles.message} ${styles.assistantMessage}`}>
          <strong className={styles.messageAuthor}>Nightflix AI</strong>

          <p className={styles.loadingText}>Thinking...</p>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
