from fastapi import APIRouter
from app.models.response_models import ChatbotResponse
from app.services.ai_service import generate_chat_response

router = APIRouter()

@router.post(
    "/",
    response_model=ChatbotResponse,
    summary="AI Chatbot",
    description="Returns a simple AI-style response for user queries."
)
def chatbot_reply(message: dict):
    user_input = message.get("message", "")
    return {"reply": generate_chat_response(user_input)}