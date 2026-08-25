from fastapi import APIRouter
from app.models.request_models import BusinessRequest
from app.models.response_models import AssessmentResponse
from app.services.financial_engine import calculate_financials
from app.services.scheme_router import get_scheme
from app.services.report_service import build_business_report

router = APIRouter()

@router.post(
    "/",
    response_model=AssessmentResponse,
    summary="Full Assessment",
    description="Generates financial analysis, scheme matching, and a business feasibility report."
)
def full_assessment(data: BusinessRequest):
    project_cost, loan_amount = calculate_financials(data.margin_capital)
    scheme = get_scheme(project_cost)
    business_report = build_business_report(data.location, data.business_category)

    return {
        "location": data.location,
        "business_category": data.business_category,
        "financial": {
            "project_cost": project_cost,
            "loan_amount": loan_amount,
            **scheme
        },
        "business": business_report
    }