import threading

from fastapi import APIRouter, HTTPException

from app.core.progress import progress
from app.core.scraper import WebsiteScraper
from app.core.rag import RAGPipeline
from app.schemas import URLRequest, SearchRequest, AskRequest
from app.services.index_service import index_website

router = APIRouter()

scraper = WebsiteScraper()
rag = RAGPipeline()


@router.get("/")
def home():
    return {
        "message": "Welcome to Web-Mind AI 🚀"
    }


@router.get("/health")
def health():
    return {
        "status": "running"
    }


@router.get("/progress")
def get_progress():
    return progress.get()


@router.post("/clear")
def clear():
    try:
        return rag.clear_database()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/scrape")
def scrape(request: URLRequest):
    try:

        text = scraper.scrape(request.url)

        return {
            "status": "success",
            "characters": len(text),
            "preview": text[:1000]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/index")
def index(request: URLRequest):

    thread = threading.Thread(
        target=index_website,
        args=(
            request.url,
            request.max_pages,
        ),
        daemon=True,
    )

    thread.start()

    return {
        "status": "started"
    }


@router.post("/search")
def search(request: SearchRequest):
    try:

        return {
            "status": "success",
            "results": rag.search(request.query)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/ask")
def ask(request: AskRequest):
    try:
        return rag.ask(request.question)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )