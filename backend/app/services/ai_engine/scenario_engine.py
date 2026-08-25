def calculate_scenario(
    monthly_revenue, monthly_expenses, monthly_emi,
    revenue_change_percent=0, expense_change_percent=0
):
    """Calculate business performance under a changed scenario."""
    if monthly_revenue < 0:
        raise ValueError("Monthly revenue cannot be negative.")
    if monthly_expenses < 0:
        raise ValueError("Monthly expenses cannot be negative.")
    if monthly_emi < 0:
        raise ValueError("Loan EMI cannot be negative.")

    scenario_revenue = max(monthly_revenue * (1 + revenue_change_percent / 100), 0)
    scenario_expenses = max(monthly_expenses * (1 + expense_change_percent / 100), 0)

    operating_profit = scenario_revenue - scenario_expenses
    cash_after_emi = operating_profit - monthly_emi

    if scenario_revenue > 0:
        profit_margin = (cash_after_emi / scenario_revenue) * 100
    else:
        profit_margin = 0

    dscr = (operating_profit / monthly_emi) if monthly_emi > 0 else None

    if cash_after_emi > 0:
        status = "POSITIVE CASH FLOW"
    elif cash_after_emi == 0:
        status = "BREAK-EVEN"
    else:
        status = "NEGATIVE CASH FLOW"

    if cash_after_emi > 0 and dscr is not None and dscr >= 1.25:
        feasibility = "FEASIBLE"
    elif cash_after_emi >= 0:
        feasibility = "MARGINALLY FEASIBLE"
    else:
        feasibility = "NOT FEASIBLE"

    return {
        "revenue_change_percent": revenue_change_percent,
        "expense_change_percent": expense_change_percent,
        "monthly_revenue": round(scenario_revenue, 2),
        "monthly_expenses": round(scenario_expenses, 2),
        "operating_profit": round(operating_profit, 2),
        "monthly_emi": round(monthly_emi, 2),
        "cash_after_emi": round(cash_after_emi, 2),
        "profit_margin": round(profit_margin, 2),
        "dscr": round(dscr, 2) if dscr is not None else None,
        "status": status,
        "feasibility": feasibility
    }


def compare_scenarios(monthly_revenue, monthly_expenses, monthly_emi):
    """Generate base, best and worst case scenarios."""
    return {
        "base_case": calculate_scenario(monthly_revenue, monthly_expenses, monthly_emi),
        "best_case": calculate_scenario(
            monthly_revenue, monthly_expenses, monthly_emi,
            revenue_change_percent=20, expense_change_percent=-10
        ),
        "worst_case": calculate_scenario(
            monthly_revenue, monthly_expenses, monthly_emi,
            revenue_change_percent=-20, expense_change_percent=20
        )
    }
