from app.services.ai_engine.revenue_engine import calculate_revenue
from app.services.ai_engine.cost_engine import calculate_costs, calculate_profit
from app.services.ai_engine.financial_structure import calculate_financial_structure
from app.services.ai_engine.market_analysis import analyze_market
from app.services.ai_engine.risk_analysis import analyze_risk
from app.services.ai_engine.feasibility import analyze_feasibility
from app.services.ai_engine.swot import generate_swot
from app.services.ai_engine.location_lookup import resolve_market_context


def _resolve_revenue_and_expenses(data):
    """
    Use the product/expense breakdown if provided (from AI module inputs),
    otherwise fall back to flat monthly_revenue / monthly_expenses fields.
    """
    if data.products:
        product_dicts = [p.dict() for p in data.products]
        revenue_result = calculate_revenue(product_dicts)
        monthly_revenue = revenue_result["total_monthly_revenue"]
    else:
        monthly_revenue = data.monthly_revenue

    if data.expenses:
        expense_map = {e.name: e.amount for e in data.expenses}
        cost_result = calculate_costs(expense_map)
        monthly_expenses = cost_result["total_monthly_expenses"]
    else:
        monthly_expenses = data.monthly_expenses

    return monthly_revenue, monthly_expenses


def build_full_assessment(data):
    """
    Runs the complete Gram-Biz AI pipeline:
    financial structuring -> market analysis -> risk analysis
    -> feasibility scoring -> SWOT.
    """
    monthly_revenue, monthly_expenses = _resolve_revenue_and_expenses(data)

    # 1. Financial structuring (project cost, loan, scheme, EMI)
    financial = calculate_financial_structure(data.margin_capital)

    # 1b. Resolve real market context from the mapping dataset
    # (locations/competitors/market_data.json), then let any explicit
    # values the caller passed in override the looked-up data.
    looked_up = resolve_market_context(data.location, data.business_category)
    demand_level = data.demand_level if data.demand_level is not None else looked_up["demand_level"]
    competitors = data.competitors if data.competitors is not None else looked_up["competitors"]
    estimated_customers = (
        data.estimated_customers if data.estimated_customers is not None
        else looked_up["estimated_customers"]
    )

    # 2. Market analysis
    market = analyze_market(
        location=data.location,
        business=data.business_category,
        demand_level=demand_level,
        competitors=competitors,
        estimated_customers=estimated_customers
    )

    # 3. Risk analysis
    risk = analyze_risk({
        "competition_score": 100 - market["competition_score"],
        "seasonal_risk": data.seasonal_risk,
        "supply_risk": data.supply_risk,
        "customer_risk": data.customer_risk,
        "financial_risk": data.financial_risk
    })

    # 4. Feasibility scoring (combines financial + market + risk)
    feasibility = analyze_feasibility({
        "business_name": data.business_category,
        "location": data.location,
        "investment": financial["project_cost"],
        "own_contribution": data.margin_capital,
        "loan_amount": financial["loan_amount"],
        "monthly_revenue": monthly_revenue,
        "monthly_expenses": monthly_expenses,
        "monthly_emi": financial["emi"],
        "demand_score": market["demand_score"],
        "competition_score": market["competition_score"],
        "risk_score": risk["risk_score"]
    })

    # 5. SWOT (uses feasibility's profit_margin + market/risk scores)
    swot = generate_swot({
        "business": data.business_category,
        "demand_score": market["demand_score"],
        "competition_score": market["competition_score"],
        "risk_score": risk["risk_score"],
        "profit_margin": feasibility["profit_margin"],
        "available_margin": data.margin_capital
    })

    business_report = {
        "summary": f"{data.business_category} has {market['demand'].lower()} demand in {data.location}, "
                    f"with {market['competition'].lower()} competition ({market['opportunity'].lower()} opportunity).",
        "strengths": swot["strengths"],
        "weaknesses": swot["weaknesses"],
        "opportunities": swot["opportunities"],
        "threats": swot["threats"]
    }

    financial_response = {
        "project_cost": financial["project_cost"],
        "loan_amount": financial["loan_amount"],
        "scheme_name": financial["scheme_name"],
        "interest_rate": financial["interest_rate"],
        "tenure_years": financial["tenure_years"],
        "moratorium_months": financial["moratorium_months"],
        "emi": financial["emi"],
        "total_interest": financial["total_interest"],
        "total_repayment": financial["total_repayment"],
    }

    market_response = {
        "demand": market["demand"],
        "competition": market["competition"],
        "estimated_customers": market["estimated_customers"],
        "opportunity": market["opportunity"],
        "demand_score": market["demand_score"],
        "competition_score": market["competition_score"],
        "data_source": "mapping_dataset" if looked_up["matched"] else "default_assumption",
        "matched_location": looked_up["location_matched"],
        "avg_local_price": looked_up["avg_local_price"],
        "common_risks": looked_up["common_risks"],
    }

    risk_response = {
        "risk_score": risk["risk_score"],
        "risk_level": risk["risk_level"],
        "risk_levels": risk["risk_levels"],
        "recommendations": risk["recommendations"],
    }

    feasibility_response = {
        "overall_score": feasibility["overall_score"],
        "financial_score": feasibility["financial_score"],
        "market_score": feasibility["market_score"],
        "risk_score": feasibility["risk_score"],
        "financial_status": feasibility["financial_status"],
        "market_status": feasibility["market_status"],
        "risk_status": feasibility["risk_status"],
        "decision": feasibility["decision"],
        "recommendation": feasibility["recommendation"],
        "warnings": feasibility["warnings"],
        "monthly_revenue": feasibility["monthly_revenue"],
        "monthly_expenses": feasibility["monthly_expenses"],
        "monthly_emi": feasibility["monthly_emi"],
        "monthly_profit_after_emi": feasibility["monthly_profit_after_emi"],
        "roi": feasibility["roi"],
        "dscr": feasibility["dscr"],
        "break_even_revenue": feasibility["break_even_revenue"],
        "payback_months": feasibility["payback_months"],
        "scenarios": feasibility["scenarios"],
    }

    return {
        "location": data.location,
        "business_category": data.business_category,
        "financial": financial_response,
        "business": business_report,
        "market": market_response,
        "risk": risk_response,
        "feasibility": feasibility_response,
    }


def build_business_report(data):
    """Business-only report (SWOT), for the standalone /business/ endpoint."""
    full = build_full_assessment(data)
    return full["business"]
