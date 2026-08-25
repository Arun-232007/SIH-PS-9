def calculate_revenue(products):
    """
    Calculate monthly and annual revenue
    from multiple products/services.

    Each product contains:
        name
        price
        quantity_per_month
    """

    total_monthly_revenue = 0
    product_results = []

    for product in products:

        name = product["name"]
        price = float(product["price"])
        quantity = float(product["quantity_per_month"])

        # -----------------------------
        # Validation
        # -----------------------------

        if not name.strip():
            raise ValueError(
                "Product name cannot be empty."
            )

        if price <= 0:
            raise ValueError(
                f"Price for {name} must be greater than zero."
            )

        if quantity < 0:
            raise ValueError(
                f"Quantity for {name} cannot be negative."
            )

        # -----------------------------
        # Revenue
        # -----------------------------

        monthly_revenue = price * quantity

        product_results.append({
            "name": name,
            "price": price,
            "quantity_per_month": quantity,
            "monthly_revenue": monthly_revenue
        })

        total_monthly_revenue += monthly_revenue

    annual_revenue = (
        total_monthly_revenue * 12
    )

    return {
        "products": product_results,
        "total_monthly_revenue": total_monthly_revenue,
        "annual_revenue": annual_revenue
    }


# ==================================================
# USER INPUT
# ==================================================

if __name__ == "__main__":

    print("\n==========================================")
    print("          GRAM-BIZ AI")
    print("        REVENUE ENGINE")
    print("==========================================")

    products = []

    try:

        business_name = input(
            "\nEnter Business Name: "
        ).strip()

        if not business_name:

            raise ValueError(
                "Business name cannot be empty."
            )

        number_of_products = int(
            input(
                "Enter Number of Products/Services: "
            )
        )

        if number_of_products <= 0:

            raise ValueError(
                "Number of products must be greater than zero."
            )

        # ------------------------------------------
        # Enter products
        # ------------------------------------------

        for i in range(number_of_products):

            print(
                f"\n----------- PRODUCT {i + 1} -----------"
            )

            name = input(
                "Product/Service Name: "
            ).strip()

            price = float(
                input(
                    "Selling Price per Unit (₹): "
                )
            )

            quantity = float(
                input(
                    "Expected Units Sold per Month: "
                )
            )

            products.append({
                "name": name,
                "price": price,
                "quantity_per_month": quantity
            })

        # ------------------------------------------
        # Calculate
        # ------------------------------------------

        result = calculate_revenue(products)

        # ------------------------------------------
        # Display
        # ------------------------------------------

        print("\n==========================================")
        print("          REVENUE ESTIMATION")
        print("==========================================")

        print(
            f"\nBusiness: {business_name}"
        )

        print("\nProduct-wise Revenue")
        print("------------------------------------------")

        for product in result["products"]:

            print(
                f"\nProduct             : "
                f"{product['name']}"
            )

            print(
                f"Price per Unit      : "
                f"₹{product['price']:,.2f}"
            )

            print(
                f"Units / Month       : "
                f"{product['quantity_per_month']:,.0f}"
            )

            print(
                f"Monthly Revenue     : "
                f"₹{product['monthly_revenue']:,.2f}"
            )

        print("\n==========================================")

        print(
            f"Total Monthly Revenue : "
            f"₹{result['total_monthly_revenue']:,.2f}"
        )

        print(
            f"Annual Revenue        : "
            f"₹{result['annual_revenue']:,.2f}"
        )

        print("==========================================")

    except ValueError as error:

        print(
            f"\n❌ Input Error: {error}"
        )