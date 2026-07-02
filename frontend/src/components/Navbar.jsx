import "../styles/navbar.css";

import { BrainCircuit } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-container">

        <div className="navbar-logo">

          <div className="logo-icon">
            <BrainCircuit size={24} />
          </div>

          <div>
            <h2>Web-Mind AI</h2>
            <p>AI Website Research Assistant</p>
          </div>

        </div>

        <div className="navbar-status">

          <span className="status-dot"></span>

          <span>Local AI</span>

        </div>

      </div>

    </header>
  );
}