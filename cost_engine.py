def calculate_costs(expenses):
    """
    Calculate total monthly and annual business expenses.
    """

    # Validate expenses
    for name, amount in expenses.items():

        if amount < 0:
            raise ValueError(
                f"{name} cannot be negative."
            )

    total_expenses = sum(expenses.values())

    return {
        "expenses": expenses,
        "total_monthly_expenses": round(
            total_expenses, 2
        ),
        "total_annual_expenses": round(
            total_expenses * 12, 2
        )
    }


def calculate_profit(
    monthly_revenue,
    total_monthly_expenses
):
    """
    Calculate monthly and annual operating profit.
    """

    operating_profit = (
        monthly_revenue
        -
        total_monthly_expenses
    )

    if monthly_revenue > 0:

        profit_margin = (
            operating_profit
            /
            monthly_revenue
        ) * 100

    else:

        profit_margin = 0

    return {
        "monthly_profit": round(
            operating_profit, 2
        ),

        "annual_profit": round(
            operating_profit * 12, 2
        ),

        "profit_margin": round(
            profit_margin, 2
        )
    }


def calculate_cash_after_loan(
    operating_profit,
    loan_emi
):
    """
    Calculate cash remaining after monthly
    loan repayment.
    """

    cash_after_loan = (
        operating_profit
        -
        loan_emi
    )

    return round(
        cash_after_loan, 2
    )


def get_financial_status(cash_after_loan):

    if cash_after_loan > 0:

        return "POSITIVE CASH FLOW"

    elif cash_after_loan == 0:

        return "BREAK-EVEN"

    else:

        return "NEGATIVE CASH FLOW"


# ============================================================
# USER INPUT / TEST
# ============================================================

if __name__ == "__main__":

    print("\n========================================")
    print("          GRAM-BIZ AI")
    print("          COST ENGINE")
    print("========================================")

    try:

        # ----------------------------------------
        # REVENUE
        # ----------------------------------------

        monthly_revenue = float(
            input(
                "\nEnter Monthly Revenue (₹): "
            )
        )

        if monthly_revenue < 0:
            raise ValueError(
                "Revenue cannot be negative."
            )

        # ----------------------------------------
        # EXPENSE INPUTS
        # ----------------------------------------

        print(
            "\nEnter Monthly Business Expenses"
        )

        rent = float(
            input(
                "Rent / Shop Cost (₹): "
            )
        )

        salaries = float(
            input(
                "Employee Salaries (₹): "
            )
        )

        raw_materials = float(
            input(
                "Raw Materials / Stock (₹): "
            )
        )

        electricity = float(
            input(
                "Electricity / Utilities (₹): "
            )
        )

        transport = float(
            input(
                "Transport / Delivery (₹): "
            )
        )

        marketing = float(
            input(
                "Marketing / Promotion (₹): "
            )
        )

        maintenance = float(
            input(
                "Maintenance (₹): "
            )
        )

        other_expenses = float(
            input(
                "Other Expenses (₹): "
            )
        )

        # ----------------------------------------
        # STORE EXPENSES
        # ----------------------------------------

        expenses = {

            "rent": rent,

            "salaries": salaries,

            "raw_materials": raw_materials,

            "electricity": electricity,

            "transport": transport,

            "marketing": marketing,

            "maintenance": maintenance,

            "other_expenses": other_expenses
        }

        # ----------------------------------------
        # COST CALCULATION
        # ----------------------------------------

        cost_result = calculate_costs(
            expenses
        )

        total_expenses = cost_result[
            "total_monthly_expenses"
        ]

        annual_expenses = cost_result[
            "total_annual_expenses"
        ]

        # ----------------------------------------
        # PROFIT CALCULATION
        # ----------------------------------------

        profit_result = calculate_profit(
            monthly_revenue,
            total_expenses
        )

        monthly_profit = profit_result[
            "monthly_profit"
        ]

        annual_profit = profit_result[
            "annual_profit"
        ]

        profit_margin = profit_result[
            "profit_margin"
        ]

        # ----------------------------------------
        # LOAN EMI
        # ----------------------------------------

        loan_emi = float(
            input(
                "\nEnter Monthly Loan EMI (₹): "
            )
        )

        if loan_emi < 0:
            raise ValueError(
                "Loan EMI cannot be negative."
            )

        cash_after_loan = calculate_cash_after_loan(
            monthly_profit,
            loan_emi
        )

        # ----------------------------------------
        # FINANCIAL STATUS
        # ----------------------------------------

        financial_status = get_financial_status(
            cash_after_loan
        )

        # ----------------------------------------
        # OUTPUT
        # ----------------------------------------

        print("\n========================================")
        print("             COST ANALYSIS")
        print("========================================")

        print(
            f"\nMonthly Revenue       : "
            f"₹{monthly_revenue:,.2f}"
        )

        print(
            f"Monthly Expenses      : "
            f"₹{total_expenses:,.2f}"
        )

        print(
            f"Annual Expenses       : "
            f"₹{annual_expenses:,.2f}"
        )

        print(
            f"Monthly Profit        : "
            f"₹{monthly_profit:,.2f}"
        )

        print(
            f"Annual Profit         : "
            f"₹{annual_profit:,.2f}"
        )

        print(
            f"Profit Margin         : "
            f"{profit_margin:.2f}%"
        )

        print(
            f"Loan EMI              : "
            f"₹{loan_emi:,.2f}"
        )

        print(
            f"Cash After Loan       : "
            f"₹{cash_after_loan:,.2f}"
        )

        print("\n----------------------------------------")

        print(
            f"Financial Status      : "
            f"{financial_status}"
        )

        print("----------------------------------------")

        # ----------------------------------------
        # WARNINGS
        # ----------------------------------------

        print("\n--------------- WARNINGS ----------------")

        warning_found = False

        if monthly_profit <= 0:

            print(
                "⚠ Business is not generating "
                "positive operating profit."
            )

            warning_found = True

        if profit_margin < 10:

            print(
                "⚠ Profit margin is below 10%."
            )

            warning_found = True

        if cash_after_loan < 0:

            print(
                "⚠ Cash flow is insufficient "
                "after loan repayment."
            )

            warning_found = True

        if not warning_found:

            print(
                "✓ No major financial warning "
                "detected."
            )

        print("\n========================================")

    except ValueError as error:

        print(
            f"\n❌ Input Error: {error}"
        )