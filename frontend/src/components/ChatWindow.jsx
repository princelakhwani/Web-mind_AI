import "../styles/chatwindow.css";

import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot } from "lucide-react";

import api from "../services/api";
import Message from "./Message";
import Loader from "./Loader";

export default function ChatWindow({ indexed }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function askAI(e) {
    e.preventDefault();

    if (!indexed) {
      alert("Please index a website first.");
      return;
    }

    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const response = await api.post("/ask", {
        question: currentQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          sources: response.data.sources || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to generate answer.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
  }

  return (
    <div className="chat-card">

      <div className="chat-header">

        <div className="chat-title">

          <div className="chat-icon">

            <Bot size={28} />

          </div>

          <div>

            <h2>AI Assistant</h2>

            <p>
              Ask anything from your indexed website
            </p>

          </div>

        </div>

        <button
          className="clear-btn"
          onClick={clearChat}
        >
          <Trash2 size={18} />

          Clear Chat

        </button>

      </div>

      <div className="chat-body">

        {messages.length === 0 && (

          <div className="empty-chat">

            <div className="empty-icon">
              🤖
            </div>

            <h2>
              Ask me anything
            </h2>

            <p>
              Once your website is indexed,
              I can answer questions using
              only that website's content.
            </p>

          </div>

        )}

        {messages.map((msg, index) => (

          <Message
            key={index}
            role={msg.role}
            content={msg.content}
            sources={msg.sources}
          />

        ))}

        {loading && <Loader />}

        <div ref={bottomRef} />

      </div>

      <form
        className="chat-input"
        onSubmit={askAI}
      >

        <input
          type="text"
          value={question}
          disabled={!indexed || loading}
          placeholder={
            indexed
              ? "Ask your question..."
              : "Index a website first..."
          }
          onChange={(e) =>
            setQuestion(e.target.value)
          }
        />

        <button
          disabled={!indexed || loading}
        >

          <Send size={18} />

          {loading
            ? "Thinking..."
            : "Send"}

        </button>

      </form>

    </div>
  );
}