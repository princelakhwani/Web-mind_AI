import "../styles/sourcecard.css";

import {
  Globe,
  ExternalLink,
} from "lucide-react";

export default function SourceCard({ source }) {
  return (
    <a
      href={source}
      target="_blank"
      rel="noreferrer"
      className="source-card"
    >
      <div className="source-left">

        <div className="source-icon">

          <Globe size={22} />

        </div>

        <div>

          <h4>
            Website Source
          </h4>

          <p>
            {source}
          </p>

        </div>

      </div>

      <ExternalLink
        size={18}
        className="external-icon"
      />

    </a>
  );
}