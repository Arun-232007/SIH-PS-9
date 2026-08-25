# ============================================================
# GRAM-BIZ AI
# WHAT-IF / SCENARIO ANALYSIS ENGINE
# ============================================================


def calculate_scenario(
    monthly_revenue,
    monthly_expenses,
    monthly_emi,
    revenue_change_percent=0,
    expense_change_percent=0
):
    """
    Calculate business performance under a changed scenario.

    revenue_change_percent:
        +20 = revenue increases by 20%
        -20 = revenue decreases by 20%

    expense_change_percent:
        +20 = expenses increase by 20%
        -20 = expenses decrease by 20%
    """

    # --------------------------------------------------------
    # VALIDATION
    # --------------------------------------------------------

    if monthly_revenue < 0:
        raise ValueError(
            "Monthly revenue cannot be negative."
        )

    if monthly_expenses < 0:
        raise ValueError(
            "Monthly expenses cannot be negative."
        )

    if monthly_emi < 0:
        raise ValueError(
            "Loan EMI cannot be negative."
        )

    # --------------------------------------------------------
    # SCENARIO REVENUE
    # --------------------------------------------------------

    scenario_revenue = (
        monthly_revenue
        * (1 + revenue_change_percent / 100)
    )

    # --------------------------------------------------------
    # SCENARIO EXPENSES
    # --------------------------------------------------------

    scenario_expenses = (
        monthly_expenses
        * (1 + expense_change_percent / 100)
    )

    # Prevent negative values
    scenario_revenue = max(
        scenario_revenue,
        0
    )

    scenario_expenses = max(
        scenario_expenses,
        0
    )

    # --------------------------------------------------------
    # PROFIT
    # --------------------------------------------------------

    operating_profit = (
        scenario_revenue
        - scenario_expenses
    )

    cash_after_emi = (
        operating_profit
        - monthly_emi
    )

    # --------------------------------------------------------
    # PROFIT MARGIN
    # --------------------------------------------------------

    if scenario_revenue > 0:

        profit_margin = (
            cash_after_emi
            / scenario_revenue
        ) * 100

    else:

        profit_margin = 0

    # --------------------------------------------------------
    # DSCR
    # --------------------------------------------------------

    if monthly_emi > 0:

        dscr = (
            operating_profit
            / monthly_emi
        )

    else:

        dscr = None

    # --------------------------------------------------------
    # STATUS
    # --------------------------------------------------------

    if cash_after_emi > 0:

        status = "POSITIVE CASH FLOW"

    elif cash_after_emi == 0:

        status = "BREAK-EVEN"

    else:

        status = "NEGATIVE CASH FLOW"

    # --------------------------------------------------------
    # FEASIBILITY
    # --------------------------------------------------------

    if (
        cash_after_emi > 0
        and dscr is not None
        and dscr >= 1.25
    ):

        feasibility = "FEASIBLE"

    elif cash_after_emi >= 0:

        feasibility = "MARGINALLY FEASIBLE"

    else:

        feasibility = "NOT FEASIBLE"

    # --------------------------------------------------------
    # RETURN
    # --------------------------------------------------------

    return {

        "revenue_change_percent":
            revenue_change_percent,

        "expense_change_percent":
            expense_change_percent,

        "monthly_revenue":
            round(scenario_revenue, 2),

        "monthly_expenses":
            round(scenario_expenses, 2),

        "operating_profit":
            round(operating_profit, 2),

        "monthly_emi":
            round(monthly_emi, 2),

        "cash_after_emi":
            round(cash_after_emi, 2),

        "profit_margin":
            round(profit_margin, 2),

        "dscr":
            round(dscr, 2)
            if dscr is not None
            else None,

        "status":
            status,

        "feasibility":
            feasibility
    }


# ============================================================
# COMPARE MULTIPLE SCENARIOS
# ============================================================

def compare_scenarios(
    monthly_revenue,
    monthly_expenses,
    monthly_emi
):
    """
    Generate base, best and worst case scenarios.
    """

    scenarios = {

        "BASE CASE": calculate_scenario(
            monthly_revenue,
            monthly_expenses,
            monthly_emi
        ),

        "BEST CASE": calculate_scenario(
            monthly_revenue,
            monthly_expenses,
            monthly_emi,
            revenue_change_percent=20,
            expense_change_percent=-10
        ),

        "WORST CASE": calculate_scenario(
            monthly_revenue,
            monthly_expenses,
            monthly_emi,
            revenue_change_percent=-20,
            expense_change_percent=20
        )
    }

    return scenarios


# ============================================================
# USER INPUT / TEST
# ============================================================

if __name__ == "__main__":

    print("\n==========================================")
    print("          GRAM-BIZ AI")
    print("      SCENARIO ANALYSIS ENGINE")
    print("==========================================")

    try:

        monthly_revenue = float(
            input(
                "\nEnter Monthly Revenue (₹): "
            )
        )

        monthly_expenses = float(
            input(
                "Enter Monthly Expenses (₹): "
            )
        )

        monthly_emi = float(
            input(
                "Enter Monthly Loan EMI (₹): "
            )
        )

        # ----------------------------------------------------
        # BASE / BEST / WORST
        # ----------------------------------------------------

        scenarios = compare_scenarios(
            monthly_revenue,
            monthly_expenses,
            monthly_emi
        )

        # ----------------------------------------------------
        # OUTPUT
        # ----------------------------------------------------

        for name, result in scenarios.items():

            print("\n==========================================")
            print(f"             {name}")
            print("==========================================")

            print(
                f"Revenue          : "
                f"₹{result['monthly_revenue']:,.2f}"
            )

            print(
                f"Expenses         : "
                f"₹{result['monthly_expenses']:,.2f}"
            )

            print(
                f"Operating Profit : "
                f"₹{result['operating_profit']:,.2f}"
            )

            print(
                f"Loan EMI         : "
                f"₹{result['monthly_emi']:,.2f}"
            )

            print(
                f"Cash After EMI   : "
                f"₹{result['cash_after_emi']:,.2f}"
            )

            print(
                f"Profit Margin    : "
                f"{result['profit_margin']:.2f}%"
            )

            if result["dscr"] is not None:

                print(
                    f"DSCR             : "
                    f"{result['dscr']:.2f}"
                )

            print(
                f"Cash Flow Status : "
                f"{result['status']}"
            )

            print(
                f"Feasibility      : "
                f"{result['feasibility']}"
            )

        print("\n==========================================")
        print("          SCENARIO ANALYSIS END")
        print("==========================================")

    except ValueError as error:

        print(
            f"\n❌ Input Error: {error}"
        )