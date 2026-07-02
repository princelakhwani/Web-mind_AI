import { useState } from "react";

import api from "../services/api";
import Message from "./Message";

export default function ChatWindow({ indexed }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

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
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to get response.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 w-full">

      <h2 className="mb-6 text-2xl font-bold">
        💬 AI Chat
      </h2>

      <div className="mb-8 h-[550px] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

        {messages.length === 0 ? (
          <div className="mt-40 text-center text-slate-500">
            Ask your first question...
          </div>
        ) : (
          messages.map((msg, index) => (
            <Message
              key={index}
              role={msg.role}
              content={msg.content}
              sources={msg.sources}
            />
          ))
        )}

        {loading && (
          <div className="flex items-center gap-3 animate-pulse text-cyan-400">
            🤖
            <span>Thinking...</span>
          </div>
        )}

      </div>

      <form
        onSubmit={askAI}
        className="flex gap-4"
      >

        <input
          type="text"
          value={question}
          disabled={!indexed || loading}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            indexed
              ? "Ask anything about the indexed website..."
              : "Index a website first..."
          }
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 outline-none focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!indexed || loading}
          className="rounded-xl bg-cyan-500 px-8 font-semibold transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "🚀 Send"}
        </button>

      </form>

    </section>
  );
}