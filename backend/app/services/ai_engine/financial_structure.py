from app.services.ai_engine.loan_engine import calculate_loan_details


def calculate_financial_structure(margin_capital):
    """
    Calculate project cost, loan amount and applicable government
    financing scheme based on available margin capital.
    Matches problem-statement spec:
      - Margin capital = 10% of project cost
      - Loan = 90% of project cost
      - <=1.4L -> Micro Finance Scheme (6.5%, 3yr, 3mo moratorium)
      - >1.4L (up to 50L) -> Term Loan Scheme (8%, 7yr, 6mo moratorium)
    """
    margin_percentage = 0.10
    loan_percentage = 0.90

    calculated_project_cost = margin_capital / margin_percentage

    if calculated_project_cost <= 140000:
        scheme = "Micro Finance Scheme"
        interest_rate = 6.5
        tenure_years = 3
        moratorium_months = 3
        maximum_project_cost = 140000
        maximum_loan = 125000
    elif calculated_project_cost <= 5000000:
        scheme = "Term Loan Scheme"
        interest_rate = 8.0
        tenure_years = 7
        moratorium_months = 6
        maximum_project_cost = 5000000
        maximum_loan = 4500000
    else:
        scheme = "Above Scheme Limit"
        interest_rate = None
        tenure_years = None
        moratorium_months = None
        maximum_project_cost = 5000000
        maximum_loan = 4500000

    eligible_project_cost = min(calculated_project_cost, maximum_project_cost)
    calculated_loan = eligible_project_cost * loan_percentage
    eligible_loan = min(calculated_loan, maximum_loan)

    result = {
        "available_margin": round(margin_capital, 2),
        "calculated_project_cost": round(calculated_project_cost, 2),
        "project_cost": round(eligible_project_cost, 2),
        "loan_amount": round(eligible_loan, 2),
        "scheme_name": scheme,
        "interest_rate": interest_rate,
        "tenure_years": tenure_years,
        "moratorium_months": moratorium_months,
        "emi": 0.0,
        "total_interest": 0.0,
        "total_repayment": 0.0
    }

    if eligible_loan > 0 and interest_rate is not None:
        loan_details = calculate_loan_details(
            eligible_loan, interest_rate, tenure_years, moratorium_months
        )
        result["emi"] = loan_details["emi"]
        result["total_interest"] = loan_details["total_interest"]
        result["total_repayment"] = loan_details["total_repayment"]

    return result
