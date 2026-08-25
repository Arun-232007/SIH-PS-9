from app.services.market_service import get_market_insights

def build_business_report(location: str, business_category: str):
    return get_market_insights(location, business_category)