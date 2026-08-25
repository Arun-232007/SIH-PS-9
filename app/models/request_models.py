from pydantic import BaseModel

class BusinessRequest(BaseModel):
    location: str
    business_category: str
    margin_capital: float
    language: str = "en"