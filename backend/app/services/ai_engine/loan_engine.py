def calculate_emi(principal, annual_interest_rate, tenure_years):
    """Calculate monthly EMI using reducing-balance method."""
    monthly_rate = annual_interest_rate / (12 * 100)
    total_months = tenure_years * 12

    if monthly_rate == 0:
        return principal / total_months

    emi = (
        principal * monthly_rate * (1 + monthly_rate) ** total_months
        / ((1 + monthly_rate) ** total_months - 1)
    )
    return emi


def calculate_loan_details(loan_amount, annual_interest_rate, tenure_years, moratorium_months):
    """Calculate EMI, total interest and total repayment."""
    emi = calculate_emi(loan_amount, annual_interest_rate, tenure_years)
    total_months = tenure_years * 12
    total_repayment = emi * total_months
    total_interest = total_repayment - loan_amount

    return {
        "loan_amount": loan_amount,
        "interest_rate": annual_interest_rate,
        "tenure_years": tenure_years,
        "moratorium_months": moratorium_months,
        "emi": round(emi, 2),
        "total_interest": round(total_interest, 2),
        "total_repayment": round(total_repayment, 2)
    }
