from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.assessment import router as assessment_router
from app.routes.chatbot import router as chatbot_router
from app.routes.business import router as business_router
from app.routes.financial import router as financial_router
from app.routes.monthly_plan import router as monthly_plan_router

app = FastAPI(title="SIH Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assessment_router, prefix="/assessment", tags=["Assessment"])
app.include_router(chatbot_router, prefix="/chatbot", tags=["Chatbot"])
app.include_router(business_router, prefix="/business", tags=["Business"])
app.include_router(financial_router, prefix="/financial", tags=["Financial"])
app.include_router(monthly_plan_router, prefix="/monthly-plan", tags=["Monthly Plan"])

@app.get("/")
def root():
    return {"message": "API is running"}