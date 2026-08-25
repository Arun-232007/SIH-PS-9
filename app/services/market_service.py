def get_market_insights(location: str, business_category: str):
    return {
        "summary": f"{business_category} has local demand in {location}.",
        "strengths": ["Low starting cost", "Local customer access"],
        "weaknesses": ["Limited scale", "Dependence on local demand"],
        "opportunities": ["Nearby villages", "Untapped customer segments"],
        "threats": ["Competition", "Seasonal demand changes"]
    }