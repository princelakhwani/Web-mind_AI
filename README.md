# 🚀 Web-Mind AI

> Chat with any website using your own local AI.

![Home](screenshots/home.png)

---

## 📖 Overview

Web-Mind AI is an AI-powered website assistant that crawls an entire website, builds a semantic knowledge base using Retrieval-Augmented Generation (RAG), and answers questions using a local Large Language Model powered by Ollama.

Unlike traditional chatbots, Web-Mind AI retrieves relevant website content before generating responses, ensuring accurate and context-aware answers.

---

## ✨ Features

- 🌐 Website Crawling
- 📄 Automatic Content Extraction
- 🧠 RAG Pipeline
- 🔎 Semantic Search
- 🤖 Local LLM (Llama 3.2)
- 📦 Chroma Vector Database
- ⚡ Live Indexing Progress
- 💬 AI Chat Interface
- 📚 Source Attribution
- 📋 Copy Responses
- 📱 Responsive UI

---

## 🏗 Architecture

Website
      │
      ▼
Crawler
      │
      ▼
Scraper
      │
      ▼
Chunking
      │
      ▼
Embeddings
      │
      ▼
ChromaDB
      │
      ▼
Retriever
      │
      ▼
Llama 3.2
      │
      ▼
Answer + Sources

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- CSS3
- Lucide React
- Axios

### Backend
- FastAPI
- LangChain
- ChromaDB
- BeautifulSoup
- Ollama
- Llama 3.2
- Nomic Embed
- Python

---

## 📂 Project Structure

backend/
frontend/
screenshots/

---

## ⚡ Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload