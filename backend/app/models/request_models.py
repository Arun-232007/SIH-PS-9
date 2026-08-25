from typing import List, Optional
from pydantic import BaseModel, Field


class ProductItem(BaseModel):
    name: str
    price: float
    quantity_per_month: float


class ExpenseItem(BaseModel):
    name: str
    amount: float


class BusinessRequest(BaseModel):
    location: str
    business_category: str
    margin_capital: float
    language: str = "en"

    # Optional revenue/expense breakdown (from AI module).
    # If omitted, monthly_revenue / monthly_expenses are used directly.
    products: List[ProductItem] = Field(default_factory=list)
    expenses: List[ExpenseItem] = Field(default_factory=list)
    monthly_revenue: float = 0
    monthly_expenses: float = 0

    # Market inputs. Leave these as None to auto-resolve from the mapping
    # dataset (app/data/*.json) based on location + business_category.
    # Pass an explicit value to override the looked-up data.
    demand_level: Optional[str] = None      # HIGH / MEDIUM / LOW
    competitors: Optional[int] = None
    estimated_customers: Optional[int] = None

    # Risk inputs (0-100 scale, sensible moderate defaults).
    seasonal_risk: float = 30
    supply_risk: float = 30
    customer_risk: float = 30
    financial_risk: float = 30


class ChatbotRequest(BaseModel):
    message: str
    # Pass the "assessment" object returned by /assessment/ here so the
    # chatbot can answer with real context. Optional - falls back to a
    # generic reply if omitted.
    context: Optional[dict] = None
