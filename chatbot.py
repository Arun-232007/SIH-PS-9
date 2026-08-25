# ============================================================
# GRAM-BIZ AI
# BUSINESS ADVISORY CHATBOT
# ============================================================

def generate_advice(result):
    """
    Generate simple business advice from
    feasibility analysis results.
    """

    decision = result.get("decision", "UNKNOWN")
    overall_score = result.get("overall_score", 0)

    revenue = result.get("monthly_revenue", 0)
    expenses = result.get("monthly_expenses", 0)
    emi = result.get("monthly_emi", 0)

    cash_after_emi = result.get(
        "monthly_profit_after_emi", 0
    )

    market_status = result.get(
        "market_status",
        "UNKNOWN"
    )

    risk_status = result.get(
        "risk_status",
        "UNKNOWN"
    )

    advice = []

    # ------------------------------------------------
    # OVERALL DECISION
    # ------------------------------------------------

    if decision == "HIGHLY FEASIBLE":

        advice.append(
            "The proposed business appears financially "
            "and commercially feasible."
        )

    elif decision == "FEASIBLE WITH MODERATE RISK":

        advice.append(
            "The business may be viable, but the "
            "financial and market assumptions should "
            "be reviewed carefully."
        )

    elif decision == "MARGINALLY FEASIBLE":

        advice.append(
            "The business has limited feasibility. "
            "Consider reducing costs or increasing "
            "expected revenue."
        )

    else:

        advice.append(
            "The current business plan does not appear "
            "financially feasible under the supplied assumptions."
        )

    # ------------------------------------------------
    # CASH FLOW
    # ------------------------------------------------

    if cash_after_emi < 0:

        advice.append(
            "Warning: expected cash flow after loan EMI "
            "is negative. The loan structure should be "
            "reconsidered."
        )

    elif cash_after_emi < emi:

        advice.append(
            "Loan repayment capacity is relatively weak. "
            "Maintain sufficient working capital."
        )

    else:

        advice.append(
            "The projected business generates positive "
            "cash flow after EMI."
        )

    # ------------------------------------------------
    # MARKET
    # ------------------------------------------------

    advice.append(
        f"Market assessment: {market_status}."
    )

    # ------------------------------------------------
    # RISK
    # ------------------------------------------------

    advice.append(
        f"Risk assessment: {risk_status}."
    )

    # ------------------------------------------------
    # FINANCIAL SUMMARY
    # ------------------------------------------------

    advice.append(
        f"Projected monthly revenue is "
        f"₹{revenue:,.2f}, while monthly expenses are "
        f"₹{expenses:,.2f}."
    )

    advice.append(
        f"Estimated monthly EMI is ₹{emi:,.2f}."
    )

    advice.append(
        f"Overall feasibility score is "
        f"{overall_score:.2f}/100."
    )

    return advice


def chatbot_response(result, question):
    """
    Generate a response to a user's business question.
    """

    question = question.lower()

    advice = generate_advice(result)

    # ------------------------------------------------
    # QUESTION HANDLING
    # ------------------------------------------------

    if "feasible" in question or "viable" in question:

        return (
            f"Decision: {result.get('decision')}\n\n"
            + "\n".join(
                f"• {item}" for item in advice
            )
        )

    if "revenue" in question:

        return (
            f"Your projected monthly revenue is "
            f"₹{result.get('monthly_revenue', 0):,.2f}."
        )

    if "expense" in question or "cost" in question:

        return (
            f"Your projected monthly expenses are "
            f"₹{result.get('monthly_expenses', 0):,.2f}."
        )

    if "emi" in question or "loan" in question:

        return (
            f"Your estimated monthly EMI is "
            f"₹{result.get('monthly_emi', 0):,.2f}.\n\n"
            f"Cash remaining after EMI is "
            f"₹{result.get('monthly_profit_after_emi', 0):,.2f}."
        )

    if "market" in question or "demand" in question:

        return (
            f"Market assessment: "
            f"{result.get('market_status', 'UNKNOWN')}."
        )

    if "risk" in question:

        return (
            f"Risk assessment: "
            f"{result.get('risk_status', 'UNKNOWN')}.\n"
            f"Risk score: "
            f"{result.get('risk_score', 0):.2f}/100."
        )

    # ------------------------------------------------
    # DEFAULT RESPONSE
    # ------------------------------------------------

    return (
        "Here is the current business assessment:\n\n"
        + "\n".join(
            f"• {item}" for item in advice
        )
    )


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    test_result = {

        "decision":
            "HIGHLY FEASIBLE",

        "overall_score":
            87.20,

        "monthly_revenue":
            50000,

        "monthly_expenses":
            30000,

        "monthly_emi":
            14028,

        "monthly_profit_after_emi":
            5972,

        "market_status":
            "STRONG MARKET OPPORTUNITY",

        "risk_status":
            "LOW RISK",

        "risk_score":
            25
    }

    print("\n========================================")
    print("          GRAM-BIZ AI CHATBOT")
    print("========================================")

    while True:

        question = input(
            "\nAsk your business question "
            "(type 'exit' to stop): "
        )

        if question.lower() == "exit":
            break

        response = chatbot_response(
            test_result,
            question
        )

        print("\nGRAM-BIZ AI:")
        print(response)