import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MessageList from "../components/MessageList/MessageList";
import MessageForm from "../components/MessageForm/MessageForm";
import toast from "react-hot-toast";

const initialAssistantMessage = {
  id: "initial-assistant-message",
  role: "assistant",
  content:
    "Hi! Tell me your mood or favorite actor, and I'll find the perfect movie for you 🍿",
};

function MovieAssistantPage() {
  const [messages, setMessages] = useState([initialAssistantMessage]);
  const [previousInteractionId, setPreviousInteractionId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      textareaRef.current?.focus();
    }
  }, [isLoading]);

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleResetConversation = () => {
    setMessages([initialAssistantMessage]);
    setPreviousInteractionId(null);
    setInputValue("");
    setError("");

    resetTextareaHeight();
    textareaRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const sendMessage = async (message) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        {
          message,
          previousInteractionId,
        },
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.message,
        },
      ]);

      setPreviousInteractionId(data.interactionId);
    } catch {
      setError("Unable to get a recommendation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (formData) => {
    const message = formData.get("message")?.trim();

    if (!message || isLoading) {
      return;
    }

    setError("");

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
      },
    ]);

    setInputValue("");
    resetTextareaHeight();
    setIsLoading(true);

    sendMessage(message);
  };

  return (
    <main
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "32px auto",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
      }}
    >
      <MessageList
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      <MessageForm
        action={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onResetConversation={handleResetConversation}
        isLoading={isLoading}
        textareaRef={textareaRef}
        onKeyDown={handleKeyDown}
      />

      {error &&
        toast.error(error, {
          icon: "❌",
        })}
    </main>
  );
}

export default MovieAssistantPage;
