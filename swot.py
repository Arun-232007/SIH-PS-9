# ============================================================
# GRAM-BIZ AI
# SWOT ANALYSIS ENGINE
# ============================================================


def generate_swot(data):
    """
    Generate a business SWOT analysis using
    financial, market and risk information.
    """

    business = data.get(
        "business",
        "Micro Business"
    )

    demand_score = float(
        data.get("demand_score", 50)
    )

    competition_score = float(
        data.get("competition_score", 50)
    )

    risk_score = float(
        data.get("risk_score", 50)
    )

    profit_margin = float(
        data.get("profit_margin", 0)
    )

    available_margin = float(
        data.get("available_margin", 0)
    )

    # ========================================================
    # STRENGTHS
    # ========================================================

    strengths = []

    if demand_score >= 70:
        strengths.append(
            "Strong local market demand."
        )

    if profit_margin >= 20:
        strengths.append(
            "Healthy expected profit margin."
        )

    if available_margin > 0:
        strengths.append(
            "Entrepreneur has initial own contribution "
            "for business investment."
        )

    if competition_score <= 40:
        strengths.append(
            "Relatively low local competition."
        )

    if not strengths:
        strengths.append(
            "Business has potential for gradual local growth."
        )

    # ========================================================
    # WEAKNESSES
    # ========================================================

    weaknesses = []

    if profit_margin < 10:
        weaknesses.append(
            "Low expected profit margin."
        )

    if competition_score >= 70:
        weaknesses.append(
            "High competition may reduce market share."
        )

    if risk_score >= 60:
        weaknesses.append(
            "Business has significant operational risks."
        )

    if available_margin < 50000:
        weaknesses.append(
            "Limited own capital may restrict initial "
            "working capital."
        )

    if not weaknesses:
        weaknesses.append(
            "Business may require continuous monitoring "
            "of operating expenses."
        )

    # ========================================================
    # OPPORTUNITIES
    # ========================================================

    opportunities = []

    if demand_score >= 60:
        opportunities.append(
            "Opportunity to capture unmet local demand."
        )

    if competition_score <= 50:
        opportunities.append(
            "Potential to differentiate in an underserved niche."
        )

    opportunities.append(
        "Expansion through digital marketing and "
        "local delivery channels."
    )

    opportunities.append(
        "Potential to introduce additional products "
        "or services based on customer demand."
    )

    # ========================================================
    # THREATS
    # ========================================================

    threats = []

    if competition_score >= 60:
        threats.append(
            "Increasing competition from existing businesses."
        )

    if risk_score >= 60:
        threats.append(
            "Operational and financial risks may affect "
            "business sustainability."
        )

    threats.append(
        "Seasonal changes in customer demand."
    )

    threats.append(
        "Changes in supplier prices and operating costs."
    )

    # ========================================================
    # RETURN
    # ========================================================

    return {

        "business": business,

        "strengths": strengths,

        "weaknesses": weaknesses,

        "opportunities": opportunities,

        "threats": threats
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    print("\n==========================================")
    print("           GRAM-BIZ AI")
    print("           SWOT ANALYSIS")
    print("==========================================")

    business = input(
        "\nBusiness Name / Category: "
    )

    demand_score = float(
        input(
            "Demand Score (0-100): "
        )
    )

    competition_score = float(
        input(
            "Competition Score (0-100): "
        )
    )

    risk_score = float(
        input(
            "Risk Score (0-100): "
        )
    )

    profit_margin = float(
        input(
            "Expected Profit Margin (%): "
        )
    )

    available_margin = float(
        input(
            "Available Margin Capital (₹): "
        )
    )

    data = {

        "business": business,

        "demand_score": demand_score,

        "competition_score":
            competition_score,

        "risk_score":
            risk_score,

        "profit_margin":
            profit_margin,

        "available_margin":
            available_margin
    }

    result = generate_swot(data)

    # ========================================================
    # OUTPUT
    # ========================================================

    print("\n==========================================")
    print("              SWOT REPORT")
    print("==========================================")

    print("\n🟢 STRENGTHS")

    for item in result["strengths"]:
        print(f"  • {item}")

    print("\n🟡 WEAKNESSES")

    for item in result["weaknesses"]:
        print(f"  • {item}")

    print("\n🔵 OPPORTUNITIES")

    for item in result["opportunities"]:
        print(f"  • {item}")

    print("\n🔴 THREATS")

    for item in result["threats"]:
        print(f"  • {item}")

    print("\n==========================================")