import { GrSend } from "react-icons/gr";
import { VscChatSparkle } from "react-icons/vsc";
import styles from "./MessageForm.module.css";

function MessageForm({
  action,
  inputValue,
  setInputValue,
  onResetConversation,
  isLoading,
  textareaRef,
  onKeyDown,
}) {
  const handleChange = (event) => {
    setInputValue(event.target.value);

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div className={styles.controls}>
      <form action={action} className={styles.form}>
        <textarea
          disabled={isLoading}
          ref={textareaRef}
          name="message"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className={styles.input}
          rows={1}
        />

        <button
          type="submit"
          disabled={isLoading || inputValue.trim() === ""}
          className={styles.sendButton}
          aria-label="Send message"
        >
          <GrSend size={24} />
        </button>
      </form>

      <button
        type="button"
        onClick={onResetConversation}
        disabled={isLoading}
        className={styles.resetButton}
        aria-label="New chat"
      >
        <VscChatSparkle size={24} />
      </button>
    </div>
  );
}

export default MessageForm;
