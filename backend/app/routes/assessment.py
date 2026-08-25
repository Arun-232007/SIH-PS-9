from fastapi import APIRouter
from app.models.request_models import BusinessRequest
from app.models.response_models import AssessmentResponse
from app.services.report_service import build_full_assessment

router = APIRouter()


@router.post(
    "/",
    response_model=AssessmentResponse,
    summary="Full Assessment",
    description="Generates financial structuring (with EMI), market analysis, "
                "risk analysis, SWOT and an overall feasibility decision."
)
def full_assessment(data: BusinessRequest):
    return build_full_assessment(data)
