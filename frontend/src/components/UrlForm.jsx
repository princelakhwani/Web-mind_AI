import "../styles/urlform.css";

import { useState } from "react";
import api from "../services/api";

import {
  Globe,
  LoaderCircle,
  CheckCircle2,
  FileText,
  Layers,
} from "lucide-react";

export default function UrlForm({ onIndexed }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!url.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("/index", {
        url,
      });

      setStats({
        url,
        pagesFound: response.data.pages_found,
        pagesIndexed: response.data.pages_indexed,
      });

      onIndexed(url);

    } catch (err) {
      alert("Failed to index website.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="url-card">

      <div className="url-header">

        <div className="url-icon">
          <Globe size={28} />
        </div>

        <div>

          <h2>Index Website</h2>

          <p>
            Build your AI knowledge base
          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="url-form"
      >

        <input
          type="url"
          placeholder="https://python.langchain.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle
                className="spin"
                size={20}
              />
              Indexing...
            </>
          ) : (
            <>
              🚀 Index Website
            </>
          )}
        </button>

      </form>

      {stats && (

        <div className="stats">

          <div className="success">

            <CheckCircle2
              size={26}
            />

            <div>

              <h3>
                Website Indexed
              </h3>

              <p>
                Ready for chatting
              </p>

            </div>

          </div>

          <div className="stats-grid">

            <div className="stat-box">

              <FileText size={24} />

              <span>Pages Found</span>

              <h2>
                {stats.pagesFound}
              </h2>

            </div>

            <div className="stat-box">

              <Layers size={24} />

              <span>Pages Indexed</span>

              <h2>
                {stats.pagesIndexed}
              </h2>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}