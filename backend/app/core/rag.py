from typing import Dict, List
import hashlib

from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.llm import llm
from app.core.vectorstore import vectorstore
from app.core.session import session


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

        website = session.get_website()

        existing = vectorstore.get()

        ids_to_delete = []

        if existing["ids"]:
            for idx, meta in zip(existing["ids"], existing["metadatas"]):

                if (
                    meta.get("website") == website
                    and meta.get("source") == source
                ):
                    ids_to_delete.append(idx)

        if ids_to_delete:
            vectorstore.delete(ids=ids_to_delete)

        document = Document(
            page_content=text,
            metadata={
                "website": website,
                "source": source,
            },
        )

        chunks = self.splitter.split_documents([document])

        ids = []

        for i in range(len(chunks)):
            ids.append(
                hashlib.md5(
                    f"{website}-{source}-{i}".encode()
                ).hexdigest()
            )

        vectorstore.add_documents(
            documents=chunks,
            ids=ids,
        )

        return {
            "status": "success",
            "website": website,
            "source": source,
            "chunks": len(chunks),
        }

    def search(self, query: str, k: int = 4) -> List[Dict]:

        website = session.get_website()

        results = vectorstore.similarity_search_with_score(
            query=query,
            k=k,
            filter={
                "website": website
            },
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
                    "score": float(score),
                }
            )

        return output

    def ask(self, question: str):

        website = session.get_website()

        docs = vectorstore.similarity_search(
            question,
            k=4,
            filter={
                "website": website
            },
        )

        if len(docs) == 0:
            return {
                "answer": "I couldn't find that information in the indexed website.",
                "sources": [],
            }

        context = ""

        sources = []

        seen = set()

        for doc in docs:

            if doc.page_content in seen:
                continue

            seen.add(doc.page_content)

            context += doc.page_content + "\n\n"

            source = doc.metadata.get("source", "")

            if source not in sources:
                sources.append(source)

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """
You are Web-Mind AI.

Answer ONLY using the provided website context.

Rules:

- Never hallucinate.
- Never invent information.
- If the answer is not in the context, reply:

"I couldn't find that information in the indexed website."

Context:

{context}
""",
                ),
                (
                    "human",
                    "{question}",
                ),
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
                "question": question,
            }
        )

        return {
            "answer": answer,
            "sources": sources,
        }

    def total_chunks(self):

        website = session.get_website()

        data = vectorstore.get()

        if not data["ids"]:
            return 0

        count = 0

        for meta in data["metadatas"]:
            if meta.get("website") == website:
                count += 1

        return count

    def clear_database(self):

        data = vectorstore.get()

        if data["ids"]:
            vectorstore.delete(ids=data["ids"])

        return {
            "status": "Database Cleared"
        }