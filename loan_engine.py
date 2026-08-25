def calculate_emi(principal, annual_interest_rate, tenure_years):
    """
    Calculate monthly EMI using reducing-balance method.
    """

    monthly_rate = annual_interest_rate / (12 * 100)
    total_months = tenure_years * 12

    if monthly_rate == 0:
        return principal / total_months

    emi = (
        principal
        * monthly_rate
        * (1 + monthly_rate) ** total_months
        / (
            (1 + monthly_rate) ** total_months - 1
        )
    )

    return emi


def calculate_loan_details(
    loan_amount,
    annual_interest_rate,
    tenure_years,
    moratorium_months
):
    """
    Calculate EMI, total interest and total repayment.

    Note:
    Moratorium is currently stored as part of the loan details.
    Detailed moratorium treatment will be added in the
    repayment schedule module.
    """

    emi = calculate_emi(
        loan_amount,
        annual_interest_rate,
        tenure_years
    )

    total_months = tenure_years * 12

    total_repayment = emi * total_months

    total_interest = total_repayment - loan_amount

    return {
        "loan_amount": loan_amount,
        "interest_rate": annual_interest_rate,
        "tenure_years": tenure_years,
        "moratorium_months": moratorium_months,
        "emi": emi,
        "total_interest": total_interest,
        "total_repayment": total_repayment
    }
# ==================================================
# TEST / USER INPUT
# ==================================================

if __name__ == "__main__":

    print("\n==========================================")
    print("        GRAM-BIZ AI LOAN ENGINE")
    print("==========================================")

    try:

        loan_amount = float(
            input("Enter Loan Amount (₹): ")
        )

        interest_rate = float(
            input("Enter Annual Interest Rate (%): ")
        )

        tenure_years = int(
            input("Enter Tenure (years): ")
        )

        moratorium_months = int(
            input("Enter Moratorium (months): ")
        )

        result = calculate_loan_details(
            loan_amount,
            interest_rate,
            tenure_years,
            moratorium_months
        )

        print("\n==========================================")
        print("             LOAN DETAILS")
        print("==========================================")

        print(
            f"Loan Amount       : "
            f"₹{result['loan_amount']:,.2f}"
        )

        print(
            f"Interest Rate     : "
            f"{result['interest_rate']:.2f}%"
        )

        print(
            f"Tenure            : "
            f"{result['tenure_years']} years"
        )

        print(
            f"Moratorium        : "
            f"{result['moratorium_months']} months"
        )

        print(
            f"Monthly EMI       : "
            f"₹{result['emi']:,.2f}"
        )

        print(
            f"Total Interest    : "
            f"₹{result['total_interest']:,.2f}"
        )

        print(
            f"Total Repayment   : "
            f"₹{result['total_repayment']:,.2f}"
        )

        print("\n==========================================")

    except ValueError as error:

        print(f"\n❌ Invalid input: {error}")