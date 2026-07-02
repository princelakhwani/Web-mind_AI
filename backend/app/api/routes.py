from fastapi import APIRouter, HTTPException

from app.core.scraper import WebsiteScraper
from app.core.rag import RAGPipeline
from app.core.crawler import WebsiteCrawler
from app.schemas import URLRequest, SearchRequest, AskRequest

router = APIRouter()

scraper = WebsiteScraper()
crawler = WebsiteCrawler()
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


@router.post("/clear")
def clear():
    try:
        return rag.clear_database()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/index")
def index(request: URLRequest):
    try:

        pages = crawler.crawl(
            request.url,
            max_pages=20
        )

        indexed = 0
        errors = []

        for page in pages:

            try:

                print(f"Indexing: {page}")

                text = scraper.scrape(page)

                if not text.strip():
                    raise Exception("Empty page")

                rag.index(
                    text=text,
                    source=page
                )

                indexed += 1

            except Exception as e:

                print(f"FAILED: {page}")

                print(e)

                errors.append(
                    {
                        "page": page,
                        "error": str(e)
                    }
                )

        return {
            "status": "success",
            "pages_found": len(pages),
            "pages_indexed": indexed,
            "errors": errors
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/search")
def search(request: SearchRequest):
    try:

        return {
            "status": "success",
            "results": rag.search(request.query)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ask")
def ask(request: AskRequest):
    try:

        return rag.ask(request.question)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))