from revenue_engine import calculate_revenue


def get_business_input():

    print("\n===================================")
    print("       GRAM-BIZ AI")
    print("     BUSINESS INFORMATION")
    print("===================================\n")

    # ==================================================
    # BUSINESS PROFILE
    # ==================================================

    business = input("Business type: ")

    location = input("Business location: ")

    experience = float(
        input("Years of experience: ")
    )

    existing_business = input(
        "Is this an existing business? (yes/no): "
    ).lower()

    # ==================================================
    # AVAILABLE MARGIN CAPITAL
    # ==================================================

    print("\n--- AVAILABLE MARGIN CAPITAL ---")

    available_margin = float(
        input("Available Margin Capital (₹): ")
    )

    # ==================================================
    # PRODUCTS / SERVICES
    # ==================================================

    print("\n--- PRODUCTS / SERVICES ---")
    print("Add your products one by one.")
    print("Type 'done' when finished.\n")

    products = []

    while True:

        name = input("Product/service name: ")

        if name.lower() == "done":
            break

        price = float(
            input(
                f"Selling price of {name} (₹): "
            )
        )

        quantity = float(
            input(
                f"Expected quantity of {name} "
                "sold per month: "
            )
        )

        if price < 0:
            print("Price cannot be negative.")
            continue

        if quantity < 0:
            print("Quantity cannot be negative.")
            continue

        products.append({
            "name": name,
            "price": price,
            "quantity_per_month": quantity
        })

        print(
            f"{name} added successfully.\n"
        )

    # ==================================================
    # REVENUE CALCULATION
    # ==================================================

    revenue = calculate_revenue(
        products
    )

    total_monthly_revenue = (
        revenue["total_monthly_revenue"]
    )

    total_annual_revenue = (
        revenue["annual_revenue"]
    )

    # ==================================================
    # MONTHLY EXPENSES
    # ==================================================

    print("\n--- MONTHLY EXPENSES ---")
    print("Add expenses one by one.")
    print("Examples: rent, salary, transport, electricity.")
    print("Type 'done' when finished.\n")

    expenses = []

    while True:

        name = input("Expense name: ")

        if name.lower() == "done":
            break

        amount = float(
            input(
                f"Monthly amount for {name} (₹): "
            )
        )

        if amount < 0:
            print("Expense cannot be negative.")
            continue

        expenses.append({
            "name": name,
            "amount": amount
        })

        print(
            f"{name} added successfully.\n"
        )

    # ==================================================
    # EXPENSE CALCULATION
    # ==================================================

    total_monthly_expenses = sum(
        expense["amount"]
        for expense in expenses
    )

    total_annual_expenses = (
        total_monthly_expenses * 12
    )

    # ==================================================
    # OPERATING PROFIT
    # ==================================================

    monthly_operating_profit = (
        total_monthly_revenue
        - total_monthly_expenses
    )

    annual_operating_profit = (
        monthly_operating_profit * 12
    )

    # ==================================================
    # PROFIT MARGIN
    # ==================================================

    if total_monthly_revenue > 0:

        profit_margin = (
            monthly_operating_profit
            / total_monthly_revenue
        ) * 100

    else:

        profit_margin = 0

    # ==================================================
    # FINAL DATA
    # ==================================================

    data = {

        "business": business,

        "location": location,

        "experience_years": experience,

        "existing_business":
            existing_business,

        "available_margin":
            available_margin,

        "products":
            products,

        "expenses":
            expenses,

        "total_monthly_revenue":
            total_monthly_revenue,

        "total_annual_revenue":
            total_annual_revenue,

        "total_monthly_expenses":
            total_monthly_expenses,

        "total_annual_expenses":
            total_annual_expenses,

        "monthly_operating_profit":
            monthly_operating_profit,

        "annual_operating_profit":
            annual_operating_profit,

        "profit_margin":
            profit_margin
    }

    return data


# ==================================================
# TEST
# ==================================================

if __name__ == "__main__":

    data = get_business_input()

    print("\n")
    print("===================================")
    print("       GRAM-BIZ AI")
    print("       BUSINESS SUMMARY")
    print("===================================")

    # ==================================================
    # BUSINESS
    # ==================================================

    print("\n--- BUSINESS PROFILE ---")

    print(
        "Business:",
        data["business"]
    )

    print(
        "Location:",
        data["location"]
    )

    print(
        "Experience:",
        data["experience_years"],
        "years"
    )

    print(
        "Existing Business:",
        data["existing_business"]
    )

    # ==================================================
    # FUNDING
    # ==================================================

    print("\n--- FUNDING ---")

    print(
        "Available Margin:",
        f"₹{data['available_margin']:,.2f}"
    )

    # ==================================================
    # PRODUCTS
    # ==================================================

    print("\n--- PRODUCTS / SERVICES ---")

    if len(data["products"]) == 0:

        print("No products entered.")

    else:

        for product in data["products"]:

            print(
                f"{product['name']}: "
                f"₹{product['price']:,.2f} × "
                f"{product['quantity_per_month']:,.0f} "
                f"= ₹{product['monthly_revenue']:,.2f}/month"
            )

    # ==================================================
    # REVENUE
    # ==================================================

    print("\n--- REVENUE ---")

    print(
        "Total Monthly Revenue:",
        f"₹{data['total_monthly_revenue']:,.2f}"
    )

    print(
        "Annual Revenue:",
        f"₹{data['total_annual_revenue']:,.2f}"
    )

    # ==================================================
    # EXPENSES
    # ==================================================

    print("\n--- EXPENSES ---")

    if len(data["expenses"]) == 0:

        print("No expenses entered.")

    else:

        for expense in data["expenses"]:

            print(
                f"{expense['name']}: "
                f"₹{expense['amount']:,.2f}/month"
            )

    # ==================================================
    # TOTAL EXPENSES
    # ==================================================

    print("\n--- EXPENSE SUMMARY ---")

    print(
        "Total Monthly Expenses:",
        f"₹{data['total_monthly_expenses']:,.2f}"
    )

    print(
        "Total Annual Expenses:",
        f"₹{data['total_annual_expenses']:,.2f}"
    )

    # ==================================================
    # PROFIT
    # ==================================================

    print("\n--- PROFITABILITY ---")

    print(
        "Monthly Operating Profit:",
        f"₹{data['monthly_operating_profit']:,.2f}"
    )

    print(
        "Annual Operating Profit:",
        f"₹{data['annual_operating_profit']:,.2f}"
    )

    print(
        "Profit Margin:",
        f"{data['profit_margin']:.2f}%"
    )

    # ==================================================
    # FINANCIAL STATUS
    # ==================================================

    print("\n--- FINANCIAL STATUS ---")

    if data["monthly_operating_profit"] > 0:

        print(
            "Status: PROFITABLE BUSINESS ✅"
        )

    elif data["monthly_operating_profit"] == 0:

        print(
            "Status: BREAK-EVEN ⚠️"
        )

    else:

        print(
            "Status: OPERATING LOSS ❌"
        )

    print("\n===================================")
    print("       INPUT ANALYSIS COMPLETE")
    print("===================================")