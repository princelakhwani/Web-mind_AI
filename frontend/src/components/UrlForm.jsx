import "../styles/urlform.css";

import { useState, useRef } from "react";
import api from "../services/api";

import {
  Globe,
  LoaderCircle,
  CheckCircle2,
  Database,
  BrainCircuit,
  Boxes,
  FileText,
} from "lucide-react";

export default function UrlForm({ onIndexed }) {
  const [url, setUrl] = useState("");
  const [maxPages, setMaxPages] = useState(20);

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState(null);

  const [progress, setProgress] = useState({
    percentage: 0,
    current: 0,
    total: 0,
    page: "",
    status: "idle",
  });

  // Only one polling interval
  const intervalRef = useRef(null);

  function stopPolling() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startPolling(currentUrl) {
    stopPolling();

    intervalRef.current = setInterval(async () => {
      try {
        const res = await api.get("/progress");

        setProgress(res.data);

        if (res.data.status === "completed") {
          stopPolling();

          setLoading(false);

          if (res.data.result) {
            setStats({
              website: res.data.result.website,
              pagesFound: res.data.result.pages_found,
              pagesIndexed: res.data.result.pages_indexed,
              chunks: res.data.result.chunks,
              llm: res.data.result.llm,
              embeddingModel:
                res.data.result.embedding_model,
            });

            onIndexed(currentUrl);
          }
        }
      } catch (err) {
        stopPolling();
        setLoading(false);
        alert("Indexing failed.");
      }
    }, 500);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!url.trim()) return;

    stopPolling();

    setLoading(true);

    setStats(null);

    setProgress({
      percentage: 0,
      current: 0,
      total: 0,
      page: "Preparing website...",
      status: "indexing",
    });

    try {
      await api.post("/index", {
        url,
        max_pages: maxPages,
      });

      startPolling(url);
    } catch (err) {
      stopPolling();
      setLoading(false);
      alert("Failed to start indexing.");
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
          <p>Build your AI knowledge base</p>
        </div>

      </div>

      <form
        className="url-form"
        onSubmit={handleSubmit}
      >

        <input
          type="url"
          placeholder="https://python.langchain.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="page-selector">

          <select
            value={maxPages}
            onChange={(e) =>
              setMaxPages(Number(e.target.value))
            }
          >
            <option value={20}>20 Pages</option>
            <option value={50}>50 Pages</option>
            <option value={100}>100 Pages</option>
            <option value={250}>250 Pages</option>
            <option value={500}>500 Pages</option>
            <option value={999999}>Unlimited</option>
          </select>

        </div>

        <button disabled={loading}>

          {loading ? (
            <>
              <LoaderCircle
                className="spin"
                size={18}
              />
              Indexing...
            </>
          ) : (
            <>
              🚀 Index
            </>
          )}

        </button>

      </form>

      {loading && (

        <div className="progress-card">

          <h3>🌐 Crawling Website</h3>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress.percentage}%`,
              }}
            />

          </div>

          <p>

            <strong>
              {progress.percentage}%
            </strong>{" "}
            Complete

          </p>

          <p>

            {progress.current} / {progress.total} Pages Indexed

          </p>

          <small>

            {progress.page || "Preparing website..."}

          </small>

        </div>

      )}

      {stats && (

        <div className="website-info">

          <div className="success">

            <CheckCircle2 size={24} />

            <div>

              <h3>
                Website Indexed Successfully
              </h3>

              <p>
                {stats.website}
              </p>

            </div>

          </div>

          <div className="info-grid">

            <div className="info-item">
              <FileText size={18} />
              <span>Pages Found</span>
              <strong>{stats.pagesFound}</strong>
            </div>

            <div className="info-item">
              <Database size={18} />
              <span>Pages Indexed</span>
              <strong>{stats.pagesIndexed}</strong>
            </div>

            <div className="info-item">
              <Boxes size={18} />
              <span>Chunks</span>
              <strong>{stats.chunks}</strong>
            </div>

            <div className="info-item">
              <BrainCircuit size={18} />
              <span>LLM</span>
              <strong>{stats.llm}</strong>
            </div>

            <div className="info-item">
              <Globe size={18} />
              <span>Embedding</span>
              <strong>{stats.embeddingModel}</strong>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}