import styles from "./MessageItem.module.css";

function MessageItem({ message }) {
  const isUserMessage = message.role === "user";

  return (
    <div
      className={`${styles.message} ${
        isUserMessage ? styles.userMessage : styles.assistantMessage
      }`}
    >
      <strong className={styles.messageAuthor}>
        {isUserMessage ? "You" : "Nightflix AI"}
      </strong>

      <p className={styles.messageText}>{message.content}</p>
    </div>
  );
}

export default MessageItem;

// message = {
//   id: "some-id",
//   role: "user",
//   content: "Wanna see movie",
// };
