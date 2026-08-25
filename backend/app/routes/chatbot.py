from fastapi import APIRouter
from app.models.request_models import ChatbotRequest
from app.models.response_models import ChatbotResponse
from app.services.ai_engine.advisory_chatbot import chatbot_response, generate_chat_response

router = APIRouter()


@router.post(
    "/",
    response_model=ChatbotResponse,
    summary="AI Chatbot",
    description="Answers questions about a business assessment. Pass the "
                "'assessment.feasibility' object (merged with financial data) "
                "from a prior /assessment/ call as 'context' for grounded answers."
)
def chatbot_reply(data: ChatbotRequest):
    if data.context:
        reply = chatbot_response(data.context, data.message)
    else:
        reply = generate_chat_response(data.message)
    return {"reply": reply}
