# ============================================================
# GRAM-BIZ AI
# ADVANCED BUSINESS FEASIBILITY ENGINE
# ============================================================

from scenario_engine import compare_scenarios


def analyze_feasibility(data):
    """
    Gram-Biz AI
    Advanced Business Feasibility Engine

    Combines:
    1. Financial feasibility
    2. Market opportunity
    3. Risk analysis
    4. Loan repayment capacity
    5. What-if scenario analysis

    All calculations use the data supplied by the user.
    """

    # ==================================================
    # 1. INPUT DATA
    # ==================================================

    investment = float(
        data.get("investment", 0)
    )

    own_contribution = float(
        data.get("own_contribution", 0)
    )

    loan_amount = float(
        data.get("loan_amount", 0)
    )

    monthly_revenue = float(
        data.get("monthly_revenue", 0)
    )

    monthly_expenses = float(
        data.get("monthly_expenses", 0)
    )

    monthly_emi = float(
        data.get("monthly_emi", 0)
    )

    demand_score = float(
        data.get("demand_score", 0)
    )

    competition_score = float(
        data.get("competition_score", 0)
    )

    risk_score = float(
        data.get("risk_score", 0)
    )

    business_name = data.get(
        "business_name",
        "Proposed Business"
    )

    location = data.get(
        "location",
        "Not specified"
    )

    # ==================================================
    # 2. VALIDATION
    # ==================================================

    if investment <= 0:
        raise ValueError(
            "Investment must be greater than zero."
        )

    if own_contribution < 0:
        raise ValueError(
            "Own contribution cannot be negative."
        )

    if loan_amount < 0:
        raise ValueError(
            "Loan amount cannot be negative."
        )

    if monthly_revenue < 0:
        raise ValueError(
            "Revenue cannot be negative."
        )

    if monthly_expenses < 0:
        raise ValueError(
            "Expenses cannot be negative."
        )

    if monthly_emi < 0:
        raise ValueError(
            "EMI cannot be negative."
        )

    for name, score in [
        ("Demand score", demand_score),
        ("Competition score", competition_score),
        ("Risk score", risk_score)
    ]:

        if score < 0 or score > 100:
            raise ValueError(
                f"{name} must be between 0 and 100."
            )

    # ==================================================
    # 3. FUNDING ANALYSIS
    # ==================================================

    total_funding = (
        own_contribution
        +
        loan_amount
    )

    funding_difference = (
        total_funding
        -
        investment
    )

    if funding_difference >= 0:
        funding_status = "ADEQUATE"
    else:
        funding_status = "INSUFFICIENT"

    funding_coverage = (
        total_funding
        /
        investment
    ) * 100

    # ==================================================
    # 4. PROFITABILITY
    # ==================================================

    monthly_profit_before_emi = (
        monthly_revenue
        -
        monthly_expenses
    )

    monthly_profit_after_emi = (
        monthly_profit_before_emi
        -
        monthly_emi
    )

    annual_profit = (
        monthly_profit_after_emi
        * 12
    )

    # ==================================================
    # 5. PROFIT MARGIN
    # ==================================================

    if monthly_revenue > 0:

        profit_margin = (
            monthly_profit_after_emi
            /
            monthly_revenue
        ) * 100

    else:

        profit_margin = 0

    # ==================================================
    # 6. EXPENSE RATIO
    # ==================================================

    if monthly_revenue > 0:

        expense_ratio = (
            monthly_expenses
            /
            monthly_revenue
        ) * 100

    else:

        expense_ratio = 100

    # ==================================================
    # 7. BREAK-EVEN ANALYSIS
    # ==================================================

    if monthly_revenue > 0:

        variable_cost_ratio = (
            monthly_expenses
            /
            monthly_revenue
        )

    else:

        variable_cost_ratio = 1

    contribution_margin = (
        1
        -
        variable_cost_ratio
    )

    if contribution_margin > 0:

        break_even_revenue = (
            monthly_emi
            /
            contribution_margin
        )

    else:

        break_even_revenue = None

    # ==================================================
    # 8. PAYBACK PERIOD
    # ==================================================

    if monthly_profit_after_emi > 0:

        payback_months = (
            investment
            /
            monthly_profit_after_emi
        )

    else:

        payback_months = None

    # ==================================================
    # 9. ROI
    # ==================================================

    roi = (
        annual_profit
        /
        investment
    ) * 100

    # ==================================================
    # 10. DSCR
    # ==================================================

    if monthly_emi > 0:

        dscr = (
            monthly_profit_before_emi
            /
            monthly_emi
        )

    else:

        dscr = None

    # ==================================================
    # 11. LOAN BURDEN
    # ==================================================

    if monthly_revenue > 0:

        loan_burden_ratio = (
            monthly_emi
            /
            monthly_revenue
        ) * 100

    else:

        loan_burden_ratio = 100

    # ==================================================
    # 12. FINANCIAL SCORE
    # ==================================================

    financial_score = 0

    # --------------------------------------------------
    # Profitability - 25 points
    # --------------------------------------------------

    if monthly_profit_after_emi > 0:

        financial_score += 25

    elif monthly_profit_before_emi > 0:

        financial_score += 10

    # --------------------------------------------------
    # Profit Margin - 15 points
    # --------------------------------------------------

    if profit_margin >= 25:

        financial_score += 15

    elif profit_margin >= 15:

        financial_score += 12

    elif profit_margin >= 10:

        financial_score += 8

    elif profit_margin > 0:

        financial_score += 4

    # --------------------------------------------------
    # DSCR - 25 points
    # --------------------------------------------------

    if dscr is not None:

        if dscr >= 2:

            financial_score += 25

        elif dscr >= 1.5:

            financial_score += 20

        elif dscr >= 1.25:

            financial_score += 15

        elif dscr >= 1:

            financial_score += 8

    # --------------------------------------------------
    # ROI - 15 points
    # --------------------------------------------------

    if roi >= 25:

        financial_score += 15

    elif roi >= 15:

        financial_score += 12

    elif roi >= 10:

        financial_score += 8

    elif roi > 0:

        financial_score += 4

    # --------------------------------------------------
    # Funding - 10 points
    # --------------------------------------------------

    if funding_status == "ADEQUATE":

        financial_score += 10

    # --------------------------------------------------
    # Loan Burden - 10 points
    # --------------------------------------------------

    if loan_burden_ratio <= 20:

        financial_score += 10

    elif loan_burden_ratio <= 30:

        financial_score += 7

    elif loan_burden_ratio <= 40:

        financial_score += 4

    financial_score = min(
        financial_score,
        100
    )

    # ==================================================
    # 13. MARKET SCORE
    # ==================================================

    market_score = (
        demand_score * 0.60
        +
        competition_score * 0.40
    )

    # ==================================================
    # 14. RISK ADJUSTMENT
    # ==================================================

    risk_adjustment = (
        100
        -
        risk_score
    )

    # ==================================================
    # 15. OVERALL SCORE
    # ==================================================

    overall_score = (
        financial_score * 0.50
        +
        market_score * 0.30
        +
        risk_adjustment * 0.20
    )

    overall_score = max(
        0,
        min(
            overall_score,
            100
        )
    )

    # ==================================================
    # 16. FINANCIAL STATUS
    # ==================================================

    if monthly_profit_after_emi > 0:

        financial_status = (
            "POSITIVE CASH FLOW"
        )

    elif monthly_profit_after_emi == 0:

        financial_status = (
            "BREAK-EVEN"
        )

    else:

        financial_status = (
            "NEGATIVE CASH FLOW"
        )

    # ==================================================
    # 17. MARKET STATUS
    # ==================================================

    if market_score >= 75:

        market_status = (
            "STRONG MARKET OPPORTUNITY"
        )

    elif market_score >= 60:

        market_status = (
            "MODERATE MARKET OPPORTUNITY"
        )

    elif market_score >= 40:

        market_status = (
            "WEAK MARKET OPPORTUNITY"
        )

    else:

        market_status = (
            "POOR MARKET OPPORTUNITY"
        )

    # ==================================================
    # 18. RISK STATUS
    # ==================================================

    if risk_score <= 25:

        risk_status = "LOW RISK"

    elif risk_score <= 50:

        risk_status = "MODERATE RISK"

    elif risk_score <= 75:

        risk_status = "HIGH RISK"

    else:

        risk_status = "VERY HIGH RISK"

    # ==================================================
    # 19. FINAL DECISION
    # ==================================================

    if (
        overall_score >= 75
        and monthly_profit_after_emi > 0
        and funding_status == "ADEQUATE"
    ):

        decision = "HIGHLY FEASIBLE"

        recommendation = (
            "Business appears financially and "
            "commercially suitable. Proceed with "
            "detailed planning."
        )

    elif (
        overall_score >= 60
        and monthly_profit_after_emi >= 0
    ):

        decision = (
            "FEASIBLE WITH MODERATE RISK"
        )

        recommendation = (
            "Business may be viable, but market, "
            "cost and repayment assumptions "
            "should be reviewed."
        )

    elif overall_score >= 40:

        decision = "MARGINALLY FEASIBLE"

        recommendation = (
            "Improve pricing, reduce costs, "
            "increase demand or reconsider "
            "the project size before applying."
        )

    else:

        decision = "NOT FEASIBLE"

        recommendation = (
            "Current assumptions indicate "
            "significant financial or market "
            "risk. Rework the business plan."
        )

    # ==================================================
    # 20. WARNINGS
    # ==================================================

    warnings = []

    if monthly_profit_after_emi < 0:

        warnings.append(
            "Business may not generate enough "
            "cash to cover the loan EMI."
        )

    if dscr is not None and dscr < 1.25:

        warnings.append(
            "Debt repayment coverage is weak."
        )

    if profit_margin < 10:

        warnings.append(
            "Net profit margin is relatively low."
        )

    if risk_score > 60:

        warnings.append(
            "Business has significant identified risks."
        )

    if market_score < 50:

        warnings.append(
            "Market opportunity appears weak."
        )

    if funding_status == "INSUFFICIENT":

        warnings.append(
            "Available funding is insufficient "
            "for the proposed investment."
        )

    if not warnings:

        warnings.append(
            "No major financial warning detected "
            "under the supplied assumptions."
        )

    # ==================================================
    # 21. SCENARIO ANALYSIS
    # ==================================================

    scenarios = compare_scenarios(
        monthly_revenue,
        monthly_expenses,
        monthly_emi
    )

    # ==================================================
    # 22. RETURN RESULT
    # ==================================================

    return {

        # --------------------------------------------------
        # Basic information
        # --------------------------------------------------

        "business_name":
            business_name,

        "location":
            location,

        # --------------------------------------------------
        # Funding
        # --------------------------------------------------

        "investment":
            round(
                investment,
                2
            ),

        "own_contribution":
            round(
                own_contribution,
                2
            ),

        "loan_amount":
            round(
                loan_amount,
                2
            ),

        "total_funding":
            round(
                total_funding,
                2
            ),

        "funding_difference":
            round(
                funding_difference,
                2
            ),

        "funding_coverage":
            round(
                funding_coverage,
                2
            ),

        "funding_status":
            funding_status,

        # --------------------------------------------------
        # Revenue / Expenses
        # --------------------------------------------------

        "monthly_revenue":
            round(
                monthly_revenue,
                2
            ),

        "monthly_expenses":
            round(
                monthly_expenses,
                2
            ),

        "expense_ratio":
            round(
                expense_ratio,
                2
            ),

        # --------------------------------------------------
        # Profit
        # --------------------------------------------------

        "monthly_profit_before_emi":
            round(
                monthly_profit_before_emi,
                2
            ),

        "monthly_emi":
            round(
                monthly_emi,
                2
            ),

        "monthly_profit_after_emi":
            round(
                monthly_profit_after_emi,
                2
            ),

        "annual_profit":
            round(
                annual_profit,
                2
            ),

        "financial_status":
            financial_status,

        # --------------------------------------------------
        # Financial Metrics
        # --------------------------------------------------

        "profit_margin":
            round(
                profit_margin,
                2
            ),

        "break_even_revenue":
            round(
                break_even_revenue,
                2
            )
            if break_even_revenue is not None
            else None,

        "payback_months":
            round(
                payback_months,
                2
            )
            if payback_months is not None
            else None,

        "roi":
            round(
                roi,
                2
            ),

        "dscr":
            round(
                dscr,
                2
            )
            if dscr is not None
            else None,

        "loan_burden_ratio":
            round(
                loan_burden_ratio,
                2
            ),

        # --------------------------------------------------
        # Scores
        # --------------------------------------------------

        "financial_score":
            round(
                financial_score,
                2
            ),

        "demand_score":
            round(
                demand_score,
                2
            ),

        "competition_score":
            round(
                competition_score,
                2
            ),

        "market_score":
            round(
                market_score,
                2
            ),

        "risk_score":
            round(
                risk_score,
                2
            ),

        "risk_adjustment":
            round(
                risk_adjustment,
                2
            ),

        "overall_score":
            round(
                overall_score,
                2
            ),

        # --------------------------------------------------
        # Status
        # --------------------------------------------------

        "market_status":
            market_status,

        "risk_status":
            risk_status,

        "decision":
            decision,

        "recommendation":
            recommendation,

        # --------------------------------------------------
        # Warnings
        # --------------------------------------------------

        "warnings":
            warnings,

        # --------------------------------------------------
        # SCENARIOS
        # --------------------------------------------------

        "scenarios":
            scenarios
    }


