from langchain_chroma import Chroma
from app.core.embeddings import embeddings

DB_PATH = "data/chroma"

vectorstore = Chroma(
    persist_directory=DB_PATH,
    embedding_function=embeddings,
    collection_name="webmind"
)