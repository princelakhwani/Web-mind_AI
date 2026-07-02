from app.core.progress import progress
from app.core.scraper import WebsiteScraper
from app.core.crawler import WebsiteCrawler
from app.core.rag import RAGPipeline

scraper = WebsiteScraper()
crawler = WebsiteCrawler()
rag = RAGPipeline()


def index_website(url: str):
    try:
        pages = crawler.crawl(
            url,
            max_pages=20,
        )

        progress.start(len(pages))

        indexed = 0
        errors = []

        for i, page in enumerate(pages, start=1):

            progress.update(i, page)

            try:
                print(f"Indexing {page}")

                text = scraper.scrape(page)

                if not text.strip():
                    raise Exception("Empty page")

                rag.index(
                    text=text,
                    source=page,
                )

                indexed += 1

            except Exception as e:
                errors.append(
                    {
                        "page": page,
                        "error": str(e),
                    }
                )

        result = {
            "website": url,
            "pages_found": len(pages),
            "pages_indexed": indexed,
            "chunks": rag.total_chunks(),
            "llm": "llama3.2",
            "embedding_model": "nomic-embed-text",
            "errors": errors,
        }

        progress.finish(result)

    except Exception as e:
        progress.reset()
        print(e)