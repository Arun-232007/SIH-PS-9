import { useEffect, useMemo, useState } from "react"
import "./BusinessPlan.css"

function BusinessPlan({ setPage }) {
  const [assessment, setAssessment] = useState(null)

  const [formData, setFormData] = useState({
    businessGoal: "",
    monthlySales: "",
    monthlyExpenses: "",
    pricing: "",
    marketing: "",
    workers: "",
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedAssessment =
      localStorage.getItem("gramBizAssessment")

    const savedPlan =
      localStorage.getItem("gramBizBusinessPlan")

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

    if (savedPlan) {
      try {
        setFormData(
          JSON.parse(savedPlan)
        )
        setSaved(true)
      } catch (error) {
        console.error(
          "Unable to load business plan:",
          error
        )
      }
    }
  }, [])

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

  const investment =
    Number(
      assessment?.investment || 0
    )

  const businessCategory =
    String(
      businessType
    ).toLowerCase()

  const categoryGuide = useMemo(() => {
    if (
      businessCategory.includes("dairy") ||
      businessCategory.includes("milk")
    ) {
      return {
        products:
          "Fresh milk, curd, paneer and other dairy products",
        customers:
          "Local households, tea shops, restaurants and retailers",
        marketing:
          "Neighbourhood delivery, subscriptions, referrals and local shop partnerships",
      }
    }

    if (
      businessCategory.includes("tailor") ||
      businessCategory.includes("stitch")
    ) {
      return {
        products:
          "Blouse stitching, churidars, skirts, alterations and uniforms",
        customers:
          "Women, children, students, families and local boutiques",
        marketing:
          "WhatsApp, referrals, local groups, sample designs and boutique partnerships",
      }
    }

    if (
      businessCategory.includes("farm") ||
      businessCategory.includes("agri") ||
      businessCategory.includes("agriculture")
    ) {
      return {
        products:
          "Vegetables, fruits, grains, nursery plants and value-added products",
        customers:
          "Households, shops, restaurants, markets and wholesalers",
        marketing:
          "Direct customers, local markets, restaurants and repeat buyers",
      }
    }

    if (
      businessCategory.includes("food") ||
      businessCategory.includes("snack") ||
      businessCategory.includes("bakery") ||
      businessCategory.includes("catering")
    ) {
      return {
        products:
          "Snacks, homemade food, bakery items, lunch boxes and catering",
        customers:
          "Families, workers, students, shops and small functions",
        marketing:
          "Local delivery, WhatsApp orders, samples, referrals and repeat packages",
      }
    }

    if (
      businessCategory.includes("salon") ||
      businessCategory.includes("beauty")
    ) {
      return {
        products:
          "Hair services, facials, makeup, bridal services and beauty packages",
        customers:
          "Women, men, students, families and bridal customers",
        marketing:
          "Referrals, WhatsApp, local offers, packages and customer reviews",
      }
    }

    if (
      businessCategory.includes("repair") ||
      businessCategory.includes("mobile") ||
      businessCategory.includes("electronics")
    ) {
      return {
        products:
          "Repairs, maintenance, accessories, installation and home service",
        customers:
          "Households, students, shops and small businesses",
        marketing:
          "Local referrals, WhatsApp, shop boards and home-service promotions",
      }
    }

    if (
      businessCategory.includes("retail") ||
      businessCategory.includes("shop") ||
      businessCategory.includes("store")
    ) {
      return {
        products:
          "Daily essentials, household products, personal care and fast-moving items",
        customers:
          "Nearby households, students, workers and local customers",
        marketing:
          "Local offers, WhatsApp, home delivery and repeat-customer discounts",
      }
    }

    return {
      products:
        "Core products, local services and customized offerings",
      customers:
        "Nearby households, local customers and small businesses",
      marketing:
        "Local referrals, WhatsApp, community groups and repeat customers",
    }
  }, [businessCategory])

  const expectedProfit = Math.max(
    Number(formData.monthlySales || 0) -
      Number(formData.monthlyExpenses || 0),
    0
  )

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

  const savePlan = () => {
    localStorage.setItem(
      "gramBizBusinessPlan",
      JSON.stringify(formData)
    )

    setSaved(true)
  }

  const clearPlan = () => {
    setFormData({
      businessGoal: "",
      monthlySales: "",
      monthlyExpenses: "",
      pricing: "",
      marketing: "",
      workers: "",
    })

    setSaved(false)

    localStorage.removeItem(
      "gramBizBusinessPlan"
    )
  }

  return (
    <div className="business-plan-page">

      {/* HEADER */}

      <header className="business-plan-header">

        <button
          className="business-plan-back"
          onClick={() =>
            setPage("dashboard")
          }
        >
          ← Back to Dashboard
        </button>

        <div className="business-plan-brand">

          <div className="business-plan-logo">
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

        <span className="business-plan-status">
          {saved
            ? "✓ Plan Saved"
            : "AI Guided"}
        </span>

      </header>


      <main className="business-plan-main">

        {/* INTRO */}

        <section className="business-plan-intro">

          <span className="business-plan-eyebrow">
            ✦ BEGINNER BUSINESS ASSISTANT
          </span>

          <h1>
            Build Your
            <span>
              {" "}Business Plan
            </span>
          </h1>

          <p>
            Gram-Biz AI helps you create a simple,
            practical business plan even if you
            have never written one before.
          </p>

        </section>


        {/* BUSINESS SUMMARY */}

        <section className="business-plan-summary">

          <div className="plan-summary-icon">
            💼
          </div>

          <div className="plan-summary-main">

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

          <div className="plan-summary-investment">

            <span>
              AVAILABLE INVESTMENT
            </span>

            <strong>
              ₹
              {investment.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </section>


        <div className="business-plan-layout">

          {/* FORM */}

          <section className="business-plan-form-card">

            <div className="plan-section-heading">

              <div>
                <span>
                  STEP-BY-STEP PLANNING
                </span>

                <h2>
                  Tell us about your plan
                </h2>
              </div>

              <div className="plan-step-count">
                01
              </div>

            </div>


            {/* GOAL */}

            <div className="plan-field">

              <label>
                What is your main business goal?
              </label>

              <p>
                Example: Earn a stable monthly income,
                create jobs or grow to a bigger shop.
              </p>

              <textarea
                name="businessGoal"
                value={
                  formData.businessGoal
                }
                onChange={
                  handleChange
                }
                placeholder="Write your main business goal..."
                rows="4"
              />

            </div>


            {/* SALES */}

            <div className="plan-field-grid">

              <div className="plan-field">

                <label>
                  Expected Monthly Sales
                </label>

                <p>
                  How much do you expect to sell
                  each month?
                </p>

                <div className="plan-input">

                  <span>
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    name="monthlySales"
                    value={
                      formData.monthlySales
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="50000"
                  />

                </div>

              </div>


              <div className="plan-field">

                <label>
                  Expected Monthly Expenses
                </label>

                <p>
                  Include rent, materials, wages,
                  electricity and other costs.
                </p>

                <div className="plan-input">

                  <span>
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    name="monthlyExpenses"
                    value={
                      formData.monthlyExpenses
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="30000"
                  />

                </div>

              </div>

            </div>


            {/* PRICING */}

            <div className="plan-field">

              <label>
                How will you decide your pricing?
              </label>

              <p>
                Keep your price high enough to cover
                costs and leave a reasonable profit.
              </p>

              <textarea
                name="pricing"
                value={
                  formData.pricing
                }
                onChange={
                  handleChange
                }
                placeholder="Example: Material cost + labour cost + profit margin"
                rows="3"
              />

            </div>


            {/* MARKETING */}

            <div className="plan-field">

              <label>
                How will you find customers?
              </label>

              <p>
                Start with simple local methods
                before spending heavily on advertising.
              </p>

              <textarea
                name="marketing"
                value={
                  formData.marketing
                }
                onChange={
                  handleChange
                }
                placeholder={
                  categoryGuide.marketing
                }
                rows="3"
              />

            </div>


            {/* WORKERS */}

            <div className="plan-field">

              <label>
                How many people will work in the business?
              </label>

              <p>
                Include yourself and any family members
                or employees.
              </p>

              <div className="plan-input">

                <span>
                  👥
                </span>

                <input
                  type="number"
                  min="1"
                  name="workers"
                  value={
                    formData.workers
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1"
                />

              </div>

            </div>


            <div className="plan-actions">

              <button
                className="clear-plan-btn"
                onClick={
                  clearPlan
                }
              >
                Clear
              </button>

              <button
                className="save-plan-btn"
                onClick={
                  savePlan
                }
              >
                Save Business Plan →
              </button>

            </div>

          </section>


          {/* AI SUMMARY */}

          <aside className="business-plan-side">

            <div className="ai-plan-card">

              <div className="ai-plan-icon">
                ✦
              </div>

              <span>
                GRAM-BIZ AI
              </span>

              <h2>
                Your Business Snapshot
              </h2>

              <p>
                Here is the information Gram-Biz AI
                currently understands about your business.
              </p>


              <div className="snapshot-item">

                <span>
                  PRODUCTS / SERVICES
                </span>

                <strong>
                  {categoryGuide.products}
                </strong>

              </div>


              <div className="snapshot-item">

                <span>
                  TARGET CUSTOMERS
                </span>

                <strong>
                  {categoryGuide.customers}
                </strong>

              </div>


              <div className="snapshot-item">

                <span>
                  MARKETING FOCUS
                </span>

                <strong>
                  {categoryGuide.marketing}
                </strong>

              </div>

            </div>


            <div className="profit-preview-card">

              <span>
                ESTIMATED MONTHLY PROFIT
              </span>

              <strong>
                ₹
                {expectedProfit.toLocaleString(
                  "en-IN"
                )}
              </strong>

              <p>
                This is a simple estimate based on
                your expected sales and expenses.
              </p>

            </div>


            <div className="plan-navigation-card">

              <span>
                NEXT
              </span>

              <h3>
                Need funding?
              </h3>

              <p>
                Check suitable loan and support
                schemes after preparing your plan.
              </p>

              <button
                onClick={() =>
                  setPage("loans")
                }
              >
                Explore Loans →
              </button>

            </div>

          </aside>

        </div>


        {/* GENERATED PLAN */}

        <section className="generated-plan-card">

          <div className="generated-plan-heading">

            <div>

              <span>
                YOUR BUSINESS PLAN
              </span>

              <h2>
                Quick Business Overview
              </h2>

            </div>

            <span className="plan-ready-badge">
              {saved
                ? "✓ Saved"
                : "Draft"}
            </span>

          </div>


          <div className="generated-plan-grid">

            <div>
              <span>
                BUSINESS
              </span>

              <strong>
                {businessType}
              </strong>
            </div>

            <div>
              <span>
                LOCATION
              </span>

              <strong>
                {location}
              </strong>
            </div>

            <div>
              <span>
                INVESTMENT
              </span>

              <strong>
                ₹
                {investment.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div>
              <span>
                EXPECTED SALES
              </span>

              <strong>
                {formData.monthlySales
                  ? `₹${Number(
                      formData.monthlySales
                    ).toLocaleString("en-IN")}`
                  : "Not entered"}
              </strong>
            </div>

            <div>
              <span>
                EXPECTED EXPENSES
              </span>

              <strong>
                {formData.monthlyExpenses
                  ? `₹${Number(
                      formData.monthlyExpenses
                    ).toLocaleString("en-IN")}`
                  : "Not entered"}
              </strong>
            </div>

            <div>
              <span>
                PEOPLE
              </span>

              <strong>
                {formData.workers ||
                  "Not entered"}
              </strong>
            </div>

          </div>


          <div className="generated-plan-note">

            <div>
              ✓
            </div>

            <p>
              Your plan is a working draft. Update
              the numbers as your actual business
              performance becomes available.
            </p>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="business-plan-footer">

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

export default BusinessPlan