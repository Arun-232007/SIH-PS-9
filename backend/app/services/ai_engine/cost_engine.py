def calculate_costs(expenses):
    """Calculate total monthly and annual business expenses."""
    for name, amount in expenses.items():
        if amount < 0:
            raise ValueError(f"{name} cannot be negative.")

    total_expenses = sum(expenses.values())

    return {
        "expenses": expenses,
        "total_monthly_expenses": round(total_expenses, 2),
        "total_annual_expenses": round(total_expenses * 12, 2)
    }


def calculate_profit(monthly_revenue, total_monthly_expenses):
    """Calculate monthly and annual operating profit."""
    operating_profit = monthly_revenue - total_monthly_expenses

    if monthly_revenue > 0:
        profit_margin = (operating_profit / monthly_revenue) * 100
    else:
        profit_margin = 0

    return {
        "monthly_profit": round(operating_profit, 2),
        "annual_profit": round(operating_profit * 12, 2),
        "profit_margin": round(profit_margin, 2)
    }


def calculate_cash_after_loan(operating_profit, loan_emi):
    """Calculate cash remaining after monthly loan repayment."""
    return round(operating_profit - loan_emi, 2)


def get_financial_status(cash_after_loan):
    if cash_after_loan > 0:
        return "POSITIVE CASH FLOW"
    elif cash_after_loan == 0:
        return "BREAK-EVEN"
    else:
        return "NEGATIVE CASH FLOW"
