from typing import List, Optional
from pydantic import BaseModel


class FinancialResponse(BaseModel):
    project_cost: float
    loan_amount: float
    scheme_name: str
    interest_rate: Optional[float]
    tenure_years: Optional[int]
    moratorium_months: Optional[int]
    emi: float
    total_interest: float
    total_repayment: float


class BusinessResponse(BaseModel):
    summary: str
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]


class MarketResponse(BaseModel):
    demand: str
    competition: str
    estimated_customers: int
    opportunity: str
    demand_score: float
    competition_score: float
    data_source: str  # "mapping_dataset" (real geo data matched) or "default_assumption"
    matched_location: Optional[str] = None
    avg_local_price: Optional[float] = None
    common_risks: List[str] = []


class RiskResponse(BaseModel):
    risk_score: float
    risk_level: str
    risk_levels: dict
    recommendations: List[str]


class ScenarioResult(BaseModel):
    monthly_revenue: float
    monthly_expenses: float
    operating_profit: float
    monthly_emi: float
    cash_after_emi: float
    profit_margin: float
    dscr: Optional[float]
    status: str
    feasibility: str


class FeasibilityResponse(BaseModel):
    overall_score: float
    financial_score: float
    market_score: float
    risk_score: float
    financial_status: str
    market_status: str
    risk_status: str
    decision: str
    recommendation: str
    warnings: List[str]
    monthly_revenue: float
    monthly_expenses: float
    monthly_emi: float
    monthly_profit_after_emi: float
    roi: float
    dscr: Optional[float]
    break_even_revenue: Optional[float]
    payback_months: Optional[float]
    scenarios: dict


class AssessmentResponse(BaseModel):
    location: str
    business_category: str
    financial: FinancialResponse
    business: BusinessResponse
    market: MarketResponse
    risk: RiskResponse
    feasibility: FeasibilityResponse


class ChatbotResponse(BaseModel):
    reply: str
