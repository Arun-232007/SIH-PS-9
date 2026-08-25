def get_scheme(project_cost: float):
    if project_cost <= 140000:
        return {
            "scheme_name": "Micro Finance Scheme",
            "interest_rate": 6.5,
            "tenure_years": 3,
            "moratorium_months": 3
        }
    return {
        "scheme_name": "Term Loan Scheme",
        "interest_rate": 8.0,
        "tenure_years": 7,
        "moratorium_months": 6
    }