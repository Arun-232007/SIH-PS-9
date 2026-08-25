def calculate_revenue(products):
    """
    Calculate monthly and annual revenue from multiple products/services.
    Each product: {name, price, quantity_per_month}
    """
    total_monthly_revenue = 0
    product_results = []

    for product in products:
        name = product["name"]
        price = float(product["price"])
        quantity = float(product["quantity_per_month"])

        if not name.strip():
            raise ValueError("Product name cannot be empty.")
        if price <= 0:
            raise ValueError(f"Price for {name} must be greater than zero.")
        if quantity < 0:
            raise ValueError(f"Quantity for {name} cannot be negative.")

        monthly_revenue = price * quantity
        product_results.append({
            "name": name,
            "price": price,
            "quantity_per_month": quantity,
            "monthly_revenue": monthly_revenue
        })
        total_monthly_revenue += monthly_revenue

    annual_revenue = total_monthly_revenue * 12

    return {
        "products": product_results,
        "total_monthly_revenue": total_monthly_revenue,
        "annual_revenue": annual_revenue
    }
