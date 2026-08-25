def generate_advice(result):
    """Generate simple business advice from feasibility analysis results."""
    decision = result.get("decision", "UNKNOWN")
    overall_score = result.get("overall_score", 0)
    revenue = result.get("monthly_revenue", 0)
    expenses = result.get("monthly_expenses", 0)
    emi = result.get("monthly_emi", 0)
    cash_after_emi = result.get("monthly_profit_after_emi", 0)
    market_status = result.get("market_status", "UNKNOWN")
    risk_status = result.get("risk_status", "UNKNOWN")

    advice = []

    if decision == "HIGHLY FEASIBLE":
        advice.append("The proposed business appears financially and commercially feasible.")
    elif decision == "FEASIBLE WITH MODERATE RISK":
        advice.append("The business may be viable, but the financial and market assumptions should be reviewed carefully.")
    elif decision == "MARGINALLY FEASIBLE":
        advice.append("The business has limited feasibility. Consider reducing costs or increasing expected revenue.")
    else:
        advice.append("The current business plan does not appear financially feasible under the supplied assumptions.")

    if cash_after_emi < 0:
        advice.append("Warning: expected cash flow after loan EMI is negative. The loan structure should be reconsidered.")
    elif cash_after_emi < emi:
        advice.append("Loan repayment capacity is relatively weak. Maintain sufficient working capital.")
    else:
        advice.append("The projected business generates positive cash flow after EMI.")

    advice.append(f"Market assessment: {market_status}.")
    advice.append(f"Risk assessment: {risk_status}.")
    advice.append(f"Projected monthly revenue is ₹{revenue:,.2f}, while monthly expenses are ₹{expenses:,.2f}.")
    advice.append(f"Estimated monthly EMI is ₹{emi:,.2f}.")
    advice.append(f"Overall feasibility score is {overall_score:.2f}/100.")

    return advice


def chatbot_response(result, question):
    """Generate a response to a user's business question, using the feasibility result as context."""
    question = (question or "").lower()
    advice = generate_advice(result)

    if "feasible" in question or "viable" in question:
        return f"Decision: {result.get('decision')}\n\n" + "\n".join(f"• {item}" for item in advice)

    if "revenue" in question:
        return f"Your projected monthly revenue is ₹{result.get('monthly_revenue', 0):,.2f}."

    if "expense" in question or "cost" in question:
        return f"Your projected monthly expenses are ₹{result.get('monthly_expenses', 0):,.2f}."

    if "emi" in question or "loan" in question:
        return (
            f"Your estimated monthly EMI is ₹{result.get('monthly_emi', 0):,.2f}.\n\n"
            f"Cash remaining after EMI is ₹{result.get('monthly_profit_after_emi', 0):,.2f}."
        )

    if "market" in question or "demand" in question:
        return f"Market assessment: {result.get('market_status', 'UNKNOWN')}."

    if "risk" in question:
        return (
            f"Risk assessment: {result.get('risk_status', 'UNKNOWN')}.\n"
            f"Risk score: {result.get('risk_score', 0):.2f}/100."
        )

    return "Here is the current business assessment:\n\n" + "\n".join(f"• {item}" for item in advice)


def generate_chat_response(user_input):
    """
    Fallback for generic chat when no feasibility context is available yet
    (keeps /chatbot/ working even before an /assessment/ call has been made).
    """
    return (
        "I can answer questions about your business assessment (revenue, expenses, "
        "EMI, market, risk, feasibility) once you run an assessment. "
        f"You asked: \"{user_input}\" — try running /assessment/ first, or ask me "
        "about revenue, expenses, EMI, market, or risk once you have."
    )
