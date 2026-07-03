import "../styles/message.css";

import ReactMarkdown from "react-markdown";
import { Bot, User, Copy } from "lucide-react";

import SourceCard from "./SourceCard";

export default function Message({
  role,
  content,
  sources = [],
  time,
}) {

  const isUser = role === "user";

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>

      <div className="message-header">

        <div className="message-user">

          <div className="avatar">

            {isUser ? (
              <User size={18} />
            ) : (
              <Bot size={18} />
            )}

          </div>

          <div>

            <div className="message-title">

              <h4>
                {isUser ? "You" : "Web-Mind AI"}
              </h4>

              {time && (
                <span className="message-time">
                  {time}
                </span>
              )}

            </div>

            <span className="message-role">
              {isUser ? "Question" : "AI Assistant"}
            </span>

          </div>

        </div>

        {!isUser && (

          <button
            className="copy-btn"
            onClick={copyMessage}
          >

            <Copy size={16} />

            Copy

          </button>

        )}

      </div>

      <div className="message-body">

        <ReactMarkdown>
          {content}
        </ReactMarkdown>

      </div>

      {!isUser && sources.length > 0 && (

        <div className="message-sources">

          <h4>
            📚 Sources
          </h4>

          {sources.map((source) => (

            <SourceCard
              key={source}
              source={source}
            />

          ))}

        </div>

      )}

    </div>
  );
}