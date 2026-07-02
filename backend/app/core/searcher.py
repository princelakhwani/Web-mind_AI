import requests
from bs4 import BeautifulSoup
from urllib.parse import quote


class WebsiteSearcher:

    def search(self, base_url: str, query: str):

        domain = base_url.replace("https://", "").replace("http://", "").split("/")[0]

        google_query = f"site:{domain} {query}"

        url = (
            "https://www.google.com/search?q="
            + quote(google_query)
        )

        headers = {
            "User-Agent":
            "Mozilla/5.0"
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        links = []

        for a in soup.select("a"):

            href = a.get("href")

            if not href:
                continue

            if "/url?q=" in href:

                real = href.split("/url?q=")[1].split("&")[0]

                if domain in real:
                    links.append(real)

        unique = []

        for link in links:

            if link not in unique:
                unique.append(link)

        return unique[:5]