import { useEffect, useState } from "react"
import "./LoanSchemes.css"

function LoanSchemes({ setPage }) {
  const [assessment, setAssessment] = useState(null)
  const [selectedScheme, setSelectedScheme] = useState(null)

  /* =========================================================
     LOAD ASSESSMENT
     ========================================================= */

  useEffect(() => {
    const savedData =
      localStorage.getItem(
        "gramBizAssessment"
      )

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
  }, [])

  /* =========================================================
     BUSINESS DATA
     ========================================================= */

  const businessType = String(
    assessment?.businessType || ""
  ).toLowerCase()

  const investment = Number(
    assessment?.investment || 0
  )

  const experience = String(
    assessment?.experience || ""
  ).toLowerCase()

  /* =========================================================
     BUSINESS CATEGORY
     ========================================================= */

  const getBusinessCategory = () => {
    if (
      businessType.includes("dairy") ||
      businessType.includes("milk")
    ) {
      return "Dairy Farming"
    }

    if (
      businessType.includes("tailor") ||
      businessType.includes("stitch")
    ) {
      return "Tailoring"
    }

    if (
      businessType.includes("agri") ||
      businessType.includes("farm") ||
      businessType.includes("agriculture") ||
      businessType.includes("farming")
    ) {
      return "Agriculture"
    }

    if (
      businessType.includes("food") ||
      businessType.includes("snack") ||
      businessType.includes("bakery") ||
      businessType.includes("catering")
    ) {
      return "Food Business"
    }

    if (
      businessType.includes("salon") ||
      businessType.includes("beauty")
    ) {
      return "Beauty & Salon"
    }

    if (
      businessType.includes("repair") ||
      businessType.includes("mobile") ||
      businessType.includes("electronics")
    ) {
      return "Repair & Service"
    }

    if (
      businessType.includes("retail") ||
      businessType.includes("shop") ||
      businessType.includes("store")
    ) {
      return "Retail Business"
    }

    return "General Business"
  }

  /* =========================================================
     ELIGIBILITY CALCULATION
     ========================================================= */

  const getEligibility = (schemeName) => {
    if (!assessment) {
      return {
        status: "Assessment Required",
        score: 0,
        message:
          "Complete your business assessment first so Gram-Biz AI can provide a personalized pre-screening.",
        reasons: [
          "Business profile is not available",
          "Investment requirement is not available",
          "Experience information is not available",
        ],
      }
    }

    let score = 60
    const reasons = []

    const category =
      getBusinessCategory()

    /* AGRICULTURE / ALLIED */

    if (
      category === "Dairy Farming" ||
      category === "Agriculture"
    ) {
      score += 8

      reasons.push(
        "Your business falls under an agriculture/allied activity."
      )
    }

    /* MICRO BUSINESS */

    if (
      category === "Food Business" ||
      category === "Tailoring" ||
      category === "Retail Business" ||
      category === "Repair & Service"
    ) {
      score += 7

      reasons.push(
        "Your business category is commonly suitable for micro-business financing."
      )
    }

    /* INVESTMENT */

    if (investment > 0) {
      score += 8

      reasons.push(
        "Your investment requirement has been provided."
      )
    }

    /* EXPERIENCE */

    if (
      experience.includes("experienced") ||
      experience.includes("more than")
    ) {
      score += 8

      reasons.push(
        "Your stated experience may strengthen your business readiness."
      )
    } else if (
      experience.includes("less than") ||
      experience.includes("beginner")
    ) {
      score += 3

      reasons.push(
        "You are a newer entrepreneur; preparation and documentation become especially important."
      )
    }

    /* SCHEME */

    if (
      schemeName === "MUDRA Loan"
    ) {
      score += 5

      reasons.push(
        "MUDRA is being shown as a strong micro-business funding option."
      )
    }

    if (
      schemeName === "PMEGP"
    ) {
      score += 4

      reasons.push(
        "PMEGP may be relevant for eligible new micro-enterprise proposals."
      )
    }

    if (
      schemeName === "Stand-Up India"
    ) {
      score += 2

      reasons.push(
        "This scheme can be relevant for eligible new enterprise applicants."
      )
    }

    if (
      schemeName === "MSME Support"
    ) {
      score += 4

      reasons.push(
        "MSME-related support can help businesses formalize and grow."
      )
    }

    score = Math.min(
      score,
      95
    )

    let status =
      "Moderate Match"

    if (score >= 85) {
      status = "Strong Match"
    } else if (score >= 75) {
      status = "Good Match"
    }

    return {
      status,
      score,
      message:
        "Your profile looks suitable for further checking. This is a Gram-Biz AI pre-screening, not an official approval.",
      reasons,
    }
  }

  /* =========================================================
     SCHEMES
     ========================================================= */

  const schemes = [
    {
      id: "mudra",
      name: "MUDRA Loan",
      logo: "M",
      logoClass: "mudra",
      match: "94% Match",
      description:
        "Micro Units Development and Refinance Agency provides support for eligible micro and small businesses.",
      details: [
        [
          "LOAN AMOUNT",
          "Up to ₹10 Lakhs",
        ],
        [
          "TYPE",
          "Business Loan",
        ],
        [
          "INTEREST",
          "Competitive",
        ],
        [
          "COLLATERAL",
          "Based on lender",
        ],
      ],
    },

    {
      id: "standup",
      name: "Stand-Up India",
      logo: "S",
      logoClass: "standup",
      match: "89% Match",
      description:
        "Funding support for eligible entrepreneurs starting new enterprises.",
      details: [
        [
          "LOAN AMOUNT",
          "₹10 Lakhs – ₹1 Crore",
        ],
        [
          "TYPE",
          "Enterprise Loan",
        ],
        [
          "TENURE",
          "Up to 7 years",
        ],
        [
          "SUPPORT",
          "New Entrepreneurs",
        ],
      ],
    },

    {
      id: "pmegp",
      name: "PMEGP",
      logo: "P",
      logoClass: "pmegp",
      match: "84% Match",
      description:
        "Prime Minister's Employment Generation Programme supports eligible new micro-enterprises.",
      details: [
        [
          "SUBSIDY",
          "Up to 35%",
        ],
        [
          "TYPE",
          "Business",
        ],
        [
          "TARGET",
          "New Enterprises",
        ],
        [
          "SUPPORT",
          "Employment Generation",
        ],
      ],
    },

    {
      id: "msme",
      name: "MSME Support",
      logo: "₹",
      logoClass: "msme",
      match: "81% Match",
      description:
        "Explore financing and support options for eligible micro, small and medium enterprises.",
      details: [
        [
          "CATEGORY",
          "MSME",
        ],
        [
          "SUPPORT",
          "Finance",
        ],
        [
          "TARGET",
          "Small Businesses",
        ],
        [
          "BENEFIT",
          "Business Growth",
        ],
      ],
    },
  ]

  /* =========================================================
     OPEN ELIGIBILITY
     ========================================================= */

  const openEligibility = (scheme) => {
    const result =
      getEligibility(
        scheme.name
      )

    setSelectedScheme({
      scheme,
      result,
    })
  }

  /* =========================================================
     AUTO OPEN SELECTED SCHEME
     ========================================================= */

  useEffect(() => {
    const selectedId =
      localStorage.getItem(
        "gramBizSelectedScheme"
      )

    if (!selectedId) {
      return
    }

    const selected =
      schemes.find(
        (scheme) =>
          scheme.id === selectedId
      )

    if (selected) {
      const result =
        getEligibility(
          selected.name
        )

      setSelectedScheme({
        scheme: selected,
        result,
      })
    }

    localStorage.removeItem(
      "gramBizSelectedScheme"
    )
  }, [assessment])

  /* =========================================================
     PAGE
     ========================================================= */

  return (
    <div className="loan-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="loan-page-header">

        <div>

          <button
            className="loan-back-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <span className="loan-eyebrow">
            GOVERNMENT SUPPORT
          </span>

          <h1>
            Loan Schemes
          </h1>

          <p>
            Explore suitable government schemes and funding
            opportunities for your business.
          </p>

        </div>

        <div className="loan-header-icon">
          ₹
        </div>

      </header>


      {/* =====================================================
          AI RECOMMENDATION
          ===================================================== */}

      <section className="loan-recommendation">

        <div className="recommendation-icon">
          ✦
        </div>

        <div>

          <span>
            AI RECOMMENDATION
          </span>

          <h2>
            Schemes matched to your business
          </h2>

          <p>
            {assessment
              ? `Gram-Biz AI has reviewed your ${
                  assessment.businessType ||
                  "business"
                } profile and prepared these options for further checking.`
              : "Complete your assessment to receive personalized scheme recommendations."}
          </p>

        </div>

      </section>


      {/* =====================================================
          SCHEME GRID
          ===================================================== */}

      <section className="all-loans-grid">

        {schemes.map(
          (scheme) => (

            <div
              className="full-loan-card"
              key={scheme.id}
            >

              <div className="full-loan-top">

                <div
                  className={`scheme-logo ${scheme.logoClass}`}
                >
                  {scheme.logo}
                </div>

                <span className="scheme-match">
                  {scheme.match}
                </span>

              </div>


              <h2>
                {scheme.name}
              </h2>


              <p className="scheme-description">
                {scheme.description}
              </p>


              <div className="scheme-details">

                {scheme.details.map(
                  ([label, value]) => (

                    <div
                      key={label}
                    >

                      <span>
                        {label}
                      </span>

                      <strong>
                        {value}
                      </strong>

                    </div>

                  )
                )}

              </div>


              <button
                className="loan-apply-btn"
                onClick={() =>
                  openEligibility(
                    scheme
                  )
                }
              >
                Check Eligibility →
              </button>

            </div>

          )
        )}

      </section>


      {/* =====================================================
          BOTTOM
          ===================================================== */}

      <section className="loan-bottom-card">

        <div>

          <span className="loan-eyebrow">
            NEED MORE HELP?
          </span>

          <h2>
            Not sure which scheme is right for you?
          </h2>

          <p>
            Complete a new assessment to update your business
            profile and receive better recommendations.
          </p>

        </div>

        <button
          onClick={() =>
            setPage("assessment")
          }
        >
          Start New Assessment →
        </button>

      </section>


      {/* =====================================================
          ELIGIBILITY MODAL
          ===================================================== */}

      {selectedScheme && (

        <div
          className="eligibility-overlay"
          onClick={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedScheme(
                null
              )
            }

          }}
        >

          <div className="eligibility-modal">

            <button
              className="eligibility-close"
              onClick={() =>
                setSelectedScheme(
                  null
                )
              }
            >
              ×
            </button>


            <div className="eligibility-modal-icon">
              {
                selectedScheme
                  .scheme
                  .logo
              }
            </div>


            <span className="loan-eyebrow">
              GRAM-BIZ AI PRE-SCREENING
            </span>


            <h2>
              {
                selectedScheme
                  .scheme
                  .name
              }
            </h2>


            <div className="eligibility-score">

              <div>
                {
                  selectedScheme
                    .result
                    .score
                }
              </div>

              <span>
                /100
              </span>

            </div>


            <div className="eligibility-status">
              {
                selectedScheme
                  .result
                  .status
              }
            </div>


            <p className="eligibility-message">
              {
                selectedScheme
                  .result
                  .message
              }
            </p>


            <div className="eligibility-reasons">

              <strong>
                Why this was recommended
              </strong>


              {
                selectedScheme
                  .result
                  .reasons
                  .map(
                    (
                      reason,
                      index
                    ) => (

                      <div
                        key={index}
                        className="eligibility-reason"
                      >

                        <span>
                          ✓
                        </span>

                        <p>
                          {reason}
                        </p>

                      </div>

                    )
                  )
              }

            </div>


            <div className="eligibility-profile">

              <div>

                <span>
                  BUSINESS
                </span>

                <strong>
                  {
                    assessment?.businessType ||
                    "Not specified"
                  }
                </strong>

              </div>


              <div>

                <span>
                  INVESTMENT
                </span>

                <strong>
                  ₹
                  {
                    investment.toLocaleString(
                      "en-IN"
                    )
                  }
                </strong>

              </div>


              <div>

                <span>
                  EXPERIENCE
                </span>

                <strong>
                  {
                    assessment?.experience ||
                    "Not specified"
                  }
                </strong>

              </div>

            </div>


            <div className="eligibility-warning">

              <strong>
                Important
              </strong>

              <p>
                This result is only a
                Gram-Biz AI pre-screening.
                It is not an official loan
                approval or guarantee.
                Always verify current eligibility,
                documents, terms and conditions
                with the official scheme or lender.
              </p>

            </div>


            <div className="eligibility-actions">

              <button
                className="eligibility-primary"
                onClick={() =>
                  setPage(
                    "assessment"
                  )
                }
              >
                Update Assessment
              </button>


              <button
                className="eligibility-secondary"
                onClick={() =>
                  setSelectedScheme(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default LoanSchemes