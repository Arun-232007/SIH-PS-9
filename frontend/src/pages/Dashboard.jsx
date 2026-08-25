import { useEffect, useState } from "react"
import "./Dashboard.css"
import Chatbot from "../components/Chatbot"

function Dashboard({ setPage }) {
  const [assessment, setAssessment] = useState(null)
  // Real result from POST /assessment/ (financial, business/SWOT,
  // market, risk, feasibility) — the source of truth for this page.
  const [apiResult, setApiResult] = useState(null)

  useEffect(() => {
    const savedData =
      localStorage.getItem("gramBizAssessment")

    if (savedData) {
      try {
        setAssessment(
          JSON.parse(savedData)
        )
      } catch (error) {
        console.error(
          "Unable to load assessment:",
          error
        )
      }
    }

    const savedResult =
      localStorage.getItem("gramBizAssessmentResult")

    if (savedResult) {
      try {
        setApiResult(
          JSON.parse(savedResult)
        )
      } catch (error) {
        console.error(
          "Unable to load AI assessment result:",
          error
        )
      }
    }
  }, [])

  /* =========================================================
     SCORE CALCULATION
     ========================================================= */

  const calculateScores = () => {
    // Prefer real numbers from the Gram-Biz AI backend
    // (POST /assessment/ -> feasibility.*) when available.
    if (apiResult?.feasibility) {
      const f = apiResult.feasibility

      const overall = Math.round(f.overall_score || 0)
      const market = Math.round(f.market_score || 0)
      const finance = Math.round(f.financial_score || 0)
      // Backend gives a risk_score (higher = riskier); invert it into
      // a "competition/resilience" style score so the existing UI
      // (which expects higher = better) keeps working unchanged.
      const competition = Math.round(100 - (f.risk_score || 0))
      const opportunity = Math.round((market + competition) / 2)

      return { overall, market, finance, competition, opportunity }
    }

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

    const investment = String(
      assessment.investment || ""
    ).toLowerCase()

    const experience = String(
      assessment.experience || ""
    ).toLowerCase()

    const location = assessment.location

    /* =====================================================
       BUSINESS TYPE
       ===================================================== */

    if (
      businessType.includes("food") ||
      businessType.includes("dairy") ||
      businessType.includes("farm") ||
      businessType.includes("agri") ||
      businessType.includes("agriculture") ||
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

    /* =====================================================
       INVESTMENT
       ===================================================== */

    if (
      investment.includes("1") ||
      investment.includes("2") ||
      investment.includes("3") ||
      investment.includes("5")
    ) {
      finance += 8
    }

    if (
      investment.includes("10") ||
      investment.includes("large") ||
      investment.includes("high")
    ) {
      finance += 12
    }

    /* =====================================================
       EXPERIENCE
       ===================================================== */

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
      experience.includes("less than")
    ) {
      market += 4
    } else {
      finance += 4
    }

    /* =====================================================
       LOCATION
       ===================================================== */

    if (location) {
      if (
        typeof location === "string" &&
        location.trim() !== ""
      ) {
        market += 3
      }

      if (
        typeof location === "object" &&
        Object.values(location)
          .some(
            (value) =>
              String(value || "").trim() !== ""
          )
      ) {
        market += 3
      }
    }

    market = Math.min(
      market,
      95
    )

    finance = Math.min(
      finance,
      95
    )

    competition = Math.min(
      competition,
      95
    )

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
     LOCATION
     ========================================================= */

  const getLocationText = () => {
    const location =
      assessment?.location

    if (!location) {
      return "your local area"
    }

    if (
      typeof location === "string"
    ) {
      return location
    }

    if (
      typeof location === "object"
    ) {
      return [
        location.city,
        location.district,
        location.state,
      ]
        .filter(Boolean)
        .join(", ") || "your local area"
    }

    return "your local area"
  }

  const locationText =
    getLocationText()

  /* =========================================================
     STATUS HELPERS
     ========================================================= */

  const getBusinessStatus = () => {
    if (apiResult?.feasibility?.decision) {
      const decision = apiResult.feasibility.decision

      if (decision === "HIGHLY FEASIBLE") return "Excellent"
      if (decision === "FEASIBLE WITH MODERATE RISK") return "Good"
      if (decision === "MARGINALLY FEASIBLE") return "Needs Work"
      return "High Risk"
    }

    if (!assessment) {
      return "Pending"
    }

    if (scores.overall >= 85) {
      return "Excellent"
    }

    if (scores.overall >= 70) {
      return "Good"
    }

    return "Needs Work"
  }

  const getOpportunityStatus = () => {
    if (apiResult?.market?.opportunity) {
      return `${apiResult.market.opportunity} Opportunity`
    }

    if (!assessment) {
      return "Complete Assessment"
    }

    if (scores.opportunity >= 85) {
      return "Excellent Opportunity"
    }

    if (scores.opportunity >= 70) {
      return "Good Opportunity"
    }

    return "Moderate Opportunity"
  }

  const getRecommendation = () => {
    if (apiResult?.feasibility?.recommendation) {
      return apiResult.feasibility.recommendation
    }

    if (!assessment) {
      return "Complete your business assessment to receive personalized recommendations."
    }

    if (scores.finance < 75) {
      return "Focus on financial planning, budgeting and understanding your investment requirements."
    }

    if (scores.market < 75) {
      return "Focus on local market research and understanding customer demand in your area."
    }

    if (scores.competition < 75) {
      return "Focus on your competitive strategy and identify ways to differentiate your business."
    }

    return "Your business shows strong potential. Focus on execution, customer growth and sustainable expansion."
  }

  /* =========================================================
     LOAN LEVEL
     ========================================================= */

  const getLoanLevel = () => {
    if (!assessment && !apiResult) {
      return "--"
    }

    if (scores.finance >= 80) {
      return "High"
    }

    if (scores.finance >= 65) {
      return "Medium"
    }

    return "Low"
  }

  /* =========================================================
     OPEN LOAN SCHEME
     ========================================================= */

  const openLoanScheme = (schemeId) => {
    localStorage.setItem(
      "gramBizSelectedScheme",
      schemeId
    )

    setPage("loans")
  }

  return (
    <div className="dashboard-page">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">

          <div className="logo-icon">
            G
          </div>

          <div>
            <h2>
              Gram-Biz AI
            </h2>

            <span>
              AI Assistant
            </span>
          </div>

        </div>


        <nav className="dashboard-nav">

          <button
            className="nav-item active"
            onClick={() =>
              setPage("dashboard")
            }
          >
            <span>
              ⌂
            </span>

            Dashboard
          </button>


          <button
            className="nav-item"
            onClick={() =>
              setPage("assessment")
            }
          >
            <span>
              ✦
            </span>

            New Assessment
          </button>


          <button
            className="nav-item"
            onClick={() =>
              setPage("reports")
            }
          >
            <span>
              ▣
            </span>

            My Reports
          </button>


          <button
            className="nav-item"
            onClick={() =>
              setPage("loans")
            }
          >
            <span>
              ₹
            </span>

            Loan Schemes
          </button>


          <button
            className="nav-item"
            onClick={() =>
              setPage("roadmap")
            }
          >
            <span>
              🗺
            </span>

            Business Roadmap
          </button>

        </nav>


        <div className="sidebar-bottom">

          <div className="help-card">

            <span className="help-icon">
              ?
            </span>

            <div>

              <strong>
                Need Help?
              </strong>

              <p>
                Get guidance for your business.
              </p>

            </div>

          </div>


          <button
            className="back-home"
            onClick={() =>
              setPage("home")
            }
          >
            ← Back to Home
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          <div className="dashboard-header-content">

            <p className="welcome-text">
              Welcome back 👋
            </p>

            <h1>
              {assessment?.businessType
                ? `${assessment.businessType} Dashboard`
                : "Your Business Dashboard"}
            </h1>

            <p className="header-description">
              {assessment
                ? `AI-powered insights for your business in ${locationText}.`
                : "Get AI-powered insights for your rural business journey."}
            </p>

          </div>


          <button
            className="new-assessment-btn"
            onClick={() =>
              setPage("assessment")
            }
          >
            + New Assessment
          </button>

        </header>


        {/* BUSINESS INFORMATION */}

        {assessment && (

          <section className="dashboard-business-info">

            <div>

              <span>
                BUSINESS TYPE
              </span>

              <strong>
                {assessment.businessType ||
                  "Not specified"}
              </strong>

            </div>


            <div>

              <span>
                LOCATION
              </span>

              <strong>
                {locationText ||
                  "Not specified"}
              </strong>

            </div>


            <div>

              <span>
                INVESTMENT
              </span>

              <strong>
                ₹
                {Number(
                  assessment.investment || 0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <div>

              <span>
                EXPERIENCE
              </span>

              <strong>
                {assessment.experience ||
                  "Not specified"}
              </strong>

            </div>

          </section>

        )}


        {/* STAT CARDS */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon blue">
              📊
            </div>

            <div>

              <span>
                Business Score
              </span>

              <strong>
                {assessment
                  ? scores.overall
                  : "--"}

                <span>
                  /100
                </span>
              </strong>

              <small>
                {assessment
                  ? "Based on your assessment"
                  : "Complete an assessment"}
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>

              <span>
                Loan Eligibility
              </span>

              <strong>
                {getLoanLevel()}
              </strong>

              <small>
                {assessment
                  ? "3 schemes matched"
                  : "Complete an assessment"}
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon purple">
              ₹
            </div>

            <div>

              <span>
                Estimated Funding
              </span>

              <strong>
                {assessment?.investment
                  ? `₹${Number(
                      assessment.investment
                    ).toLocaleString(
                      "en-IN"
                    )}`
                  : "₹4.5L"}
              </strong>

              <small>
                Based on your assessment
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              ★
            </div>

            <div>

              <span>
                Market Potential
              </span>

              <strong>
                {assessment
                  ? scores.opportunity >= 85
                    ? "Excellent"
                    : scores.opportunity >= 70
                    ? "Strong"
                    : "Moderate"
                  : "--"}
              </strong>

              <small>
                {assessment
                  ? "Based on market analysis"
                  : "Complete an assessment"}
              </small>

            </div>

          </div>

        </section>


        {/* BUSINESS HEALTH + MARKET */}

        <section className="dashboard-grid">

          <div className="dashboard-card score-card">

            <div className="card-heading">

              <div>

                <span className="card-label">
                  BUSINESS HEALTH
                </span>

                <h2>
                  Business Readiness Score
                </h2>

              </div>

              <span className="status-badge">
                {getBusinessStatus()}
              </span>

            </div>


            <div className="score-content">

              <div className="score-circle">

                <div>

                  <strong>
                    {assessment
                      ? scores.overall
                      : "--"}
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

              </div>


              <div className="score-details">

                <p>
                  {assessment
                    ? `Your ${
                        assessment.businessType ||
                        "business"
                      } idea shows ${
                        scores.overall >= 85
                          ? "excellent"
                          : scores.overall >= 70
                          ? "strong"
                          : "developing"
                      } potential in ${locationText}.`
                    : "Complete your business assessment to receive personalized insights."}
                </p>


                <div className="progress-item">

                  <div>

                    <span>
                      Market Demand
                    </span>

                    <b>
                      {assessment
                        ? `${scores.market}%`
                        : "--"}
                    </b>

                  </div>

                  <div className="progress-bar">

                    <div
                      style={{
                        width:
                          assessment
                            ? `${scores.market}%`
                            : "0%",
                      }}
                    />

                  </div>

                </div>


                <div className="progress-item">

                  <div>

                    <span>
                      Financial Feasibility
                    </span>

                    <b>
                      {assessment
                        ? `${scores.finance}%`
                        : "--"}
                    </b>

                  </div>

                  <div className="progress-bar">

                    <div
                      style={{
                        width:
                          assessment
                            ? `${scores.finance}%`
                            : "0%",
                      }}
                    />

                  </div>

                </div>


                <div className="progress-item">

                  <div>

                    <span>
                      Competition
                    </span>

                    <b>
                      {assessment
                        ? `${scores.competition}%`
                        : "--"}
                    </b>

                  </div>

                  <div className="progress-bar">

                    <div
                      style={{
                        width:
                          assessment
                            ? `${scores.competition}%`
                            : "0%",
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>


          <div className="dashboard-card opportunity-card">

            <div className="card-heading">

              <div>

                <span className="card-label">
                  AI INSIGHT
                </span>

                <h2>
                  Market Opportunity
                </h2>

              </div>

              <span className="insight-icon">
                ✦
              </span>

            </div>


            <div className="opportunity-content">

              <div className="opportunity-number">
                {assessment
                  ? `${scores.opportunity}%`
                  : "--"}
              </div>

              <h3>
                {getOpportunityStatus()}
              </h3>

              <p>
                {assessment
                  ? `Based on local demand, competition and estimated profitability, your ${
                      assessment.businessType ||
                      "business"
                    } has ${
                      scores.opportunity >= 85
                        ? "excellent"
                        : scores.opportunity >= 70
                        ? "good"
                        : "moderate"
                    } opportunity for growth.`
                  : "Complete your assessment to receive personalized market opportunity insights."}
              </p>


              <div className="opportunity-tags">

                <span>
                  High Demand
                </span>

                <span>
                  Low Competition
                </span>

                <span>
                  Good Margin
                </span>

              </div>


              {assessment && (

                <div className="dashboard-recommendation">

                  <strong>
                    ✦ AI Recommendation
                  </strong>

                  <p>
                    {getRecommendation()}
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>


        {/* AI FINANCIAL STRUCTURE (real backend data) */}

        {apiResult?.financial && (

          <section className="dashboard-card">

            <div className="card-heading">

              <div>

                <span className="card-label">
                  AI FINANCIAL STRUCTURING
                </span>

                <h2>
                  Project Cost, Loan &amp; EMI
                </h2>

              </div>

              <span className="insight-icon">
                ₹
              </span>

            </div>

            <div className="dashboard-business-info">

              <div>
                <span>PROJECT COST</span>
                <strong>
                  ₹{Number(apiResult.financial.project_cost || 0).toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>LOAN AMOUNT</span>
                <strong>
                  ₹{Number(apiResult.financial.loan_amount || 0).toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>SCHEME</span>
                <strong>
                  {apiResult.financial.scheme_name || "--"}
                </strong>
              </div>

              <div>
                <span>MONTHLY EMI</span>
                <strong>
                  ₹{Number(apiResult.financial.emi || 0).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            {apiResult.financial.interest_rate != null && (
              <p style={{ marginTop: "12px" }}>
                Interest rate {apiResult.financial.interest_rate}% · Tenure{" "}
                {apiResult.financial.tenure_years} years · Moratorium{" "}
                {apiResult.financial.moratorium_months} months. Total repayment
                over the loan term is estimated at ₹
                {Number(apiResult.financial.total_repayment || 0).toLocaleString("en-IN")}.
              </p>
            )}

          </section>

        )}


        {/* AI SWOT (real backend data) */}

        {apiResult?.business && (

          <section className="dashboard-grid">

            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span className="card-label">STRENGTHS</span>
                  <h2>What's working for you</h2>
                </div>
              </div>
              <ul>
                {apiResult.business.strengths.map((item, i) => (
                  <li key={i} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span className="card-label">WEAKNESSES</span>
                  <h2>What to watch out for</h2>
                </div>
              </div>
              <ul>
                {apiResult.business.weaknesses.map((item, i) => (
                  <li key={i} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span className="card-label">OPPORTUNITIES</span>
                  <h2>Where you can grow</h2>
                </div>
              </div>
              <ul>
                {apiResult.business.opportunities.map((item, i) => (
                  <li key={i} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span className="card-label">THREATS</span>
                  <h2>What could go wrong</h2>
                </div>
              </div>
              <ul>
                {apiResult.business.threats.map((item, i) => (
                  <li key={i} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
              </ul>
            </div>

          </section>

        )}


        {/* ROADMAP */}

        <section className="dashboard-card roadmap-preview">

          <div className="roadmap-preview-inner">

            <div className="roadmap-preview-icon">
              🗺
            </div>

            <div className="roadmap-preview-content">

              <span className="card-label">
                AI BUSINESS JOURNEY
              </span>

              <h2>
                Your Business Roadmap
              </h2>

              <p>
                Follow a simple step-by-step journey from
                business idea to launch, growth and expansion.
              </p>

              <button
                className="roadmap-open-btn"
                onClick={() =>
                  setPage("roadmap")
                }
              >
                Open Roadmap →
              </button>

            </div>

          </div>

        </section>


        {/* ACTION CENTER */}

        <section className="dashboard-card action-center">

          <div className="action-center-header">

            <div>

              <span className="card-label">
                BEGINNER BUSINESS ASSISTANT
              </span>

              <h2>
                What Should I Do Next?
              </h2>

              <p className="action-center-description">
                Don't know where to start? Choose a task and
                Gram-Biz AI will guide you step-by-step.
              </p>

            </div>

            <div className="action-center-badge">
              ✦ AI Guided
            </div>

          </div>


          <div className="action-grid">

            {/* BUSINESS PLAN */}

            <div className="action-card">

              <div className="action-icon">
                📝
              </div>

              <div className="action-content">

                <h3>
                  Build Business Plan
                </h3>

                <p>
                  Create a simple business plan even if
                  you have never written one before.
                </p>

                <button
                  onClick={() =>
                    setPage("business-plan")
                  }
                >
                  Start →
                </button>

              </div>

            </div>


            {/* STARTUP COST */}

            <div className="action-card">

              <div className="action-icon">
                💰
              </div>

              <div className="action-content">

                <h3>
                  Calculate Startup Cost
                </h3>

                <p>
                  Understand exactly what equipment,
                  materials and setup cost you may need.
                </p>

                <button
                  onClick={() =>
                    setPage("calculator")
                  }
                >
                  Start →
                </button>

              </div>

            </div>


            {/* CUSTOMERS */}

            <div className="action-card">

              <div className="action-icon">
                👥
              </div>

              <div className="action-content">

                <h3>
                  Understand Customers
                </h3>

                <p>
                  Identify your target customers and
                  understand what they actually need.
                </p>

                <button
                  onClick={() =>
                    setPage("customers")
                  }
                >
                  Start →
                </button>

              </div>

            </div>


            {/* LOCAL MARKET */}

            <div className="action-card">

              <div className="action-icon">
                📍
              </div>

              <div className="action-content">

                <h3>
                  Check Local Market
                </h3>

                <p>
                  Learn about demand, competitors and
                  opportunities around your area.
                </p>

                <button
                  onClick={() =>
                    setPage("market")
                  }
                >
                  Start →
                </button>

              </div>

            </div>


            {/* FUNDING */}

            <div className="action-card">

              <div className="action-icon">
                🏦
              </div>

              <div className="action-content">

                <h3>
                  Explore Funding
                </h3>

                <p>
                  Discover loans, subsidies and funding
                  options suitable for your business.
                </p>

                <button
                  onClick={() =>
                    setPage("loans")
                  }
                >
                  Explore →
                </button>

              </div>

            </div>


            {/* MARKETING */}

            <div className="action-card">

              <div className="action-icon">
                📢
              </div>

              <div className="action-content">

                <h3>
                  Create Marketing Plan
                </h3>

                <p>
                  Learn simple ways to promote your
                  business and reach more customers.
                </p>

                <button
                  onClick={() =>
                    setPage("marketing")
                  }
                >
                  Start →
                </button>

              </div>

            </div>


            {/* MONTHLY TRACKER */}

            <div className="action-card">

              <div className="action-icon">
                📈
              </div>

              <div className="action-content">

                <h3>
                  Track Monthly Performance
                </h3>

                <p>
                  Log your real sales and expenses and get
                  an AI-generated 12-month guidance plan.
                </p>

                <button
                  onClick={() =>
                    setPage("monthly-tracker")
                  }
                >
                  Start →
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* LOAN SECTION */}

        <section className="dashboard-card loan-section">

          <div className="card-heading">

            <div>

              <span className="card-label">
                GOVERNMENT SUPPORT
              </span>

              <h2>
                Recommended Loan Schemes
              </h2>

            </div>

            <button
              className="view-all-btn"
              onClick={() =>
                setPage("loans")
              }
            >
              View all →
            </button>

          </div>


          <div className="loan-grid">

            {/* MUDRA */}

            <div className="loan-card">

              <div className="loan-top">

                <div className="loan-logo">
                  M
                </div>

                <span className="match-badge">
                  94% Match
                </span>

              </div>

              <h3>
                MUDRA Loan
              </h3>

              <p>
                Micro Units Development and Refinance Agency
              </p>

              <div className="loan-info">

                <div>

                  <span>
                    Loan Amount
                  </span>

                  <strong>
                    Up to ₹10L
                  </strong>

                </div>

                <div>

                  <span>
                    Interest
                  </span>

                  <strong>
                    Competitive
                  </strong>

                </div>

              </div>

              <button
                className="scheme-btn"
                onClick={() =>
                  openLoanScheme("mudra")
                }
              >
                Check Eligibility
              </button>

            </div>


            {/* STAND-UP INDIA */}

            <div className="loan-card">

              <div className="loan-top">

                <div className="loan-logo green-logo">
                  S
                </div>

                <span className="match-badge">
                  89% Match
                </span>

              </div>

              <h3>
                Stand-Up India
              </h3>

              <p>
                Support for new entrepreneurs and enterprises
              </p>

              <div className="loan-info">

                <div>

                  <span>
                    Loan Amount
                  </span>

                  <strong>
                    ₹10L – ₹1Cr
                  </strong>

                </div>

                <div>

                  <span>
                    Tenure
                  </span>

                  <strong>
                    Up to 7 yrs
                  </strong>

                </div>

              </div>

              <button
                className="scheme-btn"
                onClick={() =>
                  openLoanScheme("standup")
                }
              >
                Check Eligibility
              </button>

            </div>


            {/* PMEGP */}

            <div className="loan-card">

              <div className="loan-top">

                <div className="loan-logo orange-logo">
                  P
                </div>

                <span className="match-badge">
                  84% Match
                </span>

              </div>

              <h3>
                PMEGP
              </h3>

              <p>
                Prime Minister's Employment Generation Programme
              </p>

              <div className="loan-info">

                <div>

                  <span>
                    Subsidy
                  </span>

                  <strong>
                    Up to 35%
                  </strong>

                </div>

                <div>

                  <span>
                    Loan Type
                  </span>

                  <strong>
                    Business
                  </strong>

                </div>

              </div>

              <button
                className="scheme-btn"
                onClick={() =>
                  openLoanScheme("pmegp")
                }
              >
                Check Eligibility
              </button>

            </div>

          </div>

        </section>


        {/* FINAL GUIDANCE */}

        {assessment && (

          <section className="dashboard-card dashboard-tip">

            <div className="tip-icon">
              ✦
            </div>

            <div>

              <span className="card-label">
                PERSONALIZED GUIDANCE
              </span>

              <h2>
                Your Next Step
              </h2>

              <p>
                {getRecommendation()}
              </p>

            </div>

          </section>

        )}

      </main>

      <Chatbot context={apiResult?.feasibility || null} />

    </div>
  )
}

export default Dashboard