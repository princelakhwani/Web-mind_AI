import requests
from bs4 import BeautifulSoup


class WebsiteScraper:

    def scrape(self, url: str) -> str:

        headers = {
            "User-Agent": (
                "Mozilla/5.0 "
                "AppleWebKit/537.36 "
                "Chrome/137 Safari/537.36"
            )
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=20
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        for tag in soup([
            "script",
            "style",
            "header",
            "footer",
            "nav",
            "noscript"
        ]):
            tag.decompose()

        text = soup.get_text(separator="\n")

        lines = [
            line.strip()
            for line in text.splitlines()
            if line.strip()
        ]

        return "\n".join(lines)