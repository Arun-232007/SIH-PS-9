def analyze_market(data):
    """
    Analyze the local market for a proposed rural business.
    """

    location = data["location"]
    business = data["business"]
    market = data["market"]

    demand = market.get("demand_level", "UNKNOWN")
    competitors = market.get("competitors", 0)
    estimated_customers = market.get("estimated_customers", 0)

    # Determine competition level
    if competitors <= 3:
        competition = "LOW"
    elif competitors <= 7:
        competition = "MEDIUM"
    else:
        competition = "HIGH"

    # Determine opportunity level
    if demand == "HIGH" and competition in ["LOW", "MEDIUM"]:
        opportunity = "HIGH"
    elif demand == "MEDIUM":
        opportunity = "MEDIUM"
    else:
        opportunity = "LOW"

    return {
        "location": location,
        "business": business,
        "demand": demand,
        "competition": competition,
        "estimated_customers": estimated_customers,
        "opportunity": opportunity
    }


if __name__ == "__main__":

    test_data = {
        "location": {
            "district": "Coimbatore",
            "block": "Annur",
            "village": "Kovilpalayam"
        },

        "business": {
            "category": "Dairy"
        },

        "market": {
            "demand_level": "HIGH",
            "competitors": 7,
            "estimated_customers": 1500
        }
    }

    result = analyze_market(test_data)

    print(result)