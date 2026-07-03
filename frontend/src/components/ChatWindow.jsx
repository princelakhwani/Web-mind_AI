import "../styles/chatwindow.css";

import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Send,
  Trash2,
} from "lucide-react";

import api from "../services/api";

import Loader from "./Loader";
import Message from "./Message";
import SuggestedQuestions from "./SuggestedQuestions";

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

  async function sendQuestion(text) {

    if (!indexed) {
      alert("Please index a website first.");
      return;
    }

    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setQuestion("");

    try {

      setLoading(true);

      const response = await api.post("/ask", {
        question: text,
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
          content: "❌ Failed to generate answer.",
          sources: [],
        },
      ]);

    } finally {

      setLoading(false);

    }
  }

  function askAI(e) {

    e.preventDefault();

    sendQuestion(question);

  }

  function clearChat() {

    setMessages([]);

  }

  return (

    <div className="chat-window">

      <div className="chat-header">

        <div className="chat-title">

          <div className="chat-icon">

            <MessageSquare size={28} />

          </div>

          <div>

            <h2>AI Assistant</h2>

            <p>
              Ask questions about your indexed website
            </p>

          </div>

        </div>

        <button
          onClick={clearChat}
          className="clear-btn"
        >

          <Trash2 size={18} />

          Clear Chat

        </button>

      </div>

      <div className="chat-body">

        {messages.length === 0 && (

          <div className="chat-empty">

            <div className="robot">

              🤖

            </div>

            <h2>

              Ask me anything

            </h2>

            <p>

              Once your website is indexed,
              I can answer questions using
              the indexed content.

            </p>

            {indexed && (

              <SuggestedQuestions
                onAsk={sendQuestion}
              />

            )}

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
        onSubmit={askAI}
        className="chat-input"
      >

        <input
          type="text"
          value={question}
          disabled={!indexed || loading}
          placeholder={
            indexed
              ? "Ask anything about this website..."
              : "Index a website first..."
          }
          onChange={(e) =>
            setQuestion(e.target.value)
          }
        />

        <button
          disabled={!indexed || loading}
        >

          <Send size={20} />

          {loading
            ? "Thinking..."
            : "Send"}

        </button>

      </form>

    </div>

  );

}