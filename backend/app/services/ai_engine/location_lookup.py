"""
Resolves a user's (location, business_category) into real market context
using the reference datasets supplied by the mapping teammate
(app/data/locations.json, competitors.json, businesses.json, market_data.json).

If no match is found for the given location/category, sensible defaults are
returned so the rest of the pipeline still works (e.g. before a village is
added to locations.json).
"""

import json
import os

_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data")


def _load(filename):
    path = os.path.join(_DATA_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


_locations = _load("locations.json")
_competitors = _load("competitors.json")
_businesses = _load("businesses.json")
_market_data = _load("market_data.json")


def _find_location(location_query):
    """Match a user-typed location string against village/block/district fields."""
    query = (location_query or "").strip().lower()
    if not query:
        return None
    for loc in _locations:
        if query in (
            loc.get("village", "").lower(),
            loc.get("block", "").lower(),
            loc.get("district", "").lower(),
        ):
            return loc
    # Fallback: substring match (e.g. user typed "Sulur village")
    for loc in _locations:
        if (
            loc.get("village", "").lower() in query
            or loc.get("block", "").lower() in query
        ):
            return loc
    return None


def _find_competitors(block, category):
    if not block:
        return None
    block = block.lower()
    category = (category or "").strip().lower()
    for row in _competitors:
        if row.get("block", "").lower() == block and row.get("category", "").lower() == category:
            return row
    return None


def _find_market_data(district, category):
    if not district:
        return None
    district = district.lower()
    category = (category or "").strip().lower()
    for row in _market_data:
        if row.get("district", "").lower() == district and row.get("category", "").lower() == category:
            return row
    return None


def _find_business_meta(category):
    category = (category or "").strip().lower()
    for row in _businesses:
        if row.get("category", "").lower() == category:
            return row
    return None


def resolve_market_context(location, business_category):
    """
    Returns a dict with:
      demand_level, competitors, estimated_customers,
      matched (bool - whether real data was found or defaults were used),
      business_notes (seasonality, common_risks, avg_gross_margin_pct if known)
    """
    loc = _find_location(location)
    block = loc.get("block") if loc else None
    district = loc.get("district") if loc else None
    population = loc.get("population") if loc else None

    comp_row = _find_competitors(block, business_category) if block else None
    market_row = _find_market_data(district, business_category) if district else None
    business_meta = _find_business_meta(business_category)

    matched = bool(loc and (comp_row or market_row))

    demand_level = (market_row.get("demand_level").upper() if market_row else "MEDIUM")
    competitors = comp_row.get("estimated_competitor_count") if comp_row else 5

    # Rough estimated_customers proxy: a fraction of village/block population,
    # since we don't have real footfall data (flagged in mapping teammate's assumptions.md).
    estimated_customers = round(population * 0.05) if population else 0

    return {
        "matched": matched,
        "location_matched": loc.get("village") if loc else None,
        "district": district,
        "demand_level": demand_level,
        "competitors": competitors,
        "estimated_customers": estimated_customers,
        "saturation_level": comp_row.get("saturation_level") if comp_row else None,
        "avg_local_price": market_row.get("avg_local_price") if market_row else None,
        "purchasing_power_index": market_row.get("purchasing_power_index") if market_row else None,
        "common_risks": business_meta.get("common_risks") if business_meta else [],
        "seasonality": business_meta.get("seasonality") if business_meta else None,
        "avg_gross_margin_pct": business_meta.get("avg_gross_margin_pct") if business_meta else None,
    }
