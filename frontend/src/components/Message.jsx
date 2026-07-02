import ReactMarkdown from "react-markdown";

export default function Message({ role, content, sources = [] }) {
  const isUser = role === "user";

  return (
    <div
      className={`mb-6 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-4xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-cyan-600 text-white"
            : "bg-slate-900 border border-slate-800"
        }`}
      >
        <div className="mb-2 font-semibold">
          {isUser ? "👤 You" : "🤖 Web-Mind AI"}
        </div>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {!isUser && sources.length > 0 && (
          <div className="mt-5 border-t border-slate-700 pt-4">
            <p className="mb-2 font-semibold">Sources</p>

            {sources.map((source) => (
              <div
                key={source}
                className="mb-2 rounded-lg bg-slate-800 px-3 py-2 text-sm break-all"
              >
                {source}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}