import { useEffect, useMemo, useState } from "react"
import "./MarketingPlan.css"

function MarketingPlan({ setPage }) {
  const [assessment, setAssessment] = useState(null)
  const [saved, setSaved] = useState(false)

  const [formData, setFormData] = useState({
    targetCustomer: "",
    mainMessage: "",
    channels: [],
    monthlyBudget: "",
    promotion: "",
    referralPlan: "",
  })

  useEffect(() => {
    const savedAssessment =
      localStorage.getItem("gramBizAssessment")

    const savedPlan =
      localStorage.getItem("gramBizMarketingPlan")

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
        const parsed = JSON.parse(savedPlan)

        setFormData({
          targetCustomer:
            parsed.targetCustomer || "",
          mainMessage:
            parsed.mainMessage || "",
          channels:
            parsed.channels || [],
          monthlyBudget:
            parsed.monthlyBudget || "",
          promotion:
            parsed.promotion || "",
          referralPlan:
            parsed.referralPlan || "",
        })

        setSaved(true)
      } catch (error) {
        console.error(
          "Unable to load marketing plan:",
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

  const category =
    String(
      businessType
    ).toLowerCase()

  const categoryData = useMemo(() => {
    if (
      category.includes("dairy") ||
      category.includes("milk")
    ) {
      return {
        audience:
          "Nearby households, tea shops, restaurants and retailers",
        message:
          "Fresh, reliable and locally available dairy products.",
        channels: [
          "WhatsApp",
          "Local Referrals",
          "Home Delivery",
          "Shop Partnerships",
        ],
      }
    }

    if (
      category.includes("tailor") ||
      category.includes("stitch")
    ) {
      return {
        audience:
          "Women, children, families, students and local boutiques",
        message:
          "Neat stitching, good fitting and on-time delivery at fair prices.",
        channels: [
          "WhatsApp",
          "Referrals",
          "Local Groups",
          "Boutique Partnerships",
        ],
      }
    }

    if (
      category.includes("farm") ||
      category.includes("agri") ||
      category.includes("agriculture")
    ) {
      return {
        audience:
          "Households, shops, restaurants, markets and wholesalers",
        message:
          "Fresh local produce with reliable supply and fair pricing.",
        channels: [
          "Local Market",
          "WhatsApp",
          "Direct Buyers",
          "Restaurant Partnerships",
        ],
      }
    }

    if (
      category.includes("food") ||
      category.includes("snack") ||
      category.includes("bakery") ||
      category.includes("catering")
    ) {
      return {
        audience:
          "Families, workers, students, shops and functions",
        message:
          "Fresh, hygienic and affordable food made for local customers.",
        channels: [
          "WhatsApp",
          "Local Groups",
          "Home Delivery",
          "Referrals",
        ],
      }
    }

    if (
      category.includes("salon") ||
      category.includes("beauty")
    ) {
      return {
        audience:
          "Women, men, students, families and bridal customers",
        message:
          "Affordable, hygienic and quality beauty services near you.",
        channels: [
          "WhatsApp",
          "Referrals",
          "Local Offers",
          "Customer Reviews",
        ],
      }
    }

    return {
      audience:
        "Nearby households, local customers and small businesses",
      message:
        "Reliable local service with good quality and fair pricing.",
      channels: [
        "WhatsApp",
        "Referrals",
        "Local Groups",
        "Repeat Customers",
      ],
    }
  }, [category])

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

  const toggleChannel = (channel) => {
    setFormData((previous) => {
      const exists =
        previous.channels.includes(channel)

      return {
        ...previous,
        channels: exists
          ? previous.channels.filter(
              (item) => item !== channel
            )
          : [
              ...previous.channels,
              channel,
            ],
      }
    })

    setSaved(false)
  }

  const savePlan = () => {
    localStorage.setItem(
      "gramBizMarketingPlan",
      JSON.stringify(formData)
    )

    setSaved(true)
  }

  const clearPlan = () => {
    setFormData({
      targetCustomer: "",
      mainMessage: "",
      channels: [],
      monthlyBudget: "",
      promotion: "",
      referralPlan: "",
    })

    localStorage.removeItem(
      "gramBizMarketingPlan"
    )

    setSaved(false)
  }

  return (
    <div className="marketing-plan-page">

      <header className="marketing-plan-header">

        <button
          className="marketing-back-btn"
          onClick={() =>
            setPage("dashboard")
          }
        >
          ← Back to Dashboard
        </button>

        <div className="marketing-brand">

          <div className="marketing-logo">
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

        <span className="marketing-status">
          {saved
            ? "✓ Plan Saved"
            : "AI Guided"}
        </span>

      </header>


      <main className="marketing-main">

        <section className="marketing-intro">

          <span className="marketing-eyebrow">
            📢 BEGINNER MARKETING ASSISTANT
          </span>

          <h1>
            Create Your
            <span> Marketing Plan</span>
          </h1>

          <p>
            Build a simple local marketing strategy
            to reach your first customers and grow
            through repeat business and referrals.
          </p>

        </section>


        <section className="marketing-summary">

          <div className="marketing-summary-icon">
            📢
          </div>

          <div>

            <span>
              BUSINESS
            </span>

            <h2>
              {businessType}
            </h2>

            <p>
              📍 {location}
            </p>

          </div>

          <div className="marketing-summary-focus">

            <span>
              SUGGESTED AUDIENCE
            </span>

            <strong>
              {categoryData.audience}
            </strong>

          </div>

        </section>


        <div className="marketing-layout">

          <section className="marketing-form-card">

            <div className="marketing-heading">

              <div>

                <span>
                  STEP-BY-STEP PLAN
                </span>

                <h2>
                  Define your marketing strategy
                </h2>

              </div>

              <div className="marketing-step">
                01
              </div>

            </div>


            <div className="marketing-field">

              <label>
                Who is your main target customer?
              </label>

              <p>
                Be specific about the people you
                want to reach first.
              </p>

              <input
                name="targetCustomer"
                value={
                  formData.targetCustomer
                }
                onChange={
                  handleChange
                }
                placeholder={
                  categoryData.audience
                }
              />

            </div>


            <div className="marketing-field">

              <label>
                What is your main marketing message?
              </label>

              <p>
                Explain why customers should choose
                your business.
              </p>

              <textarea
                name="mainMessage"
                value={
                  formData.mainMessage
                }
                onChange={
                  handleChange
                }
                placeholder={
                  categoryData.message
                }
                rows="4"
              />

            </div>


            <div className="marketing-field">

              <label>
                Which channels will you use?
              </label>

              <p>
                Select simple channels that match
                your local customers.
              </p>

              <div className="marketing-options">

                {categoryData.channels.map(
                  (channel) => (

                    <label
                      key={channel}
                      className={
                        formData.channels.includes(
                          channel
                        )
                          ? "selected"
                          : ""
                      }
                    >

                      <input
                        type="checkbox"
                        checked={formData.channels.includes(
                          channel
                        )}
                        onChange={() =>
                          toggleChannel(
                            channel
                          )
                        }
                      />

                      <span>
                        {channel}
                      </span>

                    </label>

                  )
                )}

              </div>

            </div>


            <div className="marketing-field">

              <label>
                Monthly Marketing Budget
              </label>

              <p>
                Start small. You do not need a large
                advertising budget in the beginning.
              </p>

              <div className="marketing-input">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  name="monthlyBudget"
                  value={
                    formData.monthlyBudget
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: 2000"
                />

              </div>

            </div>


            <div className="marketing-field">

              <label>
                What promotion will you run?
              </label>

              <p>
                Example: First-order offer,
                referral discount or combo package.
              </p>

              <textarea
                name="promotion"
                value={
                  formData.promotion
                }
                onChange={
                  handleChange
                }
                placeholder="Example: 10% introductory offer for first-time customers."
                rows="3"
              />

            </div>


            <div className="marketing-field">

              <label>
                How will you encourage referrals?
              </label>

              <p>
                Happy customers can become your
                strongest source of new business.
              </p>

              <textarea
                name="referralPlan"
                value={
                  formData.referralPlan
                }
                onChange={
                  handleChange
                }
                placeholder="Example: Give existing customers a small discount when they refer a new customer."
                rows="3"
              />

            </div>


            <div className="marketing-actions">

              <button
                className="marketing-clear-btn"
                onClick={clearPlan}
              >
                Clear
              </button>

              <button
                className="marketing-save-btn"
                onClick={savePlan}
              >
                Save Marketing Plan →
              </button>

            </div>

          </section>


          <aside className="marketing-side">

            <div className="marketing-ai-card">

              <div className="marketing-ai-icon">
                ✦
              </div>

              <span>
                GRAM-BIZ AI
              </span>

              <h2>
                Quick Strategy
              </h2>

              <p>
                Start locally, prove demand,
                collect feedback and build repeat
                customers before spending more.
              </p>

              <div className="marketing-insight">

                <span>
                  SUGGESTED MESSAGE
                </span>

                <strong>
                  {categoryData.message}
                </strong>

              </div>

              <div className="marketing-insight">

                <span>
                  TARGET AUDIENCE
                </span>

                <strong>
                  {categoryData.audience}
                </strong>

              </div>

            </div>


            <div className="marketing-channel-card">

              <span>
                SELECTED CHANNELS
              </span>

              <strong>
                {formData.channels.length}
              </strong>

              <p>
                marketing channels selected
              </p>

            </div>


            <div className="marketing-next-card">

              <span>
                NEXT STEP
              </span>

              <h3>
                Track your business
              </h3>

              <p>
                Once you start receiving customers,
                record your actual sales and expenses
                in the Business Roadmap.
              </p>

              <button
                onClick={() =>
                  setPage("roadmap")
                }
              >
                Open Roadmap →
              </button>

            </div>

          </aside>

        </div>


        <section className="marketing-bottom-card">

          <div>

            <span>
              GRAM-BIZ AI JOURNEY
            </span>

            <h2>
              Marketing → Customers → Growth
            </h2>

            <p>
              Continue with startup cost planning,
              funding and monthly performance tracking.
            </p>

          </div>

          <div className="marketing-bottom-actions">

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


        <footer className="marketing-footer">

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

export default MarketingPlan