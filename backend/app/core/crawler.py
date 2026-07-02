from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup


class WebsiteCrawler:

    def __init__(self):
        self.visited = set()

    def crawl(self, base_url: str, max_pages: int = 20):
        """
        Crawl all pages from the same domain.
        """

        # IMPORTANT:
        # Reset visited every new crawl
        self.visited = set()

        pages = []

        self._crawl(
            url=base_url,
            base_url=base_url,
            pages=pages,
            max_pages=max_pages,
        )

        return pages

    def _crawl(
        self,
        url: str,
        base_url: str,
        pages: list,
        max_pages: int,
    ):

        if len(pages) >= max_pages:
            return

        url = url.split("#")[0].rstrip("/")

        if url in self.visited:
            return

        self.visited.add(url)

        try:

            response = requests.get(
                url,
                timeout=10,
                headers={
                    "User-Agent": (
                        "Mozilla/5.0 "
                        "AppleWebKit/537.36 "
                        "Chrome/137 Safari/537.36"
                    )
                },
            )

            response.raise_for_status()

            soup = BeautifulSoup(
                response.text,
                "html.parser",
            )

            pages.append(url)

            base_domain = urlparse(base_url).netloc

            for link in soup.find_all("a", href=True):

                href = urljoin(url, link["href"])

                href = href.split("#")[0].rstrip("/")

                parsed = urlparse(href)

                if parsed.netloc != base_domain:
                    continue

                if parsed.scheme not in ("http", "https"):
                    continue

                if href.endswith(
                    (
                        ".png",
                        ".jpg",
                        ".jpeg",
                        ".gif",
                        ".svg",
                        ".pdf",
                        ".zip",
                        ".css",
                        ".js",
                        ".ico",
                    )
                ):
                    continue

                self._crawl(
                    href,
                    base_url,
                    pages,
                    max_pages,
                )

        except Exception as e:
            print(f"Crawler error: {url}")
            print(e)