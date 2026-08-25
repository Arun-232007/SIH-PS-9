// ============================================================
// Gram-Biz AI — API service layer
// Talks to the FastAPI backend (SIH Backend) running locally.
// Base URL can be overridden with a Vite env var:
//   VITE_API_URL=http://localhost:8000
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

/**
 * Generic POST helper. Throws a readable Error on failure so pages
 * can show it directly to the user.
 */
async function apiPost(path, body) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  } catch (networkError) {
    throw new Error(
      `Could not reach the Gram-Biz AI server at ${API_URL}. ` +
        `Make sure the backend is running (uvicorn app.main:app --reload).`
    )
  }

  if (!response.ok) {
    let detail = ""
    try {
      const errorBody = await response.json()
      detail =
        typeof errorBody.detail === "string"
          ? errorBody.detail
          : JSON.stringify(errorBody.detail)
    } catch {
      detail = response.statusText
    }
    throw new Error(detail || `Request to ${path} failed (${response.status}).`)
  }

  return response.json()
}

/* =========================================================
   BUSINESS CATEGORY MAPPING
   Frontend uses short keys (dairy, poultry, millet, food,
   tailoring, handicraft, retail, other). The backend mapping
   dataset (app/data/businesses.json) knows a fixed set of
   categories: Dairy, Retail, Textiles, Poultry, Food Processing.
   ========================================================= */

const BUSINESS_CATEGORY_MAP = {
  dairy: "Dairy",
  poultry: "Poultry",
  millet: "Food Processing",
  food: "Food Processing",
  tailoring: "Textiles",
  handicraft: "Textiles",
  retail: "Retail",
  other: "Retail",
}

export function toBackendCategory(businessKey) {
  return BUSINESS_CATEGORY_MAP[businessKey] || "Retail"
}

const LANGUAGE_MAP = {
  English: "en",
  Tamil: "ta",
  Hindi: "hi",
}

export function toBackendLanguage(language) {
  return LANGUAGE_MAP[language] || "en"
}

/* =========================================================
   1. FULL ASSESSMENT  ->  POST /assessment/
   Financial structuring + market + risk + SWOT + feasibility.
   ========================================================= */

export function getFullAssessment({
  location,
  businessCategory,
  marginCapital,
  language = "en",
  monthlyRevenue = 0,
  monthlyExpenses = 0,
}) {
  return apiPost("/assessment/", {
    location,
    business_category: businessCategory,
    margin_capital: Number(marginCapital) || 0,
    language,
    monthly_revenue: Number(monthlyRevenue) || 0,
    monthly_expenses: Number(monthlyExpenses) || 0,
  })
}

/* =========================================================
   2. FINANCIAL STRUCTURING  ->  POST /financial/
   ========================================================= */

export function getFinancialStructure({ location, businessCategory, marginCapital, language = "en" }) {
  return apiPost("/financial/", {
    location,
    business_category: businessCategory,
    margin_capital: Number(marginCapital) || 0,
    language,
  })
}

/* =========================================================
   3. BUSINESS / SWOT REPORT  ->  POST /business/
   ========================================================= */

export function getBusinessReport({ location, businessCategory, marginCapital, language = "en" }) {
  return apiPost("/business/", {
    location,
    business_category: businessCategory,
    margin_capital: Number(marginCapital) || 0,
    language,
  })
}

/* =========================================================
   4. CHATBOT  ->  POST /chatbot/
   Pass the "feasibility" object from a prior /assessment/ call
   (merged with financial data) as context for grounded answers.
   ========================================================= */

export function askChatbot(message, context = null) {
  return apiPost("/chatbot/", { message, context })
}

/* =========================================================
   5. MONTHLY STARTUP GUIDANCE  ->  POST /monthly-plan/
   ========================================================= */

export function getMonthlyPlan({
  businessCategory,
  location,
  startingCapital,
  monthlyRevenue,
  monthlyExpenses,
  language = "en",
  initialKnowledge = "none",
}) {
  return apiPost("/monthly-plan/", {
    business_category: businessCategory,
    location,
    starting_capital: Number(startingCapital) || 1,
    monthly_revenue: Number(monthlyRevenue) || 1,
    monthly_expenses: Number(monthlyExpenses) || 0,
    language,
    initial_knowledge: initialKnowledge,
  })
}
