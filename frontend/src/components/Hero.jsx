import { useState } from "react";

import api from "../services/api";
import UrlForm from "./UrlForm";

export default function Hero() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleIndex(url) {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/index", {
        url,
      });

      setMessage(
        `✅ Indexed ${response.data.pages_indexed} pages`
      );
    } catch (error) {
      console.error(error);

      setMessage("❌ Failed to index website");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
      <h1 className="text-6xl font-bold">
        Chat with any Website
      </h1>

      <p className="mt-6 max-w-3xl text-xl text-slate-400">
        Scrape websites, build a knowledge base using RAG,
        and chat with your data locally using LangChain,
        Ollama and ChromaDB.
      </p>

      <UrlForm
        onIndex={handleIndex}
        loading={loading}
      />

      {message && (
        <p className="mt-6 text-lg font-medium">
          {message}
        </p>
      )}
    </section>
  );
}