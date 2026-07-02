from pydantic import BaseModel


from typing import Optional
from pydantic import BaseModel

class URLRequest(BaseModel):
    url: str
    max_pages: Optional[int] = 20


class SearchRequest(BaseModel):
    query: str


class AskRequest(BaseModel):
    question: str