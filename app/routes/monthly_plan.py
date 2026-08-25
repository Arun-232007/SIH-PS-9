from fastapi import APIRouter
from app.models.monthly_models import StartupGuidanceRequest, StartupGuidanceResponse
from app.services.monthly_plan_service import generate_startup_guidance

router = APIRouter()

@router.post(
    "/",
    response_model=StartupGuidanceResponse,
    summary="Startup Guidance Plan"
)
def startup_guidance(data: StartupGuidanceRequest):
    total_profit, plan = generate_startup_guidance(
        data.business_category,
        data.location,
        data.starting_capital,
        data.monthly_revenue,
        data.monthly_expenses,
        data.initial_knowledge
    )
    return {
        "business_category": data.business_category,
        "location": data.location,
        "total_profit": total_profit,
        "monthly_plan": plan
    }