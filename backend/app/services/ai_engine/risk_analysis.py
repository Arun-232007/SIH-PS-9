def analyze_risk(data):
    """
    Analyze major risks for a rural / semi-urban micro-enterprise.
    Scores: 0 = No risk, 100 = Very high risk
    """
    competition = float(data.get("competition_score", 50))
    seasonal = float(data.get("seasonal_risk", 30))
    supply = float(data.get("supply_risk", 30))
    customer = float(data.get("customer_risk", 30))
    financial = float(data.get("financial_risk", 30))

    scores = {
        "competition": competition, "seasonal": seasonal,
        "supply": supply, "customer": customer, "financial": financial
    }
    for name, score in scores.items():
        if score < 0 or score > 100:
            raise ValueError(f"{name} risk must be between 0 and 100.")

    overall_risk = round(
        competition * 0.20 + seasonal * 0.15 + supply * 0.20
        + customer * 0.20 + financial * 0.25, 2
    )

    if overall_risk <= 30:
        risk_level = "LOW"
    elif overall_risk <= 60:
        risk_level = "MEDIUM"
    else:
        risk_level = "HIGH"

    def get_level(score):
        if score <= 30:
            return "LOW"
        elif score <= 60:
            return "MEDIUM"
        else:
            return "HIGH"

    risk_levels = {
        "competition": get_level(competition),
        "seasonal": get_level(seasonal),
        "supply": get_level(supply),
        "customer": get_level(customer),
        "financial": get_level(financial)
    }

    recommendations = []
    if competition > 60:
        recommendations.append("Differentiate through quality, pricing, customer service or an underserved niche.")
    if seasonal > 60:
        recommendations.append("Maintain working-capital reserves and diversify products during seasonal demand.")
    if supply > 60:
        recommendations.append("Maintain multiple suppliers and avoid dependency on a single source.")
    if customer > 60:
        recommendations.append("Diversify customer segments and sales channels.")
    if financial > 60:
        recommendations.append("Reduce unnecessary expenses and maintain an emergency cash reserve.")
    if not recommendations:
        recommendations.append("No major risk detected under the supplied assumptions. Continue periodic monitoring.")

    return {
        "competition_risk": round(competition, 2),
        "seasonal_risk": round(seasonal, 2),
        "supply_risk": round(supply, 2),
        "customer_risk": round(customer, 2),
        "financial_risk": round(financial, 2),
        "risk_score": overall_risk,
        "risk_level": risk_level,
        "risk_levels": risk_levels,
        "recommendations": recommendations
    }
