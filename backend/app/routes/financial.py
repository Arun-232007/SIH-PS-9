from fastapi import APIRouter
from app.models.request_models import BusinessRequest
from app.models.response_models import FinancialResponse
from app.services.ai_engine.financial_structure import calculate_financial_structure

router = APIRouter()


@router.post(
    "/",
    response_model=FinancialResponse,
    summary="Financial Assessment",
    description="Calculates project cost, loan amount, scheme details and EMI."
)
def financial_assessment(data: BusinessRequest):
    result = calculate_financial_structure(data.margin_capital)
    return {
        "project_cost": result["project_cost"],
        "loan_amount": result["loan_amount"],
        "scheme_name": result["scheme_name"],
        "interest_rate": result["interest_rate"],
        "tenure_years": result["tenure_years"],
        "moratorium_months": result["moratorium_months"],
        "emi": result["emi"],
        "total_interest": result["total_interest"],
        "total_repayment": result["total_repayment"],
    }
