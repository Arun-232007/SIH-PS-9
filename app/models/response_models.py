from pydantic import BaseModel

class FinancialResponse(BaseModel):
    project_cost: float
    loan_amount: float
    scheme_name: str
    interest_rate: float
    tenure_years: int
    moratorium_months: int

class BusinessResponse(BaseModel):
    summary: str
    strengths: list[str]
    weaknesses: list[str]
    opportunities: list[str]
    threats: list[str]

class AssessmentResponse(BaseModel):
    location: str
    business_category: str
    financial: FinancialResponse
    business: BusinessResponse

class ChatbotResponse(BaseModel):
    reply: str