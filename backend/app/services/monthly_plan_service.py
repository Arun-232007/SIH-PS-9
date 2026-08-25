def generate_startup_guidance(
    business_category: str,
    location: str,
    starting_capital: float,
    monthly_revenue: float,
    monthly_expenses: float,
    initial_knowledge: str = "none"
):
    category_advice = {
        "dairy": {
            1: "Check milk demand in the local area and start with a small supply.",
            2: "Build trust with nearby shops and households.",
            3: "Reduce spoilage and improve cold storage.",
            4: "Track daily sales and adjust quantity.",
            5: "Negotiate better supplier rates.",
            6: "Use local promotion to grow repeat customers.",
            7: "Add paneer, curd, or ghee if demand is stable.",
            8: "Improve packaging and delivery timing.",
            9: "Focus on quality consistency and margins.",
            10: "Build savings and keep emergency stock.",
            11: "Prepare for seasonal demand changes.",
            12: "Review profits and plan for expansion."
        }
    }

    default_advice = {
        1: "Start small and validate demand.",
        2: "Collect customer feedback.",
        3: "Reduce waste and control cost.",
        4: "Focus on repeat customers.",
        5: "Improve operations.",
        6: "Use local promotion.",
        7: "Expand carefully.",
        8: "Add something new only if stable.",
        9: "Improve margins.",
        10: "Save profit.",
        11: "Plan growth.",
        12: "Review and reset."
    }

    cat = business_category.lower()
    advice_map = category_advice.get(cat, default_advice)

    total_profit = 0.0
    plan = []

    for month in range(1, 13):
        if month == 1:
            revenue = monthly_revenue * 0.85
            expenses = monthly_expenses * 1.10
        elif month in [2, 3]:
            revenue = monthly_revenue * 0.95
            expenses = monthly_expenses * 1.00
        elif month in [4, 5, 6]:
            revenue = monthly_revenue * 1.05
            expenses = monthly_expenses * 0.98
        elif month in [7, 8, 9]:
            revenue = monthly_revenue * 1.15
            expenses = monthly_expenses * 1.02
        else:
            revenue = monthly_revenue * 1.20
            expenses = monthly_expenses * 0.97

        profit = round(revenue - expenses, 2)
        total_profit += profit

        action = advice_map.get(month, "Keep improving step by step.")

        if profit >= 0:
            if_profit = "Reinvest a part of the profit into growth, marketing, or better stock."
            if_loss = "Reduce costs, validate demand, and improve the offer."
        else:
            if_profit = "Use the profit to strengthen the next month’s plan."
            if_loss = "Cut unnecessary spending and focus on survival first."

        plan.append({
            "month": month,
            "revenue": round(revenue, 2),
            "expenses": round(expenses, 2),
            "profit": profit,
            "action": action,
            "if_profit": if_profit,
            "if_loss": if_loss,
        })

    return round(total_profit, 2), plan