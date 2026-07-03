import "../styles/suggestedquestions.css";

import {
  BookOpen,
  Sparkles,
  Rocket,
  Code2,
  FileText,
  Lightbulb,
} from "lucide-react";

const QUESTIONS = [
  {
    icon: <Sparkles size={18} />,
    text: "What is this website about?",
  },
  {
    icon: <BookOpen size={18} />,
    text: "Summarize the documentation",
  },
  {
    icon: <Rocket size={18} />,
    text: "How do I get started?",
  },
  {
    icon: <Code2 size={18} />,
    text: "Show code examples",
  },
  {
    icon: <FileText size={18} />,
    text: "Explain the installation process",
  },
  {
    icon: <Lightbulb size={18} />,
    text: "What are the main features?",
  },
];

export default function SuggestedQuestions({ onAsk }) {
  return (
    <div className="suggested-container">

      <div className="suggested-header">

        <Sparkles size={22} />

        <h3>Suggested Questions</h3>

      </div>

      <div className="question-grid">

        {QUESTIONS.map((item) => (

          <button
            key={item.text}
            className="question-card"
            onClick={() => onAsk(item.text)}
          >

            <div className="question-icon">
              {item.icon}
            </div>

            <span>
              {item.text}
            </span>

          </button>

        ))}

      </div>

    </div>
  );
}