from typing import List, Literal
from pydantic import BaseModel, Field

class StartupGuidanceRequest(BaseModel):
    business_category: str
    location: str
    starting_capital: float = Field(gt=0)
    monthly_revenue: float = Field(gt=0)
    monthly_expenses: float = Field(ge=0)
    language: str = "en"
    initial_knowledge: Literal["none", "low", "medium", "high"] = "none"

class StartupMonthPlanItem(BaseModel):
    month: int
    revenue: float
    expenses: float
    profit: float
    action: str
    if_profit: str
    if_loss: str

class StartupGuidanceResponse(BaseModel):
    business_category: str
    location: str
    total_profit: float
    monthly_plan: List[StartupMonthPlanItem]