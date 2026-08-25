import { useEffect, useState } from "react"
import "./Reports.css"

function Reports({ setPage }) {
  const [assessment, setAssessment] = useState(null)
  const [month1, setMonth1] = useState(null)
  const [month2, setMonth2] = useState(null)
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    const savedAssessment =
      localStorage.getItem("gramBizAssessment")

    const savedMonth1 =
      localStorage.getItem("gramBizMonth1")

    const savedMonth2 =
      localStorage.getItem("gramBizMonth2Estimate")

    const savedForecast =
      localStorage.getItem("gramBizYearForecast")

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

    if (savedMonth1) {
      try {
        setMonth1(
          JSON.parse(savedMonth1)
        )
      } catch (error) {
        console.error(
          "Unable to load Month 1:",
          error
        )
      }
    }

    if (savedMonth2) {
      try {
        setMonth2(
          JSON.parse(savedMonth2)
        )
      } catch (error) {
        console.error(
          "Unable to load Month 2:",
          error
        )
      }
    }

    if (savedForecast) {
      try {
        setForecast(
          JSON.parse(savedForecast)
        )
      } catch (error) {
        console.error(
          "Unable to load forecast:",
          error
        )
      }
    }
  }, [])

  /* =========================================================
     SCORE CALCULATION
     ========================================================= */

  const calculateScores = () => {
    if (!assessment) {
      return {
        overall: 0,
        market: 0,
        finance: 0,
        competition: 0,
        opportunity: 0,
      }
    }

    let market = 70
    let finance = 70
    let competition = 70

    const businessType = String(
      assessment.businessType || ""
    ).toLowerCase()

    const investmentNumber =
      Number(
        assessment.investment || 0
      )

    const experience = String(
      assessment.experience || ""
    ).toLowerCase()

    const location = String(
      assessment.location || ""
    ).toLowerCase()

    if (
      businessType.includes("food") ||
      businessType.includes("dairy") ||
      businessType.includes("farm") ||
      businessType.includes("agri") ||
      businessType.includes("farming")
    ) {
      market += 12
    } else if (
      businessType.includes("retail") ||
      businessType.includes("shop") ||
      businessType.includes("store")
    ) {
      market += 9
    } else if (
      businessType.includes("service") ||
      businessType.includes("salon") ||
      businessType.includes("repair") ||
      businessType.includes("tailor") ||
      businessType.includes("tailoring")
    ) {
      market += 8
    } else {
      market += 5
    }

    if (investmentNumber >= 50000) {
      finance += 8
    }

    if (investmentNumber >= 100000) {
      finance += 4
    }

    if (investmentNumber >= 500000) {
      finance += 5
    }

    if (
      experience.includes("experienced") ||
      experience.includes("advanced") ||
      experience.includes("expert")
    ) {
      finance += 10
      competition += 8
    } else if (
      experience.includes("beginner") ||
      experience.includes("new") ||
      experience.includes("no") ||
      experience.includes("less")
    ) {
      market += 4
    } else {
      finance += 4
    }

    if (location.trim() !== "") {
      market += 3
    }

    market = Math.min(market, 95)
    finance = Math.min(finance, 95)
    competition = Math.min(competition, 95)

    const overall = Math.round(
      (
        market +
        finance +
        competition
      ) / 3
    )

    const opportunity = Math.round(
      (
        market +
        competition
      ) / 2
    )

    return {
      overall,
      market,
      finance,
      competition,
      opportunity,
    }
  }

  const scores = calculateScores()

  /* =========================================================
     HELPERS
     ========================================================= */

  const getStatus = () => {
    if (!assessment) {
      return "No Assessment"
    }

    if (scores.overall >= 85) {
      return "Excellent"
    }

    if (scores.overall >= 70) {
      return "Good"
    }

    return "Needs Improvement"
  }

  const getOpportunity = () => {
    if (!assessment) {
      return "Not Available"
    }

    if (scores.opportunity >= 85) {
      return "Excellent Opportunity"
    }

    if (scores.opportunity >= 70) {
      return "Good Opportunity"
    }

    return "Moderate Opportunity"
  }

  const getInsight = () => {
    if (!assessment) {
      return "Complete your business assessment to generate your personalized AI report."
    }

    const business =
      assessment.businessType ||
      "business"

    const location =
      typeof assessment.location === "object"
        ? [
            assessment.location.city,
            assessment.location.district,
            assessment.location.state,
          ]
            .filter(Boolean)
            .join(", ")
        : assessment.location ||
          "your local area"

    if (scores.overall >= 85) {
      return `${business} shows excellent business potential in ${location}. Your market demand and financial readiness are strong. Focus on execution, customer acquisition and sustainable expansion.`
    }

    if (scores.overall >= 70) {
      return `${business} shows good potential in ${location}. Continue monitoring customer demand, competition and operating costs before expanding.`
    }

    return `${business} has potential in ${location}, but additional market research and careful financial planning are recommended before major investment.`
  }

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`
  }

  const getLocationText = () => {
    if (!assessment?.location) {
      return "Not specified"
    }

    if (
      typeof assessment.location ===
      "object"
    ) {
      return [
        assessment.location.city,
        assessment.location.district,
        assessment.location.state,
      ]
        .filter(Boolean)
        .join(", ")
    }

    return assessment.location
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="reports-page">

      {/* HEADER */}

      <header className="reports-header">

        <button
          className="reports-back-btn"
          onClick={() =>
            setPage("dashboard")
          }
        >
          ← Back to Dashboard
        </button>

        <div className="reports-brand">

          <div className="reports-logo">
            G
          </div>

          <div>
            <strong>
              Gram-Biz AI
            </strong>

            <span>
              Smart Business. Stronger Villages
            </span>
          </div>

        </div>

        <button
          className="print-btn"
          onClick={handlePrint}
        >
          🖨 Print Report
        </button>

      </header>


      <main className="reports-container">

        {/* INTRO */}

        <section className="reports-intro">

          <div className="reports-badge">
            ✦ AI BUSINESS REPORT
          </div>

          <h1>
            Your Business
            <span>
              {" "}Assessment Report
            </span>
          </h1>

          <p>
            A complete view of your business
            assessment, financial performance,
            AI forecast and growth opportunities.
          </p>

        </section>


        {!assessment ? (

          <section className="empty-report">

            <div className="empty-icon">
              ✦
            </div>

            <h2>
              No assessment found
            </h2>

            <p>
              Complete a business assessment
              to generate your personalized report.
            </p>

            <button
              onClick={() =>
                setPage("assessment")
              }
            >
              Start Assessment →
            </button>

          </section>

        ) : (

          <>

            {/* BUSINESS SUMMARY */}

            <section className="report-summary">

              <div className="summary-main">

                <span className="report-label">
                  BUSINESS ASSESSMENT
                </span>

                <h2>
                  {assessment.businessType}
                </h2>

                <p>
                  📍 {getLocationText()}
                </p>

              </div>

              <div className="summary-status">

                <span>
                  BUSINESS STATUS
                </span>

                <strong>
                  {getStatus()}
                </strong>

              </div>

            </section>


            {/* SCORE GRID */}

            <section className="report-score-grid">

              <div className="report-score-card">

                <div className="score-card-icon">
                  📊
                </div>

                <span>
                  Overall Score
                </span>

                <strong>
                  {scores.overall}
                  <small>
                    /100
                  </small>
                </strong>

                <p>
                  Business readiness
                </p>

              </div>

              <div className="report-score-card">

                <div className="score-card-icon">
                  📈
                </div>

                <span>
                  Market Demand
                </span>

                <strong>
                  {scores.market}%
                </strong>

                <p>
                  Local market potential
                </p>

              </div>

              <div className="report-score-card">

                <div className="score-card-icon">
                  ₹
                </div>

                <span>
                  Financial Feasibility
                </span>

                <strong>
                  {scores.finance}%
                </strong>

                <p>
                  Investment readiness
                </p>

              </div>

              <div className="report-score-card">

                <div className="score-card-icon">
                  ★
                </div>

                <span>
                  Competition
                </span>

                <strong>
                  {scores.competition}%
                </strong>

                <p>
                  Competitive position
                </p>

              </div>

            </section>


            {/* BUSINESS PROFILE */}

            <section className="report-card">

              <div className="report-card-heading">

                <div>

                  <span>
                    ASSESSMENT DETAILS
                  </span>

                  <h2>
                    Your Business Profile
                  </h2>

                </div>

                <div className="heading-icon">
                  👤
                </div>

              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <span>
                    Business Type
                  </span>

                  <strong>
                    {assessment.businessType}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Location
                  </span>

                  <strong>
                    {getLocationText()}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Available Investment
                  </span>

                  <strong>
                    {formatMoney(
                      assessment.investment
                    )}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Experience
                  </span>

                  <strong>
                    {assessment.experience}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>
                    Preferred Language
                  </span>

                  <strong>
                    {assessment.language}
                  </strong>
                </div>

              </div>

            </section>


            {/* FINANCIAL PERFORMANCE */}

            <section className="report-card">

              <div className="report-card-heading">

                <div>

                  <span>
                    BUSINESS PERFORMANCE
                  </span>

                  <h2>
                    Monthly Financial Tracking
                  </h2>

                </div>

                <div className="heading-icon">
                  ₹
                </div>

              </div>

              {month1 ? (

                <div className="report-finance-grid">

                  <div className="report-finance-item">
                    <span>
                      MONTH 1 SALES
                    </span>

                    <strong>
                      {formatMoney(
                        month1.sales
                      )}
                    </strong>
                  </div>

                  <div className="report-finance-item">
                    <span>
                      MONTH 1 EXPENSES
                    </span>

                    <strong>
                      {formatMoney(
                        month1.expenses
                      )}
                    </strong>
                  </div>

                  <div className="report-finance-item">
                    <span>
                      MONTH 1 PROFIT
                    </span>

                    <strong className="report-profit">
                      {formatMoney(
                        month1.profit
                      )}
                    </strong>
                  </div>

                  <div className="report-finance-item">
                    <span>
                      CUSTOMERS
                    </span>

                    <strong>
                      {month1.customers ||
                        "Not entered"}
                    </strong>
                  </div>

                </div>

              ) : (

                <div className="report-empty-inline">

                  <span>
                    📊
                  </span>

                  <div>
                    <strong>
                      Month 1 data not entered yet
                    </strong>

                    <p>
                      Go to Business Roadmap and
                      record your first month's
                      actual sales and expenses.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setPage("roadmap")
                    }
                  >
                    Open Roadmap →
                  </button>

                </div>

              )}

            </section>


            {/* AI FORECAST */}

            <section className="report-card">

              <div className="report-card-heading">

                <div>

                  <span>
                    AI BUSINESS FORECAST
                  </span>

                  <h2>
                    Month 2 Prediction
                  </h2>

                </div>

                <div className="heading-icon">
                  🤖
                </div>

              </div>

              {month2 ? (

                <>

                  <div className="report-finance-grid">

                    <div className="report-finance-item">
                      <span>
                        ESTIMATED SALES
                      </span>

                      <strong>
                        {formatMoney(
                          month2.estimatedSales
                        )}
                      </strong>
                    </div>

                    <div className="report-finance-item">
                      <span>
                        ESTIMATED EXPENSES
                      </span>

                      <strong>
                        {formatMoney(
                          month2.estimatedExpenses
                        )}
                      </strong>
                    </div>

                    <div className="report-finance-item">
                      <span>
                        ESTIMATED PROFIT
                      </span>

                      <strong className="report-profit">
                        {formatMoney(
                          month2.estimatedProfit
                        )}
                      </strong>
                    </div>

                    <div className="report-finance-item">
                      <span>
                        EXPECTED GROWTH
                      </span>

                      <strong>
                        +{month2.growthRate}%
                      </strong>
                    </div>

                  </div>

                  <div className="report-forecast-note">
                    <strong>
                      ✦ Planning estimate
                    </strong>

                    <p>
                      This estimate is based on your
                      Month 1 performance and is not
                      a guaranteed result.
                    </p>
                  </div>

                </>

              ) : (

                <div className="report-empty-inline">

                  <span>
                    🤖
                  </span>

                  <div>
                    <strong>
                      AI forecast not available yet
                    </strong>

                    <p>
                      Save Month 1 performance in
                      your Business Roadmap to
                      generate the prediction.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setPage("roadmap")
                    }
                  >
                    Add Month 1 →
                  </button>

                </div>

              )}

            </section>


            {/* 12 MONTH FORECAST */}

            {forecast.length > 0 && (

              <section className="report-card">

                <div className="report-card-heading">

                  <div>

                    <span>
                      12-MONTH OUTLOOK
                    </span>

                    <h2>
                      Yearly Growth Forecast
                    </h2>

                  </div>

                  <div className="heading-icon">
                    📈
                  </div>

                </div>

                <div className="report-forecast-grid">

                  {forecast.map(
                    (item) => (

                      <div
                        className="report-forecast-card"
                        key={item.month}
                      >

                        <span>
                          {item.month}
                        </span>

                        <div>
                          <small>
                            SALES
                          </small>

                          <strong>
                            {formatMoney(
                              item.sales
                            )}
                          </strong>
                        </div>

                        <div>
                          <small>
                            PROFIT
                          </small>

                          <strong>
                            {formatMoney(
                              item.profit
                            )}
                          </strong>
                        </div>

                      </div>

                    )
                  )}

                </div>

              </section>

            )}


            {/* ANALYSIS */}

            <section className="report-card">

              <div className="report-card-heading">

                <div>

                  <span>
                    AI ANALYSIS
                  </span>

                  <h2>
                    Business Health Analysis
                  </h2>

                </div>

                <div className="heading-icon">
                  ✦
                </div>

              </div>

              <div className="analysis-list">

                <div className="analysis-item">

                  <div className="analysis-top">
                    <span>
                      Market Demand
                    </span>

                    <strong>
                      {scores.market}%
                    </strong>
                  </div>

                  <div className="analysis-bar">
                    <div
                      style={{
                        width:
                          `${scores.market}%`,
                      }}
                    />
                  </div>

                  <p>
                    Your selected business shows
                    favorable potential in the local
                    market.
                  </p>

                </div>

                <div className="analysis-item">

                  <div className="analysis-top">
                    <span>
                      Financial Feasibility
                    </span>

                    <strong>
                      {scores.finance}%
                    </strong>
                  </div>

                  <div className="analysis-bar">
                    <div
                      style={{
                        width:
                          `${scores.finance}%`,
                      }}
                    />
                  </div>

                  <p>
                    Your available investment provides
                    a reasonable starting point for the
                    proposed business.
                  </p>

                </div>

                <div className="analysis-item">

                  <div className="analysis-top">
                    <span>
                      Competitive Position
                    </span>

                    <strong>
                      {scores.competition}%
                    </strong>
                  </div>

                  <div className="analysis-bar">
                    <div
                      style={{
                        width:
                          `${scores.competition}%`,
                      }}
                    />
                  </div>

                  <p>
                    Build your competitive advantage
                    through pricing, quality and
                    customer service.
                  </p>

                </div>

              </div>

            </section>


            {/* OPPORTUNITY */}

            <section className="report-opportunity">

              <div className="opportunity-icon">
                ✦
              </div>

              <div>

                <span>
                  MARKET OPPORTUNITY
                </span>

                <h2>
                  {getOpportunity()}
                </h2>

                <p>
                  Your business has a{" "}
                  {scores.opportunity >= 85
                    ? "high"
                    : scores.opportunity >= 70
                    ? "good"
                    : "moderate"}{" "}
                  opportunity for growth.
                </p>

              </div>

              <div className="opportunity-score">
                {scores.opportunity}%
              </div>

            </section>


            {/* AI GUIDANCE */}

            <section className="ai-report-card">

              <div className="ai-report-icon">
                ✦
              </div>

              <div>

                <span>
                  PERSONALIZED AI GUIDANCE
                </span>

                <h2>
                  Recommended Next Step
                </h2>

                <p>
                  {getInsight()}
                </p>

              </div>

            </section>


            {/* ACTIONS */}

            <section className="report-actions">

              <button
                className="secondary-report-btn"
                onClick={() =>
                  setPage("assessment")
                }
              >
                ✦ New Assessment
              </button>

              <button
                className="secondary-report-btn"
                onClick={() =>
                  setPage("roadmap")
                }
              >
                🗺 Open Roadmap
              </button>

              <button
                className="primary-report-btn"
                onClick={() =>
                  setPage("loans")
                }
              >
                Explore Loan Schemes →
              </button>

            </section>

          </>

        )}

      </main>

    </div>
  )
}

export default Reports