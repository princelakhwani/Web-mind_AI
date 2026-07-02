from pydantic import BaseModel


class URLRequest(BaseModel):
    url: str


class SearchRequest(BaseModel):
    query: str


class AskRequest(BaseModel):
    question: str