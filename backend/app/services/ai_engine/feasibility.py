from app.services.ai_engine.scenario_engine import compare_scenarios


def analyze_feasibility(data):
    """
    Gram-Biz AI Advanced Business Feasibility Engine.
    Combines financial feasibility, market opportunity, risk analysis,
    loan repayment capacity, and what-if scenario analysis.
    """
    investment = float(data.get("investment", 0))
    own_contribution = float(data.get("own_contribution", 0))
    loan_amount = float(data.get("loan_amount", 0))
    monthly_revenue = float(data.get("monthly_revenue", 0))
    monthly_expenses = float(data.get("monthly_expenses", 0))
    monthly_emi = float(data.get("monthly_emi", 0))
    demand_score = float(data.get("demand_score", 0))
    competition_score = float(data.get("competition_score", 0))
    risk_score = float(data.get("risk_score", 0))
    business_name = data.get("business_name", "Proposed Business")
    location = data.get("location", "Not specified")

    if investment <= 0:
        raise ValueError("Investment must be greater than zero.")
    if own_contribution < 0:
        raise ValueError("Own contribution cannot be negative.")
    if loan_amount < 0:
        raise ValueError("Loan amount cannot be negative.")
    if monthly_revenue < 0:
        raise ValueError("Revenue cannot be negative.")
    if monthly_expenses < 0:
        raise ValueError("Expenses cannot be negative.")
    if monthly_emi < 0:
        raise ValueError("EMI cannot be negative.")
    for name, score in [("Demand score", demand_score), ("Competition score", competition_score), ("Risk score", risk_score)]:
        if score < 0 or score > 100:
            raise ValueError(f"{name} must be between 0 and 100.")

    total_funding = own_contribution + loan_amount
    funding_difference = total_funding - investment
    funding_status = "ADEQUATE" if funding_difference >= 0 else "INSUFFICIENT"
    funding_coverage = (total_funding / investment) * 100

    monthly_profit_before_emi = monthly_revenue - monthly_expenses
    monthly_profit_after_emi = monthly_profit_before_emi - monthly_emi
    annual_profit = monthly_profit_after_emi * 12

    profit_margin = (monthly_profit_after_emi / monthly_revenue) * 100 if monthly_revenue > 0 else 0
    expense_ratio = (monthly_expenses / monthly_revenue) * 100 if monthly_revenue > 0 else 100

    variable_cost_ratio = (monthly_expenses / monthly_revenue) if monthly_revenue > 0 else 1
    contribution_margin = 1 - variable_cost_ratio
    break_even_revenue = (monthly_emi / contribution_margin) if contribution_margin > 0 else None

    payback_months = (investment / monthly_profit_after_emi) if monthly_profit_after_emi > 0 else None
    roi = (annual_profit / investment) * 100
    dscr = (monthly_profit_before_emi / monthly_emi) if monthly_emi > 0 else None
    loan_burden_ratio = (monthly_emi / monthly_revenue) * 100 if monthly_revenue > 0 else 100

    # Financial score (100 pts)
    financial_score = 0
    if monthly_profit_after_emi > 0:
        financial_score += 25
    elif monthly_profit_before_emi > 0:
        financial_score += 10

    if profit_margin >= 25:
        financial_score += 15
    elif profit_margin >= 15:
        financial_score += 12
    elif profit_margin >= 10:
        financial_score += 8
    elif profit_margin > 0:
        financial_score += 4

    if dscr is not None:
        if dscr >= 2:
            financial_score += 25
        elif dscr >= 1.5:
            financial_score += 20
        elif dscr >= 1.25:
            financial_score += 15
        elif dscr >= 1:
            financial_score += 8

    if roi >= 25:
        financial_score += 15
    elif roi >= 15:
        financial_score += 12
    elif roi >= 10:
        financial_score += 8
    elif roi > 0:
        financial_score += 4

    if funding_status == "ADEQUATE":
        financial_score += 10

    if loan_burden_ratio <= 20:
        financial_score += 10
    elif loan_burden_ratio <= 30:
        financial_score += 7
    elif loan_burden_ratio <= 40:
        financial_score += 4

    financial_score = min(financial_score, 100)

    market_score = demand_score * 0.60 + competition_score * 0.40
    risk_adjustment = 100 - risk_score
    overall_score = max(0, min(financial_score * 0.50 + market_score * 0.30 + risk_adjustment * 0.20, 100))

    if monthly_profit_after_emi > 0:
        financial_status = "POSITIVE CASH FLOW"
    elif monthly_profit_after_emi == 0:
        financial_status = "BREAK-EVEN"
    else:
        financial_status = "NEGATIVE CASH FLOW"

    if market_score >= 75:
        market_status = "STRONG MARKET OPPORTUNITY"
    elif market_score >= 60:
        market_status = "MODERATE MARKET OPPORTUNITY"
    elif market_score >= 40:
        market_status = "WEAK MARKET OPPORTUNITY"
    else:
        market_status = "POOR MARKET OPPORTUNITY"

    if risk_score <= 25:
        risk_status = "LOW RISK"
    elif risk_score <= 50:
        risk_status = "MODERATE RISK"
    elif risk_score <= 75:
        risk_status = "HIGH RISK"
    else:
        risk_status = "VERY HIGH RISK"

    if overall_score >= 75 and monthly_profit_after_emi > 0 and funding_status == "ADEQUATE":
        decision = "HIGHLY FEASIBLE"
        recommendation = "Business appears financially and commercially suitable. Proceed with detailed planning."
    elif overall_score >= 60 and monthly_profit_after_emi >= 0:
        decision = "FEASIBLE WITH MODERATE RISK"
        recommendation = "Business may be viable, but market, cost and repayment assumptions should be reviewed."
    elif overall_score >= 40:
        decision = "MARGINALLY FEASIBLE"
        recommendation = "Improve pricing, reduce costs, increase demand or reconsider the project size before applying."
    else:
        decision = "NOT FEASIBLE"
        recommendation = "Current assumptions indicate significant financial or market risk. Rework the business plan."

    warnings = []
    if monthly_profit_after_emi < 0:
        warnings.append("Business may not generate enough cash to cover the loan EMI.")
    if dscr is not None and dscr < 1.25:
        warnings.append("Debt repayment coverage is weak.")
    if profit_margin < 10:
        warnings.append("Net profit margin is relatively low.")
    if risk_score > 60:
        warnings.append("Business has significant identified risks.")
    if market_score < 50:
        warnings.append("Market opportunity appears weak.")
    if funding_status == "INSUFFICIENT":
        warnings.append("Available funding is insufficient for the proposed investment.")
    if not warnings:
        warnings.append("No major financial warning detected under the supplied assumptions.")

    scenarios = compare_scenarios(monthly_revenue, monthly_expenses, monthly_emi)

    return {
        "business_name": business_name,
        "location": location,
        "investment": round(investment, 2),
        "own_contribution": round(own_contribution, 2),
        "loan_amount": round(loan_amount, 2),
        "total_funding": round(total_funding, 2),
        "funding_difference": round(funding_difference, 2),
        "funding_coverage": round(funding_coverage, 2),
        "funding_status": funding_status,
        "monthly_revenue": round(monthly_revenue, 2),
        "monthly_expenses": round(monthly_expenses, 2),
        "expense_ratio": round(expense_ratio, 2),
        "monthly_profit_before_emi": round(monthly_profit_before_emi, 2),
        "monthly_emi": round(monthly_emi, 2),
        "monthly_profit_after_emi": round(monthly_profit_after_emi, 2),
        "annual_profit": round(annual_profit, 2),
        "financial_status": financial_status,
        "profit_margin": round(profit_margin, 2),
        "break_even_revenue": round(break_even_revenue, 2) if break_even_revenue is not None else None,
        "payback_months": round(payback_months, 2) if payback_months is not None else None,
        "roi": round(roi, 2),
        "dscr": round(dscr, 2) if dscr is not None else None,
        "loan_burden_ratio": round(loan_burden_ratio, 2),
        "financial_score": round(financial_score, 2),
        "demand_score": round(demand_score, 2),
        "competition_score": round(competition_score, 2),
        "market_score": round(market_score, 2),
        "risk_score": round(risk_score, 2),
        "risk_adjustment": round(risk_adjustment, 2),
        "overall_score": round(overall_score, 2),
        "market_status": market_status,
        "risk_status": risk_status,
        "decision": decision,
        "recommendation": recommendation,
        "warnings": warnings,
        "scenarios": scenarios
    }
