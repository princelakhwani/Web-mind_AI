from typing import Dict, List
import hashlib

from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.llm import llm
from app.core.vectorstore import vectorstore


class RAGPipeline:
    """
    Handles indexing, retrieval and AI question answering.
    """

    def __init__(self):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=150,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                ""
            ]
        )

    def index(self, text: str, source: str) -> Dict:

        existing = vectorstore.get()

        ids_to_delete = []

        if existing["ids"]:
            for idx, meta in zip(existing["ids"], existing["metadatas"]):
                if meta.get("source") == source:
                    ids_to_delete.append(idx)

        if ids_to_delete:
            vectorstore.delete(ids=ids_to_delete)

        document = Document(
            page_content=text,
            metadata={
                "source": source
            }
        )

        chunks = self.splitter.split_documents([document])

        ids = []

        for i in range(len(chunks)):
            ids.append(
                hashlib.md5(
                    f"{source}-{i}".encode()
                ).hexdigest()
            )

        vectorstore.add_documents(
            documents=chunks,
            ids=ids
        )

        return {
            "status": "success",
            "source": source,
            "chunks": len(chunks)
        }

    def search(self, query: str, k: int = 4) -> List[Dict]:

        results = vectorstore.similarity_search_with_score(
            query=query,
            k=k
        )

        output = []

        seen = set()

        for doc, score in results:

            if doc.page_content in seen:
                continue

            seen.add(doc.page_content)

            output.append(
                {
                    "content": doc.page_content,
                    "source": doc.metadata.get("source", ""),
                    "score": float(score)
                }
            )

        return output

    def ask(self, question: str):

        docs = vectorstore.similarity_search(
            question,
            k=4
        )

        context = ""

        sources = set()

        seen = set()

        for doc in docs:

            if doc.page_content in seen:
                continue

            seen.add(doc.page_content)

            context += doc.page_content + "\n\n"

            sources.add(
                doc.metadata.get("source", "")
            )

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """You are Web-Mind AI.

Answer ONLY from the provided context.

Rules:
- Never hallucinate.
- Never make up facts.
- If answer is unavailable say:
'I couldn't find that information in the indexed website.'

Context:

{context}
"""
                ),
                (
                    "human",
                    "{question}"
                )
            ]
        )

        chain = (
            prompt
            | llm
            | StrOutputParser()
        )

        answer = chain.invoke(
            {
                "context": context,
                "question": question
            }
        )

        return {
            "answer": answer,
            "sources": list(sources)
        }

    def total_chunks(self):

        data = vectorstore.get()

        if not data["ids"]:
            return 0

        return len(data["ids"])

    def clear_database(self):

        data = vectorstore.get()

        if data["ids"]:
            vectorstore.delete(
                ids=data["ids"]
            )

        return {
            "status": "Database Cleared"
        }