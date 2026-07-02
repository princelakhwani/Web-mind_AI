import { useState } from "react";

import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
  const [indexed, setIndexed] = useState(false);
  const [website, setWebsite] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">

        <div className="mb-10 text-center">

          <h1 className="text-5xl font-bold">
            Chat with Any Website
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Crawl websites, build a knowledge base using RAG and
            chat with your data locally.
          </p>

        </div>

        <UrlForm
          onIndexed={(url) => {
            setWebsite(url);
            setIndexed(true);
          }}
        />

        <ChatWindow
          indexed={indexed}
          website={website}
        />

      </main>
    </div>
  );
}