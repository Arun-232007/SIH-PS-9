from fastapi import APIRouter
from app.models.request_models import BusinessRequest
from app.models.response_models import BusinessResponse
from app.services.report_service import build_business_report

router = APIRouter()


@router.post(
    "/",
    response_model=BusinessResponse,
    summary="Business Report",
    description="Generates a dynamic SWOT-based business feasibility report."
)
def business_assessment(data: BusinessRequest):
    return build_business_report(data)
