import "../styles/home.css";

import { useState } from "react";

import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import ChatWindow from "../components/ChatWindow";

export default function Home() {

  const [indexed, setIndexed] = useState(false);

  const [website, setWebsite] = useState("");

  const [sessionId, setSessionId] = useState(0);

  return (

    <div className="home">

      <Navbar />

      <main className="home-container">

        <section className="hero">

          <h1>

            Chat with Any <span>Website</span>

          </h1>

          <p>

            Crawl an entire website, build an AI knowledge base,
            and chat with your own local AI assistant.

          </p>

        </section>

        <section className="content">

          <UrlForm
            onIndexed={(url) => {

              setWebsite(url);

              setIndexed(true);

              setSessionId((prev) => prev + 1);

            }}
          />

          <ChatWindow
            key={sessionId}
            indexed={indexed}
            website={website}
          />

        </section>

      </main>

    </div>

  );

}