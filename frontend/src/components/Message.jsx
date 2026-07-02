import ReactMarkdown from "react-markdown";

export default function Message({ role, content, sources = [] }) {
  const isUser = role === "user";

  return (
    <div
      className={`mb-8 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-4xl rounded-2xl p-5 shadow-lg ${
          isUser
            ? "bg-cyan-600 text-white"
            : "border border-slate-700 bg-slate-900 text-white"
        }`}
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="text-2xl">
            {isUser ? "👤" : "🤖"}
          </div>

          <span className="font-semibold">
            {isUser ? "You" : "Web-Mind AI"}
          </span>
        </div>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {!isUser && sources.length > 0 && (
          <>
            <div className="my-5 border-t border-slate-700" />

            <p className="mb-3 font-semibold text-cyan-400">
              Sources
            </p>

            <div className="space-y-3">
              {sources.map((source) => (
                <a
                  key={source}
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-slate-700 bg-slate-800 p-3 transition hover:border-cyan-500 hover:bg-slate-700"
                >
                  📄 {source}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}