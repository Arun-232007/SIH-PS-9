# ============================================================
# GRAM-BIZ AI
# BUSINESS RISK ANALYSIS ENGINE
# ============================================================


def analyze_risk(data):
    """
    Analyze major risks for a rural / semi-urban
    micro-enterprise.

    Scores:
        0   = No risk
        100 = Very high risk
    """

    competition = float(
        data.get("competition_score", 50)
    )

    seasonal = float(
        data.get("seasonal_risk", 30)
    )

    supply = float(
        data.get("supply_risk", 30)
    )

    customer = float(
        data.get("customer_risk", 30)
    )

    financial = float(
        data.get("financial_risk", 30)
    )

    # --------------------------------------------------------
    # Validation
    # --------------------------------------------------------

    scores = {
        "competition": competition,
        "seasonal": seasonal,
        "supply": supply,
        "customer": customer,
        "financial": financial
    }

    for name, score in scores.items():

        if score < 0 or score > 100:

            raise ValueError(
                f"{name} risk must be between 0 and 100."
            )

    # --------------------------------------------------------
    # Weighted Risk Score
    # --------------------------------------------------------

    overall_risk = (
        competition * 0.20
        +
        seasonal * 0.15
        +
        supply * 0.20
        +
        customer * 0.20
        +
        financial * 0.25
    )

    overall_risk = round(
        overall_risk,
        2
    )

    # --------------------------------------------------------
    # Risk Level
    # --------------------------------------------------------

    if overall_risk <= 30:

        risk_level = "LOW"

    elif overall_risk <= 60:

        risk_level = "MEDIUM"

    else:

        risk_level = "HIGH"

    # --------------------------------------------------------
    # Individual Risk Levels
    # --------------------------------------------------------

    def get_level(score):

        if score <= 30:
            return "LOW"

        elif score <= 60:
            return "MEDIUM"

        else:
            return "HIGH"

    risk_levels = {

        "competition":
            get_level(competition),

        "seasonal":
            get_level(seasonal),

        "supply":
            get_level(supply),

        "customer":
            get_level(customer),

        "financial":
            get_level(financial)
    }

    # --------------------------------------------------------
    # Risk Mitigation
    # --------------------------------------------------------

    recommendations = []

    if competition > 60:

        recommendations.append(
            "Differentiate through quality, pricing, "
            "customer service or an underserved niche."
        )

    if seasonal > 60:

        recommendations.append(
            "Maintain working-capital reserves and "
            "diversify products during seasonal demand."
        )

    if supply > 60:

        recommendations.append(
            "Maintain multiple suppliers and avoid "
            "dependency on a single source."
        )

    if customer > 60:

        recommendations.append(
            "Diversify customer segments and sales channels."
        )

    if financial > 60:

        recommendations.append(
            "Reduce unnecessary expenses and maintain "
            "an emergency cash reserve."
        )

    if not recommendations:

        recommendations.append(
            "No major risk detected under the supplied "
            "assumptions. Continue periodic monitoring."
        )

    # --------------------------------------------------------
    # Return
    # --------------------------------------------------------

    return {

        "competition_risk":
            round(competition, 2),

        "seasonal_risk":
            round(seasonal, 2),

        "supply_risk":
            round(supply, 2),

        "customer_risk":
            round(customer, 2),

        "financial_risk":
            round(financial, 2),

        "risk_score":
            overall_risk,

        "risk_level":
            risk_level,

        "risk_levels":
            risk_levels,

        "recommendations":
            recommendations
    }


# ============================================================
# USER INPUT / TEST
# ============================================================

if __name__ == "__main__":

    print("\n==========================================")
    print("           GRAM-BIZ AI")
    print("         RISK ANALYSIS ENGINE")
    print("==========================================")

    try:

        print(
            "\nEnter risk scores from 0 to 100."
        )

        print(
            "0 = Very Low Risk"
        )

        print(
            "100 = Very High Risk"
        )

        competition = float(
            input(
                "\nCompetition Risk: "
            )
        )

        seasonal = float(
            input(
                "Seasonal Demand Risk: "
            )
        )

        supply = float(
            input(
                "Supply Chain Risk: "
            )
        )

        customer = float(
            input(
                "Customer Dependency Risk: "
            )
        )

        financial = float(
            input(
                "Financial Risk: "
            )
        )

        data = {

            "competition_score":
                competition,

            "seasonal_risk":
                seasonal,

            "supply_risk":
                supply,

            "customer_risk":
                customer,

            "financial_risk":
                financial
        }

        result = analyze_risk(data)

        # ----------------------------------------------------
        # OUTPUT
        # ----------------------------------------------------

        print("\n==========================================")
        print("             RISK REPORT")
        print("==========================================")

        print(
            f"\nCompetition Risk : "
            f"{result['competition_risk']}/100"
        )

        print(
            f"Seasonal Risk    : "
            f"{result['seasonal_risk']}/100"
        )

        print(
            f"Supply Risk      : "
            f"{result['supply_risk']}/100"
        )

        print(
            f"Customer Risk    : "
            f"{result['customer_risk']}/100"
        )

        print(
            f"Financial Risk   : "
            f"{result['financial_risk']}/100"
        )

        print("\n------------------------------------------")

        print(
            f"Overall Risk Score : "
            f"{result['risk_score']}/100"
        )

        print(
            f"Risk Level        : "
            f"{result['risk_level']}"
        )

        print("\n------------- MITIGATION ----------------")

        for recommendation in result[
            "recommendations"
        ]:

            print(
                f"• {recommendation}"
            )

        print("\n==========================================")

    except ValueError as error:

        print(
            f"\n❌ Input Error: {error}"
        )