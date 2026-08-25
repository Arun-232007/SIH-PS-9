def analyze_market(location, business, demand_level="MEDIUM", competitors=5, estimated_customers=0):
    """Analyze the local market for a proposed rural business."""
    demand_level = (demand_level or "MEDIUM").upper()

    if competitors <= 3:
        competition = "LOW"
    elif competitors <= 7:
        competition = "MEDIUM"
    else:
        competition = "HIGH"

    if demand_level == "HIGH" and competition in ["LOW", "MEDIUM"]:
        opportunity = "HIGH"
    elif demand_level == "MEDIUM":
        opportunity = "MEDIUM"
    else:
        opportunity = "LOW"

    demand_mapping = {"HIGH": 90, "MEDIUM": 65, "LOW": 35}
    demand_score = demand_mapping.get(demand_level, 50)

    if competitors <= 3:
        competition_score = 90
    elif competitors <= 7:
        competition_score = 65
    elif competitors <= 15:
        competition_score = 45
    elif competitors <= 30:
        competition_score = 30
    else:
        competition_score = 15

    return {
        "location": location,
        "business": business,
        "demand": demand_level,
        "competition": competition,
        "estimated_customers": estimated_customers,
        "opportunity": opportunity,
        "demand_score": demand_score,
        "competition_score": competition_score
    }
