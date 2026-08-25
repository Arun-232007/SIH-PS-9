from fastapi import APIRouter
from app.models.request_models import BusinessRequest
from app.models.response_models import FinancialResponse
from app.services.financial_engine import calculate_financials
from app.services.scheme_router import get_scheme

router = APIRouter()

@router.post(
    "/",
    response_model=FinancialResponse,
    summary="Financial Assessment",
    description="Calculates project cost, loan amount, and scheme details."
)
def financial_assessment(data: BusinessRequest):
    project_cost, loan_amount = calculate_financials(data.margin_capital)
    scheme = get_scheme(project_cost)

    return {
        "project_cost": project_cost,
        "loan_amount": loan_amount,
        **scheme
    }