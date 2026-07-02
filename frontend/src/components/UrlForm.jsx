import { useState } from "react";
import api from "../services/api";

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
        found: response.data.pages_found,
        indexed: response.data.pages_indexed,
      });

      onIndexed(url);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <h2 className="mb-4 text-2xl font-bold">
          Index Website
        </h2>

        <div className="flex gap-4">

          <input
            type="url"
            placeholder="https://python.langchain.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-5 py-4"
          />

          <button
            disabled={loading}
            className="rounded-xl bg-cyan-500 px-8 font-semibold"
          >
            {loading ? "Indexing..." : "Index"}
          </button>

        </div>
      </form>

      {stats && (

        <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-slate-900 p-6">

          <h3 className="text-xl font-bold text-cyan-400">
            Website Indexed
          </h3>

          <div className="mt-4 space-y-2">

            <p>
              🌐 {stats.url}
            </p>

            <p>
              📄 Pages Found : {stats.found}
            </p>

            <p>
              ✅ Pages Indexed : {stats.indexed}
            </p>

            <p className="text-green-400">
              Ready for AI Chat
            </p>

          </div>

        </div>

      )}

    </>
  );
}