# ============================================================
# TESTING
# ============================================================

if __name__ == "__main__":

    print("\n")
    print("==========================================")
    print("          GRAM-BIZ AI")
    print("       FEASIBILITY REPORT")
    print("==========================================")

    # --------------------------------------------------------
    # IMPORTANT:
    # This test data is ONLY for testing feasibility.py.
    #
    # Your main.py should send actual user data here.
    # --------------------------------------------------------

    test_data = {

        "business_name":
            "Rural Hotel",

        "location":
            "Kovilpalayam, Coimbatore",

        "investment":
            1000000,

        "own_contribution":
            100000,

        "loan_amount":
            900000,

        "monthly_revenue":
            304000,

        "monthly_expenses":
            20000,

        "monthly_emi":
            14027.59,

        "demand_score":
            80,

        "competition_score":
            40,

        "risk_score":
            50
    }

    try:

        result = analyze_feasibility(
            test_data
        )

        # ==================================================
        # BASIC
        # ==================================================

        print(
            f"\nBusiness           : "
            f"{result['business_name']}"
        )

        print(
            f"Location           : "
            f"{result['location']}"
        )

        # ==================================================
        # FUNDING
        # ==================================================

        print(
            "\n--------------- FUNDING ----------------"
        )

        print(
            f"Investment         : "
            f"₹{result['investment']:,.2f}"
        )

        print(
            f"Own Contribution   : "
            f"₹{result['own_contribution']:,.2f}"
        )

        print(
            f"Loan Amount        : "
            f"₹{result['loan_amount']:,.2f}"
        )

        print(
            f"Total Funding      : "
            f"₹{result['total_funding']:,.2f}"
        )

        print(
            f"Funding Status     : "
            f"{result['funding_status']}"
        )

        # ==================================================
        # FINANCIAL
        # ==================================================

        print(
            "\n------------- FINANCIAL ----------------"
        )

        print(
            f"Monthly Revenue    : "
            f"₹{result['monthly_revenue']:,.2f}"
        )

        print(
            f"Monthly Expenses   : "
            f"₹{result['monthly_expenses']:,.2f}"
        )

        print(
            f"Operating Profit   : "
            f"₹{result['monthly_profit_before_emi']:,.2f}"
        )

        print(
            f"Loan EMI           : "
            f"₹{result['monthly_emi']:,.2f}"
        )

        print(
            f"Cash After EMI     : "
            f"₹{result['monthly_profit_after_emi']:,.2f}"
        )

        print(
            f"Annual Profit      : "
            f"₹{result['annual_profit']:,.2f}"
        )

        print(
            f"Profit Margin      : "
            f"{result['profit_margin']:.2f}%"
        )

        print(
            f"ROI                : "
            f"{result['roi']:.2f}%"
        )

        if result["dscr"] is not None:

            print(
                f"DSCR               : "
                f"{result['dscr']:.2f}"
            )

        else:

            print(
                "DSCR               : N/A"
            )

        if result["break_even_revenue"] is not None:

            print(
                f"Break-even Revenue : "
                f"₹{result['break_even_revenue']:,.2f}"
            )

        else:

            print(
                "Break-even Revenue : N/A"
            )

        # ==================================================
        # MARKET
        # ==================================================

        print(
            "\n--------------- MARKET -----------------"
        )

        print(
            f"Demand Score       : "
            f"{result['demand_score']:.2f}/100"
        )

        print(
            f"Competition Score  : "
            f"{result['competition_score']:.2f}/100"
        )

        print(
            f"Market Score       : "
            f"{result['market_score']:.2f}/100"
        )

        print(
            f"Market Status      : "
            f"{result['market_status']}"
        )

        # ==================================================
        # RISK
        # ==================================================

        print(
            "\n---------------- RISK ------------------"
        )

        print(
            f"Risk Score         : "
            f"{result['risk_score']:.2f}/100"
        )

        print(
            f"Risk Status        : "
            f"{result['risk_status']}"
        )

        # ==================================================
        # SCENARIO ANALYSIS
        # ==================================================

        print(
            "\n=========================================="
        )

        print(
            "          SCENARIO ANALYSIS"
        )

        print(
            "=========================================="
        )

        for name, scenario in result[
            "scenarios"
        ].items():

            print(
                f"\n--- {name} ---"
            )

            print(
                f"Revenue          : "
                f"₹{scenario['monthly_revenue']:,.2f}"
            )

            print(
                f"Expenses         : "
                f"₹{scenario['monthly_expenses']:,.2f}"
            )

            print(
                f"Operating Profit : "
                f"₹{scenario['operating_profit']:,.2f}"
            )

            print(
                f"Loan EMI         : "
                f"₹{scenario['monthly_emi']:,.2f}"
            )

            print(
                f"Cash After EMI   : "
                f"₹{scenario['cash_after_emi']:,.2f}"
            )

            print(
                f"Profit Margin    : "
                f"{scenario['profit_margin']:.2f}%"
            )

            if scenario["dscr"] is not None:

                print(
                    f"DSCR             : "
                    f"{scenario['dscr']:.2f}"
                )

            else:

                print(
                    "DSCR             : N/A"
                )

            print(
                f"Cash Flow Status : "
                f"{scenario['status']}"
            )

            print(
                f"Feasibility      : "
                f"{scenario['feasibility']}"
            )

        # ==================================================
        # FINAL RESULT
        # ==================================================

        print(
            "\n=========================================="
        )

        print(
            "             FINAL RESULT"
        )

        print(
            "=========================================="
        )

        print(
            f"\nFinancial Score    : "
            f"{result['financial_score']:.2f}/100"
        )

        print(
            f"Overall Score      : "
            f"{result['overall_score']:.2f}/100"
        )

        print(
            f"Financial Status   : "
            f"{result['financial_status']}"
        )

        print(
            f"Decision           : "
            f"{result['decision']}"
        )

        print(
            f"Recommendation     : "
            f"{result['recommendation']}"
        )

        # ==================================================
        # WARNINGS
        # ==================================================

        print(
            "\n---------------- WARNINGS ---------------"
        )

        for warning in result[
            "warnings"
        ]:

            print(
                f"⚠ {warning}"
            )

        print(
            "\n=========================================="
        )

        print(
            "       FEASIBILITY ANALYSIS COMPLETE"
        )

        print(
            "=========================================="
        )

    except ValueError as error:

        print(
            f"\n❌ Error: {error}"
        )