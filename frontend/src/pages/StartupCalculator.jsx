import { useEffect, useMemo, useState } from "react"
import "./StartupCalculator.css"

function StartupCalculator({ setPage }) {
  const [assessment, setAssessment] = useState(null)
  const [items, setItems] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(
      "gramBizAssessment"
    )

    if (saved) {
      try {
        setAssessment(JSON.parse(saved))
      } catch (error) {
        console.error(
          "Unable to load assessment:",
          error
        )
      }
    }
  }, [])

  const businessType = String(
    assessment?.businessType || ""
  ).toLowerCase()

  const categoryData = useMemo(() => {
    if (
      businessType.includes("tailor") ||
      businessType.includes("stitch") ||
      businessType.includes("garment") ||
      businessType.includes("fashion")
    ) {
      return {
        name: "Tailoring",
        icon: "🧵",
        description:
          "Estimate the cost of setting up your tailoring business.",

        items: [
          ["Sewing Machine", 18000],
          ["Overlock Machine", 14000],
          ["Cutting Table", 6000],
          ["Iron Box", 2500],
          ["Scissors & Tools", 2000],
          ["Initial Fabric Stock", 12000],
          ["Thread & Accessories", 4000],
          ["Packaging", 1500],
        ],
      }
    }

    if (
      businessType.includes("dairy") ||
      businessType.includes("milk")
    ) {
      return {
        name: "Dairy Farming",
        icon: "🐄",
        description:
          "Estimate the basic setup and operating requirements for dairy farming.",

        items: [
          ["Milk Cans", 5000],
          ["Animal Feed", 10000],
          ["Milking Equipment", 12000],
          ["Water Equipment", 5000],
          ["Cooling / Storage", 15000],
          ["Cleaning Supplies", 2500],
          ["Packaging", 3000],
        ],
      }
    }

    if (
      businessType.includes("agri") ||
      businessType.includes("farm") ||
      businessType.includes("farming") ||
      businessType.includes("agriculture")
    ) {
      return {
        name: "Agriculture",
        icon: "🌾",
        description:
          "Estimate the initial farming and production requirements.",

        items: [
          ["Seeds", 5000],
          ["Fertilizer", 7000],
          ["Farm Tools", 6000],
          ["Irrigation", 12000],
          ["Crop Protection", 4000],
          ["Packaging", 3000],
          ["Transport", 5000],
        ],
      }
    }

    if (
      businessType.includes("food") ||
      businessType.includes("snack") ||
      businessType.includes("bakery") ||
      businessType.includes("catering")
    ) {
      return {
        name: "Food Business",
        icon: "🍱",
        description:
          "Estimate the cost of starting a small food business.",

        items: [
          ["Cooking Equipment", 15000],
          ["Gas Stove", 5000],
          ["Utensils", 5000],
          ["Initial Ingredients", 10000],
          ["Packaging", 5000],
          ["Storage", 6000],
          ["Cleaning Supplies", 2000],
        ],
      }
    }

    if (
      businessType.includes("handicraft") ||
      businessType.includes("craft") ||
      businessType.includes("handmade")
    ) {
      return {
        name: "Handicrafts",
        icon: "🎨",
        description:
          "Estimate the initial material and production setup cost.",

        items: [
          ["Raw Materials", 8000],
          ["Tools", 5000],
          ["Work Table", 3000],
          ["Initial Product Stock", 7000],
          ["Packaging", 3000],
          ["Labels & Branding", 2000],
        ],
      }
    }

    if (
      businessType.includes("salon") ||
      businessType.includes("beauty") ||
      businessType.includes("parlour") ||
      businessType.includes("parlor")
    ) {
      return {
        name: "Beauty & Salon",
        icon: "💇",
        description:
          "Estimate the basic setup cost for a beauty and salon business.",

        items: [
          ["Salon Chair", 10000],
          ["Mirror", 4000],
          ["Hair Equipment", 8000],
          ["Beauty Products", 10000],
          ["Makeup Kit", 7000],
          ["Hygiene Supplies", 2500],
          ["Towels & Accessories", 2500],
        ],
      }
    }

    if (
      businessType.includes("retail") ||
      businessType.includes("shop") ||
      businessType.includes("store")
    ) {
      return {
        name: "Retail Business",
        icon: "🛒",
        description:
          "Estimate the initial stock and setup requirements for your shop.",

        items: [
          ["Initial Stock", 25000],
          ["Shelves", 8000],
          ["Display Equipment", 5000],
          ["Packaging", 2500],
          ["Billing Materials", 2000],
          ["Signboard", 3000],
        ],
      }
    }

    if (
      businessType.includes("repair") ||
      businessType.includes("mobile") ||
      businessType.includes("electronics")
    ) {
      return {
        name: "Repair & Service",
        icon: "🔧",
        description:
          "Estimate tools, spare parts and service setup costs.",

        items: [
          ["Repair Tools", 12000],
          ["Testing Equipment", 8000],
          ["Spare Parts", 10000],
          ["Accessories", 5000],
          ["Work Table", 3000],
          ["Safety Equipment", 2000],
        ],
      }
    }

    return {
      name:
        assessment?.businessType ||
        "Your Business",

      icon: "🏪",

      description:
        "Estimate the initial setup requirements for your business.",

      items: [
        ["Basic Equipment", 15000],
        ["Initial Stock", 10000],
        ["Tools", 5000],
        ["Packaging", 3000],
        ["Marketing", 3000],
      ],
    }
  }, [businessType, assessment])

  useEffect(() => {
    setItems(
      categoryData.items.map(
        ([name, price]) => ({
          name,
          price,
          quantity: 1,
        })
      )
    )
  }, [categoryData])

  const totalCost = items.reduce(
    (sum, item) =>
      sum +
      item.price *
        Number(item.quantity || 0),
    0
  )

  const investment =
    Number(
      assessment?.investment || 0
    )

  const balance =
    investment - totalCost

  return (
    <div className="startup-page">

      <header className="startup-header">

        <button
          className="startup-back"
          onClick={() =>
            setPage("dashboard")
          }
        >
          ← Dashboard
        </button>

        <div className="startup-title">

          <span>
            GRAM-BIZ AI
          </span>

          <h1>
            Startup Cost Calculator
          </h1>

          <p>
            Understand what you may need before
            starting your business.
          </p>

        </div>

      </header>


      <main className="startup-main">

        {/* BUSINESS SUMMARY */}

        <section className="startup-business-card">

          <div className="startup-business-icon">
            {categoryData.icon}
          </div>

          <div>

            <span>
              PERSONALIZED FOR YOUR BUSINESS
            </span>

            <h2>
              {categoryData.name}
            </h2>

            <p>
              {categoryData.description}
            </p>

            <small>
              📍{" "}
              {assessment?.location ||
                "Your local area"}
            </small>

          </div>

        </section>


        {/* ITEMS */}

        <section className="startup-card">

          <div className="startup-card-heading">

            <div>

              <span>
                ESTIMATED REQUIREMENTS
              </span>

              <h2>
                What do you need to start?
              </h2>

            </div>

            <span className="ai-badge">
              ✦ AI Guided
            </span>

          </div>


          <div className="startup-items">

            {items.map(
              (item, index) => (

                <div
                  className="startup-item"
                  key={item.name}
                >

                  <div className="startup-item-icon">
                    ✓
                  </div>

                  <div className="startup-item-info">

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      Estimated ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                      {" "}each
                    </span>

                  </div>

                  <div className="startup-quantity">

                    <label>
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        item.quantity
                      }
                      onChange={(e) => {

                        const updated =
                          [...items]

                        updated[index] = {
                          ...updated[index],
                          quantity:
                            e.target.value,
                        }

                        setItems(
                          updated
                        )
                      }}
                    />

                  </div>

                  <div className="startup-item-total">
                    ₹
                    {(
                      item.price *
                      Number(
                        item.quantity || 0
                      )
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </div>

                </div>
              )
            )}

          </div>


          <div className="startup-total">

            <div>

              <span>
                TOTAL ESTIMATED STARTUP COST
              </span>

              <strong>
                ₹
                {totalCost.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </section>


        {/* SUMMARY */}

        <section className="startup-summary-grid">

          <div className="startup-summary-box">

            <span>
              YOUR AVAILABLE INVESTMENT
            </span>

            <strong>
              ₹
              {investment.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div className="startup-summary-box">

            <span>
              ESTIMATED STARTUP COST
            </span>

            <strong>
              ₹
              {totalCost.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div
            className={`startup-summary-box ${
              balance >= 0
                ? "balance-positive"
                : "balance-negative"
            }`}
          >

            <span>
              {balance >= 0
                ? "BALANCE AVAILABLE"
                : "ADDITIONAL FUNDING NEEDED"}
            </span>

            <strong>
              ₹
              {Math.abs(
                balance
              ).toLocaleString(
                "en-IN"
              )}
            </strong>

            <small>
              {balance >= 0
                ? "Keep some money for working capital."
                : "You may need additional finance."}
            </small>

          </div>

        </section>


        {/* BEGINNER ADVICE */}

        <section className="startup-advice">

          <div className="startup-advice-icon">
            💡
          </div>

          <div>

            <span>
              BEGINNER BUSINESS TIP
            </span>

            <h2>
              Don't spend your entire investment on setup
            </h2>

            <p>
              Keep some money aside for monthly expenses,
              unexpected costs, raw materials and the first
              few months of business operations.
            </p>

          </div>

        </section>


        {/* ACTIONS */}

        <div className="startup-actions">

          <button
            onClick={() =>
              setPage("roadmap")
            }
          >
            ← Business Roadmap
          </button>

          <button
            className="startup-loan-btn"
            onClick={() =>
              setPage("loans")
            }
          >
            Explore Funding →
          </button>

        </div>

      </main>

    </div>
  )
}

export default StartupCalculator