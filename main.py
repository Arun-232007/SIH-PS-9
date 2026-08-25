# ============================================================
# GRAM-BIZ AI
# MAIN INTEGRATION ENGINE
# ============================================================

from business_input import get_business_input
from revenue_engine import calculate_revenue
from cost_engine import calculate_costs, calculate_profit
from scheme_router import calculate_financial_structure
from risk_analysis import analyze_risk
from market_analysis import analyze_market
from feasibility import analyze_feasibility
from swot import generate_swot
from scenario_engine import calculate_scenario


# ============================================================
# HELPER
# ============================================================

def safe_float(value, default=0):
    try:
        return float(value)
    except (ValueError, TypeError):
        return default


# ============================================================
# MAIN
# ============================================================

def main():

    print("\n")
    print("=" * 60)
    print("                 GRAM-BIZ AI")
    print("      RURAL BUSINESS ADVISORY SYSTEM")
    print("=" * 60)

    # ========================================================
    # 1. BUSINESS INPUT
    # ========================================================

    print("\nSTEP 1: BUSINESS INFORMATION")

    data = get_business_input()

    business = data.get(
        "business",
        "Unknown Business"
    )

    location = data.get(
        "location",
        "Unknown Location"
    )

    products = data.get(
        "products",
        []
    )

    expenses_list = data.get(
        "expenses",
        []
    )

    available_margin = safe_float(
        data.get(
            "available_margin",
            0
        )
    )

    # ========================================================
    # 2. REVENUE ANALYSIS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                  REVENUE ANALYSIS")
    print("=" * 60)

    revenue_result = calculate_revenue(products)

    monthly_revenue = safe_float(
        revenue_result.get(
            "total_monthly_revenue",
            0
        )
    )

    annual_revenue = safe_float(
        revenue_result.get(
            "annual_revenue",
            0
        )
    )

    for product in revenue_result.get(
        "products",
        []
    ):

        print(
            f"{product.get('name', 'Product')}: "
            f"₹{product.get('monthly_revenue', 0):,.2f}/month"
        )

    print(
        f"\nTotal Monthly Revenue : "
        f"₹{monthly_revenue:,.2f}"
    )

    print(
        f"Annual Revenue        : "
        f"₹{annual_revenue:,.2f}"
    )

    # ========================================================
    # 3. EXPENSE ANALYSIS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                  EXPENSE ANALYSIS")
    print("=" * 60)

    expenses = {}

    for expense in expenses_list:

        name = expense.get(
            "name",
            "Other"
        )

        amount = safe_float(
            expense.get(
                "amount",
                0
            )
        )

        expenses[name] = amount

    cost_result = calculate_costs(
        expenses
    )

    monthly_expenses = safe_float(
        cost_result.get(
            "total_monthly_expenses",
            0
        )
    )

    annual_expenses = safe_float(
        cost_result.get(
            "total_annual_expenses",
            0
        )
    )

    print("\nExpenses:")

    for name, amount in expenses.items():

        print(
            f"{name:<25} "
            f"₹{amount:,.2f}/month"
        )

    print(
        f"\nTotal Monthly Expenses : "
        f"₹{monthly_expenses:,.2f}"
    )

    print(
        f"Total Annual Expenses  : "
        f"₹{annual_expenses:,.2f}"
    )

    # ========================================================
    # 4. FINANCIAL STRUCTURE
    # ========================================================

    print("\n")
    print("=" * 60)
    print("             FINANCIAL STRUCTURE")
    print("=" * 60)

    financial_result = calculate_financial_structure(
        available_margin
    )

    investment = safe_float(
        financial_result.get(
            "eligible_project_cost",
            0
        )
    )

    loan_amount = safe_float(
        financial_result.get(
            "eligible_loan",
            0
        )
    )

    own_contribution = available_margin

    interest_rate = financial_result.get(
        "interest_rate"
    )

    tenure_years = financial_result.get(
        "tenure_years"
    )

    moratorium_months = financial_result.get(
        "moratorium_months"
    )

    monthly_emi = safe_float(
        financial_result.get(
            "emi",
            0
        )
    )

    print(
        f"\nAvailable Margin      : "
        f"₹{available_margin:,.2f}"
    )

    print(
        f"Project Cost          : "
        f"₹{investment:,.2f}"
    )

    print(
        f"Loan Amount           : "
        f"₹{loan_amount:,.2f}"
    )

    print(
        f"Selected Scheme       : "
        f"{financial_result.get('scheme', 'N/A')}"
    )

    if interest_rate is not None:

        print(
            f"Interest Rate         : "
            f"{interest_rate}%"
        )

        print(
            f"Tenure                : "
            f"{tenure_years} years"
        )

        print(
            f"Moratorium            : "
            f"{moratorium_months} months"
        )

    print(
        f"Monthly EMI           : "
        f"₹{monthly_emi:,.2f}"
    )

    # ========================================================
    # 5. PROFIT ANALYSIS
    # ========================================================

    profit_result = calculate_profit(
        monthly_revenue,
        monthly_expenses
    )

    monthly_profit = safe_float(
        profit_result.get(
            "monthly_profit",
            0
        )
    )

    cash_after_emi = (
        monthly_profit
        - monthly_emi
    )

    print("\n")
    print("=" * 60)
    print("                    PROFIT ANALYSIS")
    print("=" * 60)

    print(
        f"\nMonthly Revenue       : "
        f"₹{monthly_revenue:,.2f}"
    )

    print(
        f"Monthly Expenses      : "
        f"₹{monthly_expenses:,.2f}"
    )

    print(
        f"Operating Profit      : "
        f"₹{monthly_profit:,.2f}"
    )

    print(
        f"Monthly EMI           : "
        f"₹{monthly_emi:,.2f}"
    )

    print(
        f"Cash After EMI        : "
        f"₹{cash_after_emi:,.2f}"
    )

    # ========================================================
    # 6. MARKET ANALYSIS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                    MARKET ANALYSIS")
    print("=" * 60)

    print("\nEnter local market information.")

    demand_level = input(
        "Demand level (HIGH/MEDIUM/LOW): "
    ).strip().upper()

    try:

        competitors = int(
            input(
                "Number of competitors nearby: "
            )
        )

    except ValueError:

        competitors = 0

    try:

        estimated_customers = int(
            input(
                "Estimated monthly customers: "
            )
        )

    except ValueError:

        estimated_customers = 0

    market_data = {

        "location": location,

        "business": business,

        "market": {

            "demand_level":
                demand_level,

            "competitors":
                competitors,

            "estimated_customers":
                estimated_customers
        }
    }

    market_result = analyze_market(
        market_data
    )

    print(
        f"\nDemand               : "
        f"{market_result.get('demand', 'N/A')}"
    )

    print(
        f"Competition          : "
        f"{market_result.get('competition', 'N/A')}"
    )

    print(
        f"Estimated Customers  : "
        f"{market_result.get('estimated_customers', 0)}"
    )

    print(
        f"Opportunity          : "
        f"{market_result.get('opportunity', 'N/A')}"
    )

    # ========================================================
    # 7. MARKET SCORES
    # ========================================================

    demand_mapping = {

        "HIGH": 90,

        "MEDIUM": 65,

        "LOW": 35
    }

    demand_score = demand_mapping.get(
        demand_level,
        50
    )

    # Competition score:
    # HIGH score = favorable market / lower competition

    if competitors <= 3:

        competition_score = 90

    elif competitors <= 7:

        competition_score = 65

    elif competitors <= 15:

        competition_score = 45

    elif competitors <= 30:

        competition_score = 30

    else:

        competition_score = 15

    # ========================================================
    # 8. RISK ANALYSIS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                     RISK ANALYSIS")
    print("=" * 60)

    print(
        "\nEnter risk assumptions from 0 to 100."
    )

    print(
        "0 = Very Low Risk"
    )

    print(
        "100 = Very High Risk"
    )

    try:

        seasonal_risk = float(
            input(
                "\nSeasonal Risk: "
            )
        )

        supply_risk = float(
            input(
                "Supply Chain Risk: "
            )
        )

        customer_risk = float(
            input(
                "Customer Dependency Risk: "
            )
        )

        financial_risk = float(
            input(
                "Financial Risk: "
            )
        )

    except ValueError:

        print(
            "\nInvalid risk input."
            " Using moderate default values."
        )

        seasonal_risk = 30
        supply_risk = 30
        customer_risk = 30
        financial_risk = 30

    # Clamp risk values

    seasonal_risk = max(
        0,
        min(seasonal_risk, 100)
    )

    supply_risk = max(
        0,
        min(supply_risk, 100)
    )

    customer_risk = max(
        0,
        min(customer_risk, 100)
    )

    financial_risk = max(
        0,
        min(financial_risk, 100)
    )

    risk_data = {

        "competition_score":
            100 - competition_score,

        "seasonal_risk":
            seasonal_risk,

        "supply_risk":
            supply_risk,

        "customer_risk":
            customer_risk,

        "financial_risk":
            financial_risk
    }

    risk_result = analyze_risk(
        risk_data
    )

    risk_score = safe_float(
        risk_result.get(
            "risk_score",
            0
        )
    )

    print(
        f"\nOverall Risk Score    : "
        f"{risk_score:.2f}/100"
    )

    print(
        f"Risk Level            : "
        f"{risk_result.get('risk_level', 'N/A')}"
    )

    # ========================================================
    # 9. FEASIBILITY ANALYSIS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                 FEASIBILITY ANALYSIS")
    print("=" * 60)

    feasibility_data = {

        "business_name":
            business,

        "location":
            location,

        "investment":
            investment,

        "own_contribution":
            own_contribution,

        "loan_amount":
            loan_amount,

        "monthly_revenue":
            monthly_revenue,

        "monthly_expenses":
            monthly_expenses,

        "monthly_emi":
            monthly_emi,

        "demand_score":
            demand_score,

        "competition_score":
            competition_score,

        "risk_score":
            risk_score
    }

    feasibility_result = analyze_feasibility(
        feasibility_data
    )

    print(
        f"\nFinancial Score      : "
        f"{feasibility_result['financial_score']:.2f}/100"
    )

    print(
        f"Market Score         : "
        f"{feasibility_result['market_score']:.2f}/100"
    )

    print(
        f"Overall Score        : "
        f"{feasibility_result['overall_score']:.2f}/100"
    )

    print(
        f"\nFinancial Status     : "
        f"{feasibility_result.get('financial_status', 'N/A')}"
    )

    print(
        f"Decision             : "
        f"{feasibility_result['decision']}"
    )

    print(
        f"\nRecommendation       : "
        f"{feasibility_result['recommendation']}"
    )

    # ========================================================
    # 10. WHAT-IF SCENARIO ANALYSIS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                  SCENARIO ANALYSIS")
    print("=" * 60)

    # IMPORTANT:
    # These values come directly from the user's
    # business inputs and calculations.

    base_case = calculate_scenario(
        monthly_revenue,
        monthly_expenses,
        monthly_emi
    )

    best_case = calculate_scenario(
        monthly_revenue,
        monthly_expenses,
        monthly_emi,
        revenue_change_percent=20,
        expense_change_percent=-10
    )

    worst_case = calculate_scenario(
        monthly_revenue,
        monthly_expenses,
        monthly_emi,
        revenue_change_percent=-20,
        expense_change_percent=20
    )

    scenarios = {

        "Base Case":
            base_case,

        "Best Case":
            best_case,

        "Worst Case":
            worst_case
    }

    for scenario_name, scenario in scenarios.items():

        print(
            f"\n--- {scenario_name} ---"
        )

        print(
            f"Revenue          : "
            f"₹{scenario.get('monthly_revenue', 0):,.2f}"
        )

        print(
            f"Expenses         : "
            f"₹{scenario.get('monthly_expenses', 0):,.2f}"
        )

        print(
            f"Operating Profit : "
            f"₹{scenario.get('operating_profit', 0):,.2f}"
        )

        print(
            f"Loan EMI         : "
            f"₹{scenario.get('monthly_emi', 0):,.2f}"
        )

        # FIXED BUG:
        # Your scenario_engine returns "cash_after_emi",
        # not "cash_after_loan".

        print(
            f"Cash After EMI   : "
            f"₹{scenario.get('cash_after_emi', 0):,.2f}"
        )

        print(
            f"Profit Margin    : "
            f"{scenario.get('profit_margin', 0):.2f}%"
        )

        dscr = scenario.get(
            "dscr"
        )

        if dscr is not None:

            print(
                f"DSCR             : "
                f"{dscr:.2f}"
            )

        print(
            f"Cash Flow Status : "
            f"{scenario.get('status', 'N/A')}"
        )

        print(
            f"Feasibility      : "
            f"{scenario.get('feasibility', 'N/A')}"
        )

    # ========================================================
    # 11. SWOT ANALYSIS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                     SWOT ANALYSIS")
    print("=" * 60)

    swot_data = {

        "business":
            business,

        "location":
            location,

        "monthly_revenue":
            monthly_revenue,

        "monthly_expenses":
            monthly_expenses,

        "monthly_emi":
            monthly_emi,

        "demand_score":
            demand_score,

        "competition_score":
            competition_score,

        "risk_score":
            risk_score,

        "profit":
            monthly_profit
    }

    try:

        swot_result = generate_swot(
            swot_data
        )

        print("\nSWOT Result:")

        print("\nStrengths:")

        for item in swot_result.get(
            "strengths",
            []
        ):

            print(
                f"  • {item}"
            )

        print("\nWeaknesses:")

        for item in swot_result.get(
            "weaknesses",
            []
        ):

            print(
                f"  • {item}"
            )

        print("\nOpportunities:")

        for item in swot_result.get(
            "opportunities",
            []
        ):

            print(
                f"  • {item}"
            )

        print("\nThreats:")

        for item in swot_result.get(
            "threats",
            []
        ):

            print(
                f"  • {item}"
            )

    except Exception as error:

        print(
            f"\n⚠ SWOT analysis could not run: "
            f"{error}"
        )

    # ========================================================
    # 12. WARNINGS
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                     WARNINGS")
    print("=" * 60)

    for warning in feasibility_result.get(
        "warnings",
        []
    ):

        print(
            f"⚠ {warning}"
        )

    # ========================================================
    # 13. FINAL BUSINESS ADVISORY
    # ========================================================

    print("\n")
    print("=" * 60)
    print("                GRAM-BIZ AI RESULT")
    print("=" * 60)

    print(
        f"\nBusiness       : "
        f"{business}"
    )

    print(
        f"Location       : "
        f"{location}"
    )

    print(
        f"Project Cost   : "
        f"₹{investment:,.2f}"
    )

    print(
        f"Own Contribution: "
        f"₹{own_contribution:,.2f}"
    )

    print(
        f"Loan Required  : "
        f"₹{loan_amount:,.2f}"
    )

    print(
        f"Monthly Revenue: "
        f"₹{monthly_revenue:,.2f}"
    )

    print(
        f"Monthly Cost   : "
        f"₹{monthly_expenses:,.2f}"
    )

    print(
        f"Monthly EMI    : "
        f"₹{monthly_emi:,.2f}"
    )

    print(
        f"Cash After EMI : "
        f"₹{cash_after_emi:,.2f}"
    )

    print(
        f"Overall Score  : "
        f"{feasibility_result['overall_score']:.2f}/100"
    )

    print(
        f"\nFINAL DECISION : "
        f"{feasibility_result['decision']}"
    )

    print(
        f"\nADVISORY       : "
        f"{feasibility_result['recommendation']}"
    )

    print("\n")
    print("=" * 60)
    print("             GRAM-BIZ AI COMPLETE")
    print("=" * 60)


# ============================================================
# START APPLICATION
# ============================================================

if __name__ == "__main__":

    try:

        main()

    except KeyboardInterrupt:

        print(
            "\n\nProgram stopped by user."
        )

    except Exception as error:

        print(
            f"\n\n❌ SYSTEM ERROR: {error}"
        )