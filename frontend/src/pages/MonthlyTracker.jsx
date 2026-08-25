import { useEffect, useState } from "react"
import "./MonthlyTracker.css"
import { getMonthlyPlan, toBackendCategory } from "../services/api"
import Chatbot from "../components/Chatbot"

function MonthlyTracker({ setPage }) {
  const [assessment, setAssessment] = useState(null)

  const [month1, setMonth1] = useState({
    sales: "",
    expenses: "",
    customers: "",
    averageOrder: "",
  })

  const [saved, setSaved] = useState(false)
  const [feasibilityContext, setFeasibilityContext] = useState(null)

  // Real 12-month guidance plan from POST /monthly-plan/
  const [aiPlan, setAiPlan] = useState(null)
  const [loadingPlan, setLoadingPlan] = useState(false)
  const [planError, setPlanError] = useState("")

  useEffect(() => {
    const savedAssessment =
      localStorage.getItem("gramBizAssessment")

    if (savedAssessment) {
      try {
        setAssessment(
          JSON.parse(savedAssessment)
        )
      } catch (error) {
        console.error(
          "Unable to load assessment:",
          error
        )
      }
    }

    const savedMonth =
      localStorage.getItem(
        "gramBizMonth1"
      )

    if (savedMonth) {
      try {
        setMonth1(
          JSON.parse(savedMonth)
        )
        setSaved(true)
      } catch (error) {
        console.error(
          "Unable to load Month 1 data:",
          error
        )
      }
    }

    const savedResult =
      localStorage.getItem("gramBizAssessmentResult")

    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult)
        setFeasibilityContext(parsed.feasibility || null)
      } catch (error) {
        console.error("Unable to load AI assessment result:", error)
      }
    }
  }, [])

  const businessType =
    assessment?.businessType ||
    "Your Business"

  const sales =
    Number(month1.sales) || 0

  const expenses =
    Number(month1.expenses) || 0

  const customers =
    Number(month1.customers) || 0

  const averageOrder =
    Number(month1.averageOrder) || 0

  const actualProfit =
    sales - expenses

  const profitMargin =
    sales > 0
      ? Math.round(
          (actualProfit / sales) * 100
        )
      : 0

  /*
   * Simple demonstration prediction model.
   * This is an estimate, not a real ML model.
   * Backend AI can replace this later.
   */

  const growthFactor =
    customers > 20
      ? 1.12
      : customers > 10
      ? 1.08
      : 1.05

  const predictedSales =
    Math.round(
      sales * growthFactor
    )

  const estimatedExpenseGrowth =
    expenses * 1.04

  const predictedProfit =
    Math.round(
      predictedSales -
        estimatedExpenseGrowth
    )

  const lowerSales =
    Math.round(
      predictedSales * 0.9
    )

  const upperSales =
    Math.round(
      predictedSales * 1.1
    )

  const lowerProfit =
    Math.round(
      predictedProfit * 0.9
    )

  const upperProfit =
    Math.round(
      predictedProfit * 1.1
    )

  const updateField = (
    field,
    value
  ) => {
    setMonth1((previous) => ({
      ...previous,
      [field]: value,
    }))

    setSaved(false)
  }

  const saveMonth1 = () => {
    localStorage.setItem(
      "gramBizMonth1",
      JSON.stringify(month1)
    )

    setSaved(true)
    fetchAiPlan()
  }

  const mapExperienceToKnowledge = (experience) => {
    const value = String(experience || "").toLowerCase()
    if (value.includes("more than")) return "high"
    if (value.includes("1")) return "medium"
    if (value.includes("less than")) return "low"
    return "none"
  }

  const fetchAiPlan = async () => {
    if (sales <= 0) {
      setPlanError("Enter your Month 1 sales to get an AI-generated forecast.")
      return
    }

    setPlanError("")
    setLoadingPlan(true)

    try {
      const result = await getMonthlyPlan({
        businessCategory: toBackendCategory(assessment?.businessKey || "other"),
        location: assessment?.location || "Unknown",
        startingCapital: Number(assessment?.investment) || sales || 1,
        monthlyRevenue: sales,
        monthlyExpenses: expenses,
        initialKnowledge: mapExperienceToKnowledge(assessment?.experience),
      })

      setAiPlan(result)
      localStorage.setItem("gramBizMonthlyPlan", JSON.stringify(result))
    } catch (error) {
      console.error("Monthly plan request failed:", error)
      setPlanError(error.message || "Could not generate the AI forecast. Please try again.")
    } finally {
      setLoadingPlan(false)
    }
  }

  useEffect(() => {
    const savedPlan = localStorage.getItem("gramBizMonthlyPlan")
    if (savedPlan) {
      try {
        setAiPlan(JSON.parse(savedPlan))
      } catch (error) {
        console.error("Unable to load saved monthly plan:", error)
      }
    }
  }, [])

  // Real Month 2 figures from the backend plan, when available.
  const aiMonth2 = aiPlan?.monthly_plan?.[1] || null

  return (
    <div className="monthly-page">

      {/* HEADER */}

      <header className="monthly-header">

        <button
          className="monthly-back"
          onClick={() =>
            setPage("roadmap")
          }
        >
          ← Business Roadmap
        </button>

        <div>

          <span className="monthly-eyebrow">
            GRAM-BIZ AI · BUSINESS TRACKING
          </span>

          <h1>
            Month 1 Performance
          </h1>

          <p>
            Record your real business performance
            and get a simple Month 2 estimate.
          </p>

        </div>

      </header>


      <main className="monthly-main">


        {/* BUSINESS CARD */}

        <section className="monthly-business-card">

          <div className="monthly-business-icon">
            📊
          </div>

          <div>

            <span>
              YOUR BUSINESS
            </span>

            <h2>
              {businessType}
            </h2>

            <p>
              📍{" "}
              {assessment?.location ||
                "Your local area"}
            </p>

          </div>

        </section>


        {/* INPUT CARD */}

        <section className="monthly-card">

          <div className="monthly-card-heading">

            <div>

              <span>
                MONTH 1 ACTUAL DATA
              </span>

              <h2>
                Enter Your Business Numbers
              </h2>

            </div>

            {saved && (
              <span className="saved-badge">
                ✓ Saved
              </span>
            )}

          </div>


          <div className="monthly-input-grid">


            <div className="monthly-field">

              <label>
                Total Sales
              </label>

              <p>
                Total money received from customers.
              </p>

              <div className="money-input">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={month1.sales}
                  onChange={(e) =>
                    updateField(
                      "sales",
                      e.target.value
                    )
                  }
                  placeholder="50000"
                />

              </div>

            </div>


            <div className="monthly-field">

              <label>
                Total Expenses
              </label>

              <p>
                Materials, transport, rent, electricity
                and other business expenses.
              </p>

              <div className="money-input">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={month1.expenses}
                  onChange={(e) =>
                    updateField(
                      "expenses",
                      e.target.value
                    )
                  }
                  placeholder="30000"
                />

              </div>

            </div>


            <div className="monthly-field">

              <label>
                Number of Customers
              </label>

              <p>
                Approximate number of customers served.
              </p>

              <input
                className="normal-input"
                type="number"
                min="0"
                value={month1.customers}
                onChange={(e) =>
                  updateField(
                    "customers",
                    e.target.value
                  )
                }
                placeholder="25"
              />

            </div>


            <div className="monthly-field">

              <label>
                Average Order Value
              </label>

              <p>
                Average amount spent by one customer.
              </p>

              <div className="money-input">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={
                    month1.averageOrder
                  }
                  onChange={(e) =>
                    updateField(
                      "averageOrder",
                      e.target.value
                    )
                  }
                  placeholder="1000"
                />

              </div>

            </div>

          </div>


          <button
            className="save-month-btn"
            onClick={saveMonth1}
            disabled={loadingPlan}
          >
            {loadingPlan ? "Generating AI forecast…" : "Save & Get AI Forecast →"}
          </button>

          {planError && (
            <p style={{ color: "#c0392b", marginTop: "10px", fontSize: "13px" }}>
              {planError}
            </p>
          )}

        </section>


        {/* ACTUAL PERFORMANCE */}

        <section className="monthly-results-grid">

          <div className="result-card">

            <span>
              MONTH 1 SALES
            </span>

            <strong>
              ₹
              {sales.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div className="result-card">

            <span>
              MONTH 1 EXPENSES
            </span>

            <strong>
              ₹
              {expenses.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div className="result-card profit-card">

            <span>
              ACTUAL PROFIT
            </span>

            <strong>
              ₹
              {actualProfit.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div className="result-card">

            <span>
              PROFIT MARGIN
            </span>

            <strong>
              {profitMargin}%
            </strong>

          </div>

        </section>


        {/* PREDICTION */}

        <section className="prediction-card">

          <div className="prediction-top">

            <div>

              <span>
                ✦ AI BUSINESS FORECAST
              </span>

              <h2>
                Estimated Month 2 Performance
              </h2>

            </div>

            <div className="prediction-icon">
              🤖
            </div>

          </div>


          <div className="prediction-grid">

            <div className="prediction-box">

              <span>
                ESTIMATED SALES
              </span>

              <strong>
                {aiMonth2
                  ? `₹${Number(aiMonth2.revenue).toLocaleString("en-IN")}`
                  : `₹${lowerSales.toLocaleString("en-IN")} – ₹${upperSales.toLocaleString("en-IN")}`}
              </strong>

            </div>


            <div className="prediction-box">

              <span>
                ESTIMATED PROFIT
              </span>

              <strong>
                {aiMonth2
                  ? `₹${Number(aiMonth2.profit).toLocaleString("en-IN")}`
                  : `₹${lowerProfit.toLocaleString("en-IN")} – ₹${upperProfit.toLocaleString("en-IN")}`}
              </strong>

            </div>


            <div className="prediction-box">

              <span>
                EXPECTED GROWTH
              </span>

              <strong>
                {aiMonth2 && sales > 0
                  ? `${Math.round(((aiMonth2.revenue - sales) / sales) * 100)}%`
                  : `+${customers > 20 ? "12%" : customers > 10 ? "8%" : "5%"}`}
              </strong>

            </div>

          </div>


          <div className="prediction-explanation">

            <strong>
              ✦ How this estimate works
            </strong>

            <p>
              {aiMonth2
                ? "This estimate comes directly from the Gram-Biz AI backend (POST /monthly-plan/), which models seasonal growth patterns for your business category over a full 12-month plan."
                : "Gram-Biz AI considers your Month 1 sales, expenses, customer count and business activity to create a simple Month 2 estimate. Save your data above to get the real AI-generated forecast."}
            </p>

          </div>

          <p className="prediction-disclaimer">
            This is an estimate for planning purposes,
            not a guaranteed result.
          </p>

          {aiMonth2 && (
            <div className="monthly-advice" style={{ marginTop: "16px" }}>
              <div className="monthly-advice-icon">🎯</div>
              <div>
                <span>MONTH 2 ACTION</span>
                <h2>{aiMonth2.action}</h2>
                <p>
                  If profitable: {aiMonth2.if_profit} If it's a loss:{" "}
                  {aiMonth2.if_loss}
                </p>
              </div>
            </div>
          )}

        </section>


        {/* FULL 12-MONTH AI PLAN */}

        {aiPlan?.monthly_plan && (

          <section className="monthly-card">

            <div className="monthly-card-heading">
              <div>
                <span>FULL AI GUIDANCE PLAN</span>
                <h2>12-Month Roadmap</h2>
              </div>
              <span className="saved-badge">
                Total profit: ₹{Number(aiPlan.total_profit).toLocaleString("en-IN")}
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                    <th style={{ padding: "8px" }}>Month</th>
                    <th style={{ padding: "8px" }}>Revenue</th>
                    <th style={{ padding: "8px" }}>Expenses</th>
                    <th style={{ padding: "8px" }}>Profit</th>
                    <th style={{ padding: "8px" }}>Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {aiPlan.monthly_plan.map((m) => (
                    <tr key={m.month} style={{ borderBottom: "1px solid #f2f2f2" }}>
                      <td style={{ padding: "8px" }}>{m.month}</td>
                      <td style={{ padding: "8px" }}>₹{Number(m.revenue).toLocaleString("en-IN")}</td>
                      <td style={{ padding: "8px" }}>₹{Number(m.expenses).toLocaleString("en-IN")}</td>
                      <td style={{ padding: "8px" }}>₹{Number(m.profit).toLocaleString("en-IN")}</td>
                      <td style={{ padding: "8px" }}>{m.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </section>

        )}


        {/* BUSINESS INSIGHT */}

        <section className="monthly-advice">

          <div className="monthly-advice-icon">
            💡
          </div>

          <div>

            <span>
              BUSINESS INSIGHT
            </span>

            <h2>
              {actualProfit > 0
                ? "Your business generated a positive profit."
                : actualProfit === 0
                ? "Your business is currently at break-even."
                : "Your expenses are currently higher than your sales."}
            </h2>

            <p>
              {actualProfit > 0
                ? "Track which products or services generated the most profit and focus on increasing repeat customers."
                : actualProfit === 0
                ? "Look for ways to reduce unnecessary expenses or increase your average order value."
                : "Review your expenses, pricing and sales volume before increasing your investment."}
            </p>

          </div>

        </section>


        {/* ACTIONS */}

        <div className="monthly-actions">

          <button
            onClick={() =>
              setPage("roadmap")
            }
          >
            ← Back to Roadmap
          </button>

          <button
            className="monthly-dashboard-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            Dashboard →
          </button>

        </div>

      </main>

      <Chatbot context={feasibilityContext} />

    </div>
  )
}

export default MonthlyTracker