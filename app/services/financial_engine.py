def calculate_financials(margin_capital: float):
    project_cost = round(margin_capital / 0.10, 2)
    loan_amount = round(project_cost * 0.90, 2)
    return project_cost, loan_amount