import { useEffect, useMemo, useState } from "react"
import "./BusinessGuide.css"

function BusinessGuide({ setPage, mode = "customers" }) {
  const [assessment, setAssessment] = useState(null)

  const isMarket = mode === "market"

  const [formData, setFormData] = useState({
    customerType: "",
    customerCount: "",
    painPoint: "",
    competitorCount: "",
    competitorPrice: "",
    demandLevel: "",
    notes: "",
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedAssessment =
      localStorage.getItem("gramBizAssessment")

    const savedGuide =
      localStorage.getItem(
        isMarket
          ? "gramBizMarketGuide"
          : "gramBizCustomerGuide"
      )

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

    if (savedGuide) {
      try {
        setFormData(
          JSON.parse(savedGuide)
        )

        setSaved(true)
      } catch (error) {
        console.error(
          "Unable to load saved guide:",
          error
        )
      }
    }
  }, [isMarket])

  const businessType =
    assessment?.businessType ||
    "Your Business"

  const location = useMemo(() => {
    if (!assessment?.location) {
      return "Your local area"
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
  }, [assessment])

  const businessCategory =
    String(
      businessType
    ).toLowerCase()

  const categoryData = useMemo(() => {
    if (
      businessCategory.includes("dairy") ||
      businessCategory.includes("milk")
    ) {
      return {
        customers:
          "Households, tea shops, restaurants and retailers",
        products:
          "Fresh milk, curd, paneer and dairy products",
        painPoint:
          "Reliable quality, freshness and regular delivery",
        competitor:
          "Local milk suppliers and nearby dairy shops",
      }
    }

    if (
      businessCategory.includes("tailor") ||
      businessCategory.includes("stitch")
    ) {
      return {
        customers:
          "Women, children, students, families and boutiques",
        products:
          "Blouse stitching, churidars, skirts, alterations and uniforms",
        painPoint:
          "Good fitting, timely delivery and reasonable pricing",
        competitor:
          "Nearby tailoring shops and home-based tailors",
      }
    }

    if (
      businessCategory.includes("farm") ||
      businessCategory.includes("agri") ||
      businessCategory.includes("agriculture")
    ) {
      return {
        customers:
          "Households, shops, restaurants, markets and wholesalers",
        products:
          "Vegetables, fruits, grains, nursery plants and value-added products",
        painPoint:
          "Fresh produce, fair pricing and reliable supply",
        competitor:
          "Local farmers, markets and wholesalers",
      }
    }

    if (
      businessCategory.includes("food") ||
      businessCategory.includes("snack") ||
      businessCategory.includes("bakery") ||
      businessCategory.includes("catering")
    ) {
      return {
        customers:
          "Families, students, workers, shops and small functions",
        products:
          "Snacks, homemade food, bakery items and lunch boxes",
        painPoint:
          "Taste, hygiene, affordability and convenient ordering",
        competitor:
          "Local food shops, bakeries and home-food sellers",
      }
    }

    if (
      businessCategory.includes("salon") ||
      businessCategory.includes("beauty")
    ) {
      return {
        customers:
          "Women, men, students, families and bridal customers",
        products:
          "Hair services, facials, makeup and beauty packages",
        painPoint:
          "Affordable pricing, hygiene and service quality",
        competitor:
          "Nearby salons and home-based beauty professionals",
      }
    }

    if (
      businessCategory.includes("repair") ||
      businessCategory.includes("mobile") ||
      businessCategory.includes("electronics")
    ) {
      return {
        customers:
          "Households, students, shops and small businesses",
        products:
          "Repairs, maintenance, accessories and installation",
        painPoint:
          "Fast service, genuine parts and transparent pricing",
        competitor:
          "Nearby repair shops and service centres",
      }
    }

    return {
      customers:
        "Nearby households, local customers and small businesses",
      products:
        "Core products, services and customized offerings",
      painPoint:
        "Good quality, reasonable pricing and reliable service",
      competitor:
        "Nearby businesses offering similar products or services",
    }
  }, [businessCategory])

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setSaved(false)
  }

  const saveGuide = () => {
    localStorage.setItem(
      isMarket
        ? "gramBizMarketGuide"
        : "gramBizCustomerGuide",
      JSON.stringify(formData)
    )

    setSaved(true)
  }

  const clearGuide = () => {
    const empty = {
      customerType: "",
      customerCount: "",
      painPoint: "",
      competitorCount: "",
      competitorPrice: "",
      demandLevel: "",
      notes: "",
    }

    setFormData(empty)

    localStorage.removeItem(
      isMarket
        ? "gramBizMarketGuide"
        : "gramBizCustomerGuide"
    )

    setSaved(false)
  }

  const customerScore = Math.min(
    95,
    55 +
      (Number(
        formData.customerCount
      ) >= 10
        ? 15
        : 0) +
      (formData.customerType
        ? 10
        : 0) +
      (formData.painPoint
        ? 10
        : 0)
  )

  const marketScore = Math.min(
    95,
    55 +
      (formData.demandLevel === "High"
        ? 20
        : formData.demandLevel ===
          "Medium"
        ? 12
        : 0) +
      (formData.competitorCount &&
      Number(
        formData.competitorCount
      ) <= 5
        ? 10
        : 0) +
      (formData.competitorPrice
        ? 8
        : 0)
  )

  return (
    <div className="business-guide-page">

      {/* HEADER */}

      <header className="business-guide-header">

        <button
          className="business-guide-back"
          onClick={() =>
            setPage("dashboard")
          }
        >
          ← Back to Dashboard
        </button>

        <div className="business-guide-brand">

          <div className="business-guide-logo">
            G
          </div>

          <div>
            <strong>
              Gram-Biz AI
            </strong>

            <span>
              Smart Business. Stronger Villages.
            </span>
          </div>

        </div>

        <span className="business-guide-status">
          {saved
            ? "✓ Saved"
            : "AI Guided"}
        </span>

      </header>


      <main className="business-guide-main">

        {/* INTRO */}

        <section className="business-guide-intro">

          <span className="business-guide-eyebrow">
            {isMarket
              ? "📍 LOCAL MARKET ASSISTANT"
              : "👥 CUSTOMER DISCOVERY ASSISTANT"}
          </span>

          <h1>
            {isMarket
              ? "Understand Your Local Market"
              : "Understand Your Customers"}
          </h1>

          <p>
            {isMarket
              ? "Learn about local demand, competitors, pricing and market opportunities before investing heavily."
              : "Identify who your customers are, what they need and how you can serve them better."}
          </p>

        </section>


        {/* SUMMARY */}

        <section className="business-guide-summary">

          <div className="guide-summary-icon">
            {isMarket
              ? "📍"
              : "👥"}
          </div>

          <div>

            <span>
              YOUR BUSINESS
            </span>

            <h2>
              {businessType}
            </h2>

            <p>
              📍 {location}
            </p>

          </div>

          <div className="guide-summary-focus">

            <span>
              MAIN FOCUS
            </span>

            <strong>
              {isMarket
                ? categoryData.competitor
                : categoryData.customers}
            </strong>

          </div>

        </section>


        <div className="business-guide-layout">

          {/* FORM */}

          <section className="business-guide-form-card">

            <div className="guide-heading">

              <div>
                <span>
                  STEP-BY-STEP DISCOVERY
                </span>

                <h2>
                  {isMarket
                    ? "Record your market findings"
                    : "Record what you know about customers"}
                </h2>
              </div>

              <div className="guide-step">
                01
              </div>

            </div>


            {!isMarket ? (

              <>
                <div className="guide-field">

                  <label>
                    Who are your main customers?
                  </label>

                  <p>
                    Choose the customer group most
                    likely to buy from your business.
                  </p>

                  <select
                    name="customerType"
                    value={
                      formData.customerType
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option value="">
                      Select customer group
                    </option>

                    <option value="Families">
                      Families
                    </option>

                    <option value="Women">
                      Women
                    </option>

                    <option value="Students">
                      Students
                    </option>

                    <option value="Workers">
                      Workers
                    </option>

                    <option value="Local Shops">
                      Local Shops
                    </option>

                    <option value="Restaurants">
                      Restaurants
                    </option>

                    <option value="Businesses">
                      Small Businesses
                    </option>

                    <option value="Mixed Customers">
                      Mixed Customers
                    </option>
                  </select>

                </div>


                <div className="guide-field">

                  <label>
                    How many potential customers can you reach?
                  </label>

                  <p>
                    Start with a realistic estimate
                    for your nearby area.
                  </p>

                  <div className="guide-input">

                    <span>
                      👥
                    </span>

                    <input
                      type="number"
                      min="0"
                      name="customerCount"
                      value={
                        formData.customerCount
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Example: 50"
                    />

                  </div>

                </div>


                <div className="guide-field">

                  <label>
                    What is the main customer need?
                  </label>

                  <p>
                    What problem should your product
                    or service solve?
                  </p>

                  <textarea
                    name="painPoint"
                    value={
                      formData.painPoint
                    }
                    onChange={
                      handleChange
                    }
                    placeholder={
                      categoryData.painPoint
                    }
                    rows="4"
                  />

                </div>


                <div className="guide-field">

                  <label>
                    Additional customer notes
                  </label>

                  <textarea
                    name="notes"
                    value={
                      formData.notes
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Example: Customers prefer evening delivery and affordable packages."
                    rows="4"
                  />

                </div>
              </>

            ) : (

              <>
                <div className="guide-field">

                  <label>
                    How strong is customer demand?
                  </label>

                  <p>
                    Based on conversations, observations
                    or local business activity.
                  </p>

                  <div className="guide-options">

                    {[
                      "High",
                      "Medium",
                      "Low",
                    ].map(
                      (option) => (

                        <label
                          key={option}
                        >

                          <input
                            type="radio"
                            name="demandLevel"
                            value={option}
                            checked={
                              formData.demandLevel ===
                              option
                            }
                            onChange={
                              handleChange
                            }
                          />

                          {option}

                        </label>

                      )
                    )}

                  </div>

                </div>


                <div className="guide-field-grid">

                  <div className="guide-field">

                    <label>
                      Number of competitors
                    </label>

                    <p>
                      Estimate businesses offering
                      similar products nearby.
                    </p>

                    <div className="guide-input">

                      <span>
                        🏪
                      </span>

                      <input
                        type="number"
                        min="0"
                        name="competitorCount"
                        value={
                          formData.competitorCount
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Example: 5"
                      />

                    </div>

                  </div>


                  <div className="guide-field">

                    <label>
                      Typical competitor price
                    </label>

                    <p>
                      Enter the approximate local
                      selling price.
                    </p>

                    <div className="guide-input">

                      <span>
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        name="competitorPrice"
                        value={
                          formData.competitorPrice
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Example: 500"
                      />

                    </div>

                  </div>

                </div>


                <div className="guide-field">

                  <label>
                    Market observations
                  </label>

                  <p>
                    Record anything useful about
                    customers, competitors or pricing.
                  </p>

                  <textarea
                    name="notes"
                    value={
                      formData.notes
                    }
                    onChange={
                      handleChange
                    }
                    placeholder={
                      categoryData.competitor
                    }
                    rows="5"
                  />

                </div>
              </>
            )}


            <div className="guide-actions">

              <button
                className="guide-clear-btn"
                onClick={
                  clearGuide
                }
              >
                Clear
              </button>

              <button
                className="guide-save-btn"
                onClick={
                  saveGuide
                }
              >
                Save Findings →
              </button>

            </div>

          </section>


          {/* AI SIDE */}

          <aside className="business-guide-side">

            <div className="guide-ai-card">

              <div className="guide-ai-icon">
                ✦
              </div>

              <span>
                GRAM-BIZ AI
              </span>

              <h2>
                AI Quick Insight
              </h2>

              <p>
                {isMarket
                  ? "Use your local observations to decide whether demand, competition and pricing are attractive enough to continue."
                  : "Start with a small number of customers, listen carefully and build your offering around their actual needs."}
              </p>


              <div className="guide-insight-item">

                <span>
                  PRODUCTS / SERVICES
                </span>

                <strong>
                  {categoryData.products}
                </strong>

              </div>


              <div className="guide-insight-item">

                <span>
                  LIKELY CUSTOMERS
                </span>

                <strong>
                  {categoryData.customers}
                </strong>

              </div>


              <div className="guide-insight-item">

                <span>
                  KEY NEED
                </span>

                <strong>
                  {categoryData.painPoint}
                </strong>

              </div>

            </div>


            <div className="guide-score-card">

              <span>
                {isMarket
                  ? "MARKET READINESS"
                  : "CUSTOMER READINESS"}
              </span>

              <strong>
                {isMarket
                  ? `${marketScore}%`
                  : `${customerScore}%`}
              </strong>

              <p>
                {isMarket
                  ? "A simple planning score based on the information you entered."
                  : "A simple planning score based on how much customer information you have recorded."}
              </p>

            </div>


            <div className="guide-next-card">

              <span>
                NEXT STEP
              </span>

              <h3>
                {isMarket
                  ? "Prepare your Business Plan"
                  : "Build your Business Plan"}
              </h3>

              <p>
                Use these findings when deciding
                pricing, expenses, marketing and
                growth strategy.
              </p>

              <button
                onClick={() =>
                  setPage(
                    "business-plan"
                  )
                }
              >
                Open Business Plan →
              </button>

            </div>

          </aside>

        </div>


        {/* ACTION STRIP */}

        <section className="guide-bottom-card">

          <div>

            <span>
              GRAM-BIZ AI JOURNEY
            </span>

            <h2>
              Ready for the next step?
            </h2>

            <p>
              Continue from market and customer
              discovery into your business plan,
              startup cost and funding strategy.
            </p>

          </div>

          <div className="guide-bottom-actions">

            <button
              onClick={() =>
                setPage("calculator")
              }
            >
              Startup Cost
            </button>

            <button
              onClick={() =>
                setPage("loans")
              }
            >
              Explore Funding
            </button>

          </div>

        </section>


        <footer className="business-guide-footer">

          <span>
            Gram-Biz AI
          </span>

          <span>
            Smart Business. Stronger Villages.
          </span>

        </footer>

      </main>

    </div>
  )
}

export default BusinessGuide