import "../styles/suggestedquestions.css";

const QUESTIONS = [
  "What is this website about?",
  "Summarize the documentation",
  "How do I get started?",
  "Explain the installation process",
  "Show important features",
  "What APIs are available?",
];

export default function SuggestedQuestions({
  onAsk,
}) {
  return (
    <div className="suggested-container">

      <h3>
        💡 Suggested Questions
      </h3>

      <div className="question-grid">

        {QUESTIONS.map((question) => (

          <button
            key={question}
            className="question-chip"
            onClick={() => onAsk(question)}
          >
            {question}
          </button>

        ))}

      </div>

    </div>
  );
}