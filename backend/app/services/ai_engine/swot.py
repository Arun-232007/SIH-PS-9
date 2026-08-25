def generate_swot(data):
    """Generate a business SWOT analysis using financial, market and risk information."""
    business = data.get("business", "Micro Business")
    demand_score = float(data.get("demand_score", 50))
    competition_score = float(data.get("competition_score", 50))
    risk_score = float(data.get("risk_score", 50))
    profit_margin = float(data.get("profit_margin", 0))
    available_margin = float(data.get("available_margin", 0))

    strengths = []
    if demand_score >= 70:
        strengths.append("Strong local market demand.")
    if profit_margin >= 20:
        strengths.append("Healthy expected profit margin.")
    if available_margin > 0:
        strengths.append("Entrepreneur has initial own contribution for business investment.")
    if competition_score <= 40:
        strengths.append("Relatively low local competition.")
    if not strengths:
        strengths.append("Business has potential for gradual local growth.")

    weaknesses = []
    if profit_margin < 10:
        weaknesses.append("Low expected profit margin.")
    if competition_score >= 70:
        weaknesses.append("High competition may reduce market share.")
    if risk_score >= 60:
        weaknesses.append("Business has significant operational risks.")
    if available_margin < 50000:
        weaknesses.append("Limited own capital may restrict initial working capital.")
    if not weaknesses:
        weaknesses.append("Business may require continuous monitoring of operating expenses.")

    opportunities = []
    if demand_score >= 60:
        opportunities.append("Opportunity to capture unmet local demand.")
    if competition_score <= 50:
        opportunities.append("Potential to differentiate in an underserved niche.")
    opportunities.append("Expansion through digital marketing and local delivery channels.")
    opportunities.append("Potential to introduce additional products or services based on customer demand.")

    threats = []
    if competition_score >= 60:
        threats.append("Increasing competition from existing businesses.")
    if risk_score >= 60:
        threats.append("Operational and financial risks may affect business sustainability.")
    threats.append("Seasonal changes in customer demand.")
    threats.append("Changes in supplier prices and operating costs.")

    return {
        "business": business,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "opportunities": opportunities,
        "threats": threats
    }
