from loan_engine import calculate_loan_details


def calculate_financial_structure(margin_capital):
    """
    Calculate project cost, loan amount and applicable
    government financing scheme based on available margin.
    """

    # --------------------------------------------------
    # FUNDING STRUCTURE
    # --------------------------------------------------

    margin_percentage = 0.10
    loan_percentage = 0.90

    # Calculate theoretical project cost
    calculated_project_cost = (
        margin_capital / margin_percentage
    )

    # --------------------------------------------------
    # SCHEME SELECTION
    # --------------------------------------------------

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

    # --------------------------------------------------
    # APPLY PROJECT LIMIT
    # --------------------------------------------------

    eligible_project_cost = min(
        calculated_project_cost,
        maximum_project_cost
    )

    # --------------------------------------------------
    # CALCULATE LOAN
    # --------------------------------------------------

    calculated_loan = (
        eligible_project_cost * loan_percentage
    )

    eligible_loan = min(
        calculated_loan,
        maximum_loan
    )

    # --------------------------------------------------
    # CREATE RESULT
    # --------------------------------------------------

    result = {

        "available_margin": margin_capital,

        "calculated_project_cost":
            calculated_project_cost,

        "eligible_project_cost":
            eligible_project_cost,

        "eligible_loan":
            eligible_loan,

        "scheme":
            scheme,

        "interest_rate":
            interest_rate,

        "tenure_years":
            tenure_years,

        "moratorium_months":
            moratorium_months
    }

    # --------------------------------------------------
    # CONNECT LOAN ENGINE
    # --------------------------------------------------

    if (
        eligible_loan > 0
        and interest_rate is not None
    ):

        loan_details = calculate_loan_details(

            eligible_loan,

            interest_rate,

            tenure_years,

            moratorium_months
        )

        result.update(loan_details)

    return result


# ======================================================
# MAIN PROGRAM
# ======================================================

if __name__ == "__main__":

    print("\n========================================")
    print("       GRAM-BIZ AI FINANCIAL ENGINE")
    print("========================================")

    # --------------------------------------------------
    # USER INPUT
    # --------------------------------------------------

    try:

        margin = float(
            input(
                "\nEnter Available Margin Capital (₹): "
            )
        )

    except ValueError:

        print(
            "\n❌ Please enter a valid numeric amount."
        )

        exit()

    # --------------------------------------------------
    # CALCULATE
    # --------------------------------------------------

    result = calculate_financial_structure(
        margin
    )

    # --------------------------------------------------
    # FINANCIAL STRUCTURE OUTPUT
    # --------------------------------------------------

    print("\n========================================")
    print("          FINANCIAL STRUCTURE")
    print("========================================")

    print(
        f"\nAvailable Margin Capital : "
        f"₹{result['available_margin']:,.2f}"
    )

    print(
        f"Calculated Project Cost  : "
        f"₹{result['calculated_project_cost']:,.2f}"
    )

    print(
        f"Eligible Project Cost    : "
        f"₹{result['eligible_project_cost']:,.2f}"
    )

    print(
        f"Eligible Loan Amount     : "
        f"₹{result['eligible_loan']:,.2f}"
    )

    # --------------------------------------------------
    # SCHEME INFORMATION
    # --------------------------------------------------

    print(
        f"\nSelected Scheme          : "
        f"{result['scheme']}"
    )

    # --------------------------------------------------
    # LOAN DETAILS
    # --------------------------------------------------

    if result["interest_rate"] is not None:

        print(
            f"Interest Rate            : "
            f"{result['interest_rate']}%"
        )

        print(
            f"Tenure                   : "
            f"{result['tenure_years']} years"
        )

        print(
            f"Moratorium               : "
            f"{result['moratorium_months']} months"
        )

        # --------------------------------------------------
        # EMI ANALYSIS
        # --------------------------------------------------

        print("\n----------------------------------------")
        print("             LOAN ANALYSIS")
        print("----------------------------------------")

        print(
            f"Monthly EMI              : "
            f"₹{result['emi']:,.2f}"
        )

        print(
            f"Total Interest           : "
            f"₹{result['total_interest']:,.2f}"
        )

        print(
            f"Total Repayment          : "
            f"₹{result['total_repayment']:,.2f}"
        )

    else:

        print(
            "\n⚠️ The calculated project cost "
            "exceeds the maximum scheme limit."
        )

        print(
            "Maximum supported project cost: "
            "₹50,00,000"
        )

        print(
            "Maximum supported loan: "
            "₹45,00,000"
        )

    print("\n========================================")
    print("             CALCULATION END")
    print("========================================")