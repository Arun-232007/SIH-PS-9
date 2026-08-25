import { useEffect, useMemo, useState } from "react"
import "./Roadmap.css"

function Roadmap({ setPage }) {
  const [assessment, setAssessment] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([])

  const [monthlyData, setMonthlyData] = useState({
    sales: "",
    expenses: "",
    customers: "",
    averageOrder: "",
  })

  const [month1Saved, setMonth1Saved] = useState(false)
  const [month2Estimate, setMonth2Estimate] =
    useState(null)
  const [forecastMonths, setForecastMonths] =
    useState([])

  /* =========================================================
     LOAD SAVED DATA
     ========================================================= */

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

    const savedProgress =
      localStorage.getItem(
        "gramBizRoadmapProgress"
      )

    if (savedProgress) {
      try {
        setCompletedSteps(
          JSON.parse(savedProgress)
        )
      } catch (error) {
        console.error(
          "Unable to load roadmap progress:",
          error
        )
      }
    }

    const savedMonth1 =
      localStorage.getItem("gramBizMonth1")

    if (savedMonth1) {
      try {
        const parsed =
          JSON.parse(savedMonth1)

        setMonthlyData({
          sales: parsed.sales || "",
          expenses: parsed.expenses || "",
          customers: parsed.customers || "",
          averageOrder:
            parsed.averageOrder || "",
        })

        setMonth1Saved(true)
      } catch (error) {
        console.error(
          "Unable to load Month 1 data:",
          error
        )
      }
    }

    const savedMonth2 =
      localStorage.getItem(
        "gramBizMonth2Estimate"
      )

    if (savedMonth2) {
      try {
        setMonth2Estimate(
          JSON.parse(savedMonth2)
        )
      } catch (error) {
        console.error(
          "Unable to load Month 2 estimate:",
          error
        )
      }
    }

    const savedForecast =
      localStorage.getItem(
        "gramBizYearForecast"
      )

    if (savedForecast) {
      try {
        setForecastMonths(
          JSON.parse(savedForecast)
        )
      } catch (error) {
        console.error(
          "Unable to load yearly forecast:",
          error
        )
      }
    }
  }, [])

  /* =========================================================
     BUSINESS INFORMATION
     ========================================================= */

  const rawBusinessType = String(
    assessment?.businessType || ""
  ).trim()

  const businessType =
    rawBusinessType.toLowerCase()

  const businessName =
    assessment?.businessType ||
    "Your Business"

  const investment =
    assessment?.investment ||
    "Not specified"

  /* =========================================================
     LOCATION SUPPORT
     Works with:
     location: "Chennai, Tamil Nadu"
     OR
     location: {
       city,
       district,
       state
     }
     ========================================================= */

  const locationText = (() => {
    const savedLocation =
      assessment?.location

    if (!savedLocation) {
      return "Your local area"
    }

    if (
      typeof savedLocation === "string"
    ) {
      return savedLocation
    }

    if (
      typeof savedLocation === "object"
    ) {
      const parts = [
        savedLocation.city,
        savedLocation.district,
        savedLocation.state,
      ].filter(Boolean)

      return parts.length > 0
        ? parts.join(", ")
        : "Your local area"
    }

    return "Your local area"
  })()

  /* =========================================================
     CATEGORY DATA
     ========================================================= */

  const categoryData = useMemo(() => {
    const text = businessType

    /* =======================================================
       DAIRY FARMING
       ======================================================= */

    if (
      text.includes("dairy") ||
      text.includes("milk")
    ) {
      return {
        category: "Dairy Farming",
        icon: "🐄",

        products: [
          "Fresh milk",
          "Curd",
          "Paneer",
          "Ghee",
          "Butter",
          "Milk products",
        ],

        customers:
          "Local households, tea shops, restaurants and retailers",

        firstMonthFocus:
          "Build a reliable daily milk supply and identify nearby customers.",

        secondMonthFocus:
          "Introduce value-added dairy products and regular delivery.",

        thirdMonthFocus:
          "Develop subscription customers and expand delivery routes.",

        materials:
          "Cattle feed, storage containers, cooling equipment and packaging",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Build a reliable milk supply, maintain animal care and identify nearby customers.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Introduce curd, paneer or other value-added products and build repeat customers.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Develop subscription customers, improve delivery and reach more local businesses.",
          },
        ],
      }
    }

    /* =======================================================
       TAILORING
       ======================================================= */

    if (
      text.includes("tailor") ||
      text.includes("stitch") ||
      text.includes("garment") ||
      text.includes("fashion")
    ) {
      return {
        category: "Tailoring",
        icon: "🧵",

        products: [
          "Blouse stitching",
          "Churidar stitching",
          "Skirt stitching",
          "Alterations",
          "School uniforms",
          "Custom dresses",
        ],

        customers:
          "Women, children, students, families and local boutiques",

        firstMonthFocus:
          "Start with blouse stitching, alterations and simple clothing orders.",

        secondMonthFocus:
          "Increase repeat customers and introduce churidars, skirts and uniforms.",

        thirdMonthFocus:
          "Promote custom designs, bulk stitching and boutique orders.",

        materials:
          "Fabric, thread, needles, zips, buttons, lining and packaging",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Start with blouse stitching, alterations and simple clothing orders.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Increase repeat customers and introduce churidars, skirts and uniforms.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Promote custom designs, bulk stitching and boutique orders.",
          },
        ],
      }
    }

    /* =======================================================
       FOOD
       ======================================================= */

    if (
      text.includes("food") ||
      text.includes("snack") ||
      text.includes("bakery") ||
      text.includes("catering")
    ) {
      return {
        category: "Food Business",
        icon: "🍱",

        products: [
          "Snacks",
          "Homemade food",
          "Bakery items",
          "Lunch boxes",
          "Catering orders",
          "Festival products",
        ],

        customers:
          "Local families, workers, students, shops and small functions",

        firstMonthFocus:
          "Start with a small menu and identify which products sell fastest.",

        secondMonthFocus:
          "Introduce repeat-order packages and local delivery.",

        thirdMonthFocus:
          "Accept bulk orders and function-based catering orders.",

        materials:
          "Ingredients, packaging, cooking equipment and storage materials",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Start with a small menu and identify the products customers prefer.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Introduce repeat-order packages and local delivery.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Accept bulk orders, catering requests and festival orders.",
          },
        ],
      }
    }

    /* =======================================================
       AGRICULTURE
       ======================================================= */

    if (
      text === "agriculture" ||
      text === "agriculture business" ||
      text.includes("agriculture") ||
      text.includes("farming") ||
      text.includes("farm") ||
      text.includes("agri")
    ) {
      return {
        category: "Agriculture",
        icon: "🌾",

        products: [
          "Vegetables",
          "Fruits",
          "Grains",
          "Nursery plants",
          "Organic products",
          "Value-added products",
        ],

        customers:
          "Local households, shops, markets, restaurants and wholesalers",

        firstMonthFocus:
          "Select suitable crops and calculate production and input costs.",

        secondMonthFocus:
          "Build direct local customers and reduce unnecessary middlemen.",

        thirdMonthFocus:
          "Explore value-added products and larger market opportunities.",

        materials:
          "Seeds, fertilizer, tools, irrigation and packaging materials",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Select suitable crops and calculate production and input costs.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Build direct local customers and reduce unnecessary middlemen.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Explore value-added products and larger market opportunities.",
          },
        ],
      }
    }

    /* =======================================================
       BEAUTY / SALON
       ======================================================= */

    if (
      text.includes("salon") ||
      text.includes("beauty") ||
      text.includes("parlour") ||
      text.includes("parlor")
    ) {
      return {
        category: "Beauty & Salon",
        icon: "💇",

        products: [
          "Hair services",
          "Facials",
          "Bridal services",
          "Makeup",
          "Manicure",
          "Pedicure",
        ],

        customers:
          "Women, men, students, families and bridal customers",

        firstMonthFocus:
          "Build a local customer base with affordable essential services.",

        secondMonthFocus:
          "Introduce packages, referrals and repeat-customer offers.",

        thirdMonthFocus:
          "Expand bridal and premium services.",

        materials:
          "Beauty products, equipment, hygiene supplies and packaging",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Build a local customer base with affordable essential services.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Introduce packages, referrals and repeat-customer offers.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Expand bridal services and premium beauty packages.",
          },
        ],
      }
    }

    /* =======================================================
       RETAIL
       ======================================================= */

    if (
      text.includes("retail") ||
      text.includes("shop") ||
      text.includes("store")
    ) {
      return {
        category: "Retail Business",
        icon: "🛒",

        products: [
          "Daily essentials",
          "Household products",
          "Personal care",
          "Stationery",
          "Local products",
          "Fast-moving items",
        ],

        customers:
          "Nearby households, students, workers and local customers",

        firstMonthFocus:
          "Identify fast-moving products and maintain essential stock.",

        secondMonthFocus:
          "Introduce customer offers and home delivery where possible.",

        thirdMonthFocus:
          "Expand high-demand products and improve inventory management.",

        materials:
          "Initial stock, shelves, packaging and billing materials",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Identify fast-moving products and maintain essential stock.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Introduce customer offers and home delivery where possible.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Expand high-demand products and improve inventory management.",
          },
        ],
      }
    }

    /* =======================================================
       REPAIR
       ======================================================= */

    if (
      text.includes("repair") ||
      text.includes("mobile") ||
      text.includes("electronics")
    ) {
      return {
        category: "Repair & Service",
        icon: "🔧",

        products: [
          "Basic repairs",
          "Maintenance",
          "Replacement services",
          "Accessories",
          "Installation",
          "Home service",
        ],

        customers:
          "Local households, students, shops and small businesses",

        firstMonthFocus:
          "Start with common repairs and build trust through quality service.",

        secondMonthFocus:
          "Add accessories and home-service options.",

        thirdMonthFocus:
          "Build repeat customers and local referrals.",

        materials:
          "Tools, spare parts, accessories and safety equipment",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Start with common repairs and build customer trust.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Add accessories and home-service options.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Build repeat customers and increase local referrals.",
          },
        ],
      }
    }

    /* =======================================================
       HANDICRAFTS
       ======================================================= */

    if (
      text.includes("handicraft") ||
      text.includes("craft") ||
      text.includes("handmade")
    ) {
      return {
        category: "Handicrafts",
        icon: "🎨",

        products: [
          "Handmade products",
          "Decorative items",
          "Baskets",
          "Jewellery",
          "Home decor",
          "Gift products",
        ],

        customers:
          "Local customers, tourists, gift shops and online buyers",

        firstMonthFocus:
          "Create a small product collection and understand customer preferences.",

        secondMonthFocus:
          "Improve packaging and promote products locally.",

        thirdMonthFocus:
          "Explore online and bulk-order opportunities.",

        materials:
          "Raw craft materials, tools, packaging and labels",

        monthlyFocus: [
          {
            month: "MONTH 1",
            title: "Start & Learn",
            text:
              "Create a small product collection and understand customer preferences.",
          },
          {
            month: "MONTH 2",
            title: "Improve & Grow",
            text:
              "Improve packaging and promote products locally.",
          },
          {
            month: "MONTH 3+",
            title: "Expand",
            text:
              "Explore online and bulk-order opportunities.",
          },
        ],
      }
    }

    /* =======================================================
       DEFAULT
       ======================================================= */

    return {
      category: businessName,
      icon: "🏪",

      products: [
        "Core product",
        "Local service",
        "Customized offering",
        "Repeat-order service",
      ],

      customers:
        "Nearby households, local customers and small businesses",

      firstMonthFocus:
        "Start small, understand customer demand and control your expenses.",

      secondMonthFocus:
        "Build repeat customers and improve your product or service.",

      thirdMonthFocus:
        "Expand your customer base and introduce additional offerings.",

      materials:
        "Basic equipment, raw materials and business supplies",

      monthlyFocus: [
        {
          month: "MONTH 1",
          title: "Start & Learn",
          text:
            "Start small, understand customer demand and control your expenses.",
        },
        {
          month: "MONTH 2",
          title: "Improve & Grow",
          text:
            "Build repeat customers and improve your product or service.",
        },
        {
          month: "MONTH 3+",
          title: "Expand",
          text:
            "Expand your customer base and introduce additional offerings.",
        },
      ],
    }
  }, [
    businessType,
    businessName,
  ])

  /* =========================================================
     ROADMAP STEPS
     ========================================================= */

  const roadmapSteps = [
    {
      id: 1,
      icon: "💡",
      title: "Understand Your Business",
      description:
        `Understand exactly what your ${categoryData.category} business will offer and who will buy from you.`,
      action:
        `Start with your main products or services: ${categoryData.products
          .slice(0, 3)
          .join(", ")}.`,
      time: "1–2 days",
      outcome: "Clear business idea",
    },

    {
      id: 2,
      icon: "🔎",
      title: "Check Your Local Market",
      description:
        "Understand customer demand, competitors and local pricing before spending too much money.",
      action:
        `Talk to 10–15 potential customers. Your likely customers are ${categoryData.customers}.`,
      time: "2–5 days",
      outcome: "Market understanding",
    },

    {
      id: 3,
      icon: "🧾",
      title: "Plan Products & Pricing",
      description:
        "Decide what you will sell, how much it costs and what price can give you a reasonable profit.",
      action:
        `Start with ${categoryData.products
          .slice(0, 4)
          .join(", ")}. Calculate material cost, labour cost and selling price.`,
      time: "3–5 days",
      outcome: "Simple pricing plan",
    },

    {
      id: 4,
      icon: "📋",
      title: "Create Your Business Plan",
      description:
        "Prepare a simple plan covering investment, monthly expenses, expected sales, customers and profit.",
      action:
        `Your planned investment is ₹${investment}. Write down your expected monthly expenses and expected sales.`,
      time: "3–7 days",
      outcome: "Practical business plan",
    },

    {
      id: 5,
      icon: "💰",
      title: "Arrange Finance",
      description:
        "Understand your funding requirement and explore suitable loans, subsidies and government support.",
      action:
        "Check the recommended government schemes and prepare the documents required for applying.",
      time: "3–10 days",
      outcome: "Funding strategy",
    },

    {
      id: 6,
      icon: "🚀",
      title: "Start Your Business",
      description:
        "Set up your workspace, equipment, materials, suppliers and basic customer process.",
      action:
        `Arrange the required materials for your business: ${categoryData.materials}.`,
      time: "1–4 weeks",
      outcome: "Business ready",
    },

    {
      id: 7,
      icon: "📢",
      title: "Get Your First Customers",
      description:
        "Use simple local marketing methods to bring your first customers and collect feedback.",
      action:
        "Tell nearby customers, friends, family and local groups about your business. Ask satisfied customers for referrals.",
      time: "1–4 weeks",
      outcome: "First customers",
    },

    {
      id: 8,
      icon: "📊",
      title: "Track Month 1 Performance",
      description:
        "Record your sales, expenses, number of customers and profit during your first month.",
      action:
        "Enter your Month 1 sales, expenses, customer count and average order value to understand your actual performance.",
      time: "1 month",
      outcome: "First-month report",
    },

    {
      id: 9,
      icon: "🤖",
      title: "AI Predicts Month 2",
      description:
        "Use your Month 1 performance to estimate your next month's sales and profit.",
      action:
        month1Saved
          ? "Your Month 2 estimate is ready. Review the projected sales, expenses and profit below."
          : "Save your Month 1 performance first. Gram-Biz AI will then generate a Month 2 estimate.",
      time: "1 day",
      outcome: "Month 2 estimate",
    },

    {
      id: 10,
      icon: "📈",
      title: "Improve & Grow",
      description:
        `Use your actual results and AI suggestions to improve your ${categoryData.category} business.`,
      action:
        categoryData.secondMonthFocus,
      time: "2–6 months",
      outcome: "Growing business",
    },

    {
      id: 11,
      icon: "🌱",
      title: "Expand Your Business",
      description:
        "Once your business becomes stable, introduce new products, reach new customers or increase capacity.",
      action:
        categoryData.thirdMonthFocus,
      time: "3–12 months",
      outcome: "Sustainable growth",
    },
  ]

  /* =========================================================
     MONTHLY CALCULATIONS
     ========================================================= */

  const salesNumber =
    Number(monthlyData.sales) || 0

  const expensesNumber =
    Number(monthlyData.expenses) || 0

  const month1Profit =
    salesNumber -
    expensesNumber

  const month1Margin =
    salesNumber > 0
      ? Math.round(
          (month1Profit /
            salesNumber) *
            100
        )
      : 0

  const calculateMonth2 = (
    data
  ) => {
    const sales =
      Number(data.sales) || 0

    const expenses =
      Number(data.expenses) || 0

    const customers =
      Number(data.customers) || 0

    const averageOrder =
      Number(
        data.averageOrder
      ) || 0

    if (sales <= 0) {
      return null
    }

    let growthRate = 0.08

    if (customers >= 50) {
      growthRate = 0.12
    }

    if (customers >= 100) {
      growthRate = 0.15
    }

    if (averageOrder >= 1000) {
      growthRate += 0.03
    }

    const estimatedSales =
      Math.round(
        sales *
          (1 + growthRate)
      )

    const estimatedExpenses =
      Math.round(
        expenses * 1.04
      )

    const estimatedProfit =
      estimatedSales -
      estimatedExpenses

    const estimatedMargin =
      estimatedSales > 0
        ? Math.round(
            (estimatedProfit /
              estimatedSales) *
              100
          )
        : 0

    return {
      growthRate:
        Math.round(
          growthRate * 100
        ),

      estimatedSales,

      estimatedExpenses,

      estimatedProfit,

      estimatedMargin,
    }
  }

  const generateYearForecast = (
    data
  ) => {
    const sales =
      Number(data.sales) || 0

    const expenses =
      Number(data.expenses) || 0

    const customerCount =
      Number(data.customers) || 0

    if (sales <= 0) {
      return
    }

    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ]

    let baseGrowth = 0.08

    if (customerCount >= 50) {
      baseGrowth = 0.10
    }

    if (customerCount >= 100) {
      baseGrowth = 0.13
    }

    const forecast =
      months.map(
        (month, index) => {
          const growth =
            Math.min(
              baseGrowth +
                index * 0.01,
              0.20
            )

          const projectedSales =
            Math.round(
              sales *
                Math.pow(
                  1 + growth,
                  index + 1
                )
            )

          const projectedExpenses =
            Math.round(
              expenses *
                Math.pow(
                  1.035,
                  index + 1
                )
            )

          const projectedProfit =
            projectedSales -
            projectedExpenses

          return {
            month,
            sales:
              projectedSales,
            expenses:
              projectedExpenses,
            profit:
              projectedProfit,
          }
        }
      )

    setForecastMonths(
      forecast
    )

    localStorage.setItem(
      "gramBizYearForecast",
      JSON.stringify(
        forecast
      )
    )
  }

  /* =========================================================
     SAVE MONTH 1
     ========================================================= */

  const saveMonth1 = () => {
    if (
      monthlyData.sales === "" ||
      monthlyData.expenses === ""
    ) {
      alert(
        "Please enter your Month 1 sales and expenses."
      )

      return
    }

    const savedMonth = {
      sales:
        monthlyData.sales,

      expenses:
        monthlyData.expenses,

      customers:
        monthlyData.customers,

      averageOrder:
        monthlyData.averageOrder,

      profit:
        month1Profit,

      margin:
        month1Margin,
    }

    localStorage.setItem(
      "gramBizMonth1",
      JSON.stringify(
        savedMonth
      )
    )

    const estimate =
      calculateMonth2(
        savedMonth
      )

    if (estimate) {
      localStorage.setItem(
        "gramBizMonth2Estimate",
        JSON.stringify(
          estimate
        )
      )

      setMonth2Estimate(
        estimate
      )
    }

    generateYearForecast(
      savedMonth
    )

    setMonth1Saved(true)

    if (
      !completedSteps.includes(8)
    ) {
      const updated = [
        ...completedSteps,
        8,
      ]

      setCompletedSteps(
        updated
      )

      localStorage.setItem(
        "gramBizRoadmapProgress",
        JSON.stringify(
          updated
        )
      )
    }

    alert(
      "Month 1 performance saved successfully."
    )
  }

  /* =========================================================
     MARK MONTH 2 COMPLETE
     ========================================================= */

  const completeMonth2 = () => {
    if (!month2Estimate) {
      alert(
        "Please save your Month 1 data first."
      )

      return
    }

    if (
      completedSteps.includes(9)
    ) {
      return
    }

    const updated = [
      ...completedSteps,
      9,
    ]

    setCompletedSteps(
      updated
    )

    localStorage.setItem(
      "gramBizRoadmapProgress",
      JSON.stringify(
        updated
      )
    )
  }

  /* =========================================================
     ROADMAP PROGRESS
     ========================================================= */

  const completedCount =
    completedSteps.length

  const progressPercentage =
    Math.round(
      (completedCount /
        roadmapSteps.length) *
        100
    )

  const nextStep =
    roadmapSteps.find(
      (step) =>
        !completedSteps.includes(
          step.id
        )
    ) || null

  const toggleStep = (id) => {
    setCompletedSteps(
      (previous) => {
        const updated =
          previous.includes(id)
            ? previous.filter(
                (stepId) =>
                  stepId !== id
              )
            : [
                ...previous,
                id,
              ]

        localStorage.setItem(
          "gramBizRoadmapProgress",
          JSON.stringify(
            updated
          )
        )

        return updated
      }
    )
  }

  const resetRoadmap = () => {
    const confirmReset =
      window.confirm(
        "Are you sure you want to reset your roadmap progress?"
      )

    if (!confirmReset) {
      return
    }

    setCompletedSteps([])

    localStorage.setItem(
      "gramBizRoadmapProgress",
      JSON.stringify([])
    )
  }

  /* =========================================================
     NEXT ACTION HANDLER
     ========================================================= */

  const handleNextAction = () => {
    if (!nextStep) {
      return
    }

    if (nextStep.id === 8) {
      document
        .getElementById(
          "monthly-tracking-section"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

      return
    }

    if (nextStep.id === 9) {
      if (!month2Estimate) {
        document
          .getElementById(
            "monthly-tracking-section"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })

        return
      }

      completeMonth2()

      return
    }

    toggleStep(
      nextStep.id
    )
  }

  return (
    <div className="roadmap-page">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="roadmap-sidebar">

        <div className="roadmap-logo">

          <div className="roadmap-logo-icon">
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


        <nav className="roadmap-nav">

          <button
            className="roadmap-nav-item"
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
            className="roadmap-nav-item"
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
            className="roadmap-nav-item"
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
            className="roadmap-nav-item"
            onClick={() =>
              setPage("loans")
            }
          >
            <span>
              ₹
            </span>

            Loan Schemes
          </button>


          <button className="roadmap-nav-item active">

            <span>
              🗺
            </span>

            Business Roadmap

          </button>

        </nav>


        <div className="roadmap-sidebar-bottom">

          <div className="roadmap-help">

            <span>
              ?
            </span>

            <div>

              <strong>
                Need Help?
              </strong>

              <p>
                Get simple guidance for your business.
              </p>

            </div>

          </div>


          <button
            className="roadmap-back"
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

      <main className="roadmap-main">

        {/* HEADER */}

        <header className="roadmap-header">

          <div>

            <p className="roadmap-eyebrow">
              🗺 AI BUSINESS JOURNEY
            </p>

            <h1>
              Your Business Roadmap
            </h1>

            <p>
              A simple step-by-step journey designed
              for rural entrepreneurs — from business
              idea to sustainable growth.
            </p>

          </div>


          <button
            className="roadmap-dashboard-btn"
            onClick={() =>
              setPage("dashboard")
            }
          >
            ← Dashboard
          </button>

        </header>


        {/* BUSINESS SUMMARY */}

        <section className="roadmap-business-card">

          <div className="business-main">

            <div className="business-icon">
              {categoryData.icon}
            </div>

            <div>

              <span>
                YOUR BUSINESS JOURNEY
              </span>

              <h2>
                {businessName}
              </h2>

              <p>
                📍 {locationText}
              </p>

            </div>

          </div>


          <div className="progress-summary">

            <div className="progress-summary-top">

              <span>
                Journey Progress
              </span>

              <strong>
                {completedCount}/
                {roadmapSteps.length}
              </strong>

            </div>


            <div className="roadmap-progress">

              <div
                style={{
                  width:
                    `${progressPercentage}%`,
                }}
              />

            </div>


            <small>
              {progressPercentage}% completed
            </small>

          </div>

        </section>


        {/* CATEGORY GUIDE */}

        <section className="roadmap-category-card">

          <div className="category-card-icon">
            {categoryData.icon}
          </div>


          <div className="category-card-main">

            <span>
              PERSONALIZED FOR YOUR BUSINESS
            </span>

            <h2>
              {categoryData.category}
              {" "}Business Guide
            </h2>

            <p>
              Gram-Biz AI has adapted this roadmap
              to your selected business category.
            </p>

          </div>


          <div className="category-product-list">

            {categoryData.products
              .slice(0, 4)
              .map(
                (product) => (
                  <span
                    key={product}
                  >
                    {product}
                  </span>
                )
              )}

          </div>

        </section>


        {/* NEXT ACTION */}

        {nextStep ? (

          <section className="next-action-card">

            <div className="next-action-icon">
              🎯
            </div>


            <div className="next-action-content">

              <span>
                YOUR NEXT ACTION
              </span>

              <h2>
                {nextStep.title}
              </h2>

              <p>
                {nextStep.action}
              </p>


              <div className="next-action-meta">

                <span>
                  ⏱ {nextStep.time}
                </span>

                <span>
                  ✓ {nextStep.outcome}
                </span>

              </div>

            </div>


            <button
              onClick={
                handleNextAction
              }
            >
              {nextStep.id === 8
                ? "Track Month 1"
                : nextStep.id === 9
                ? month2Estimate
                  ? "Complete Step"
                  : "View Tracker"
                : "Mark Complete"}
            </button>

          </section>

        ) : (

          <section className="completed-banner">

            <div className="completed-banner-icon">
              🎉
            </div>

            <div>

              <strong>
                Your business roadmap is complete!
              </strong>

              <p>
                Great work. Continue tracking your
                monthly sales, expenses and profit
                to make better business decisions.
              </p>

            </div>

          </section>

        )}


        {/* =================================================
            MONTHLY BUSINESS TRACKING
            ================================================= */}

        <section
          id="monthly-tracking-section"
          className="roadmap-card monthly-tracking-card"
        >

          <div className="section-heading">

            <div>

              <span>
                MONTHLY BUSINESS TRACKING
              </span>

              <h2>
                Track Your Business Progress
              </h2>

              <p className="section-subtext">
                Record your real business performance
                and use it to plan the next month.
              </p>

            </div>


            <span className="tracking-badge">
              ✦ AI Ready
            </span>

          </div>


          {/* MONTH 1 */}

          <div className="monthly-entry-card">

            <div className="monthly-entry-header">

              <div>

                <span>
                  MONTH 1
                </span>

                <h3>
                  Record Your Actual Performance
                </h3>

              </div>


              {month1Saved && (

                <span className="saved-badge">
                  ✓ Saved
                </span>

              )}

            </div>


            <div className="monthly-input-grid">

              <div className="monthly-input-box">

                <label>
                  Total Sales
                </label>

                <div className="monthly-input">

                  <span>
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 50000"
                    value={
                      monthlyData.sales
                    }
                    onChange={(e) =>
                      setMonthlyData({
                        ...monthlyData,
                        sales:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>


              <div className="monthly-input-box">

                <label>
                  Total Expenses
                </label>

                <div className="monthly-input">

                  <span>
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 30000"
                    value={
                      monthlyData.expenses
                    }
                    onChange={(e) =>
                      setMonthlyData({
                        ...monthlyData,
                        expenses:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>


              <div className="monthly-input-box">

                <label>
                  Number of Customers
                </label>

                <div className="monthly-input">

                  <span>
                    👥
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 45"
                    value={
                      monthlyData.customers
                    }
                    onChange={(e) =>
                      setMonthlyData({
                        ...monthlyData,
                        customers:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>


              <div className="monthly-input-box">

                <label>
                  Average Order Value
                </label>

                <div className="monthly-input">

                  <span>
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="Example: 1000"
                    value={
                      monthlyData.averageOrder
                    }
                    onChange={(e) =>
                      setMonthlyData({
                        ...monthlyData,
                        averageOrder:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

            </div>


            <div className="month1-result">

              <div>

                <span>
                  MONTH 1 PROFIT
                </span>

                <strong
                  className={
                    month1Profit < 0
                      ? "loss-value"
                      : ""
                  }
                >
                  ₹
                  {month1Profit.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div className="month1-result-meta">

                <span>
                  Margin: {month1Margin}%
                </span>

                <button
                  className="monthly-save-btn"
                  onClick={
                    saveMonth1
                  }
                >
                  Save Month 1 →
                </button>

              </div>

            </div>

          </div>


          {/* MONTH 2 */}

          {month2Estimate && (

            <div className="month2-estimate-card">

              <div className="month2-header">

                <div>

                  <span>
                    MONTH 2 AI ESTIMATE
                  </span>

                  <h3>
                    Your projected business performance
                  </h3>

                </div>

                <div className="prediction-badge">
                  +{month2Estimate.growthRate}%
                  {" "}growth
                </div>

              </div>


              <div className="estimate-grid">

                <div>

                  <span>
                    ESTIMATED SALES
                  </span>

                  <strong>
                    ₹
                    {month2Estimate.estimatedSales.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    ESTIMATED EXPENSES
                  </span>

                  <strong>
                    ₹
                    {month2Estimate.estimatedExpenses.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    ESTIMATED PROFIT
                  </span>

                  <strong
                    className={
                      month2Estimate.estimatedProfit <
                      0
                        ? "loss-value"
                        : ""
                    }
                  >
                    ₹
                    {month2Estimate.estimatedProfit.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    PROFIT MARGIN
                  </span>

                  <strong>
                    {month2Estimate.estimatedMargin}%
                  </strong>

                </div>

              </div>


              <div className="prediction-note">

                <strong>
                  ✦ AI prediction
                </strong>

                <p>
                  This is a planning estimate based on
                  your Month 1 performance. Actual results
                  may differ depending on demand, pricing,
                  customers, seasonality and expenses.
                </p>

              </div>


              {!completedSteps.includes(
                9
              ) && (

                <button
                  className="complete-month2-btn"
                  onClick={
                    completeMonth2
                  }
                >
                  ✓ Complete Month 2 Prediction
                </button>

              )}

            </div>

          )}


          {/* GROWTH */}

          {month1Saved &&
            month2Estimate && (

              <div className="business-growth-box">

                <div className="growth-icon">
                  📈
                </div>

                <div>

                  <span>
                    BUSINESS GROWTH
                  </span>

                  <h3>
                    Your business is now being tracked
                  </h3>

                  <p>
                    Compare your actual Month 1 results
                    with future monthly performance to
                    understand whether the business is
                    improving.
                  </p>

                </div>

              </div>

            )}

        </section>


        {/* =================================================
            12 MONTH FORECAST
            ================================================= */}

        {forecastMonths.length > 0 && (

          <section className="roadmap-card yearly-forecast-card">

            <div className="section-heading">

              <div>

                <span>
                  12-MONTH BUSINESS OUTLOOK
                </span>

                <h2>
                  Your Yearly Growth Forecast
                </h2>

                <p className="section-subtext">
                  A planning view based on your Month 1
                  performance and expected growth.
                </p>

              </div>

              <span className="tracking-badge">
                ✦ AI Forecast
              </span>

            </div>


            <div className="forecast-grid">

              {forecastMonths.map(
                (item) => (

                  <div
                    className="forecast-month-card"
                    key={item.month}
                  >

                    <span className="forecast-month">
                      {item.month}
                    </span>


                    <div>

                      <small>
                        SALES
                      </small>

                      <strong>
                        ₹
                        {item.sales.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>


                    <div>

                      <small>
                        EXPENSES
                      </small>

                      <strong className="forecast-expense">
                        ₹
                        {item.expenses.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>


                    <div>

                      <small>
                        PROFIT
                      </small>

                      <strong className="forecast-profit">
                        ₹
                        {item.profit.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  </div>

                )
              )}

            </div>


            <div className="forecast-note">

              <span>
                💡
              </span>

              <p>
                This forecast is a planning estimate.
                Real business performance can change
                based on customer demand, seasonal
                conditions, pricing, costs and other
                factors.
              </p>

            </div>

          </section>

        )}


        {/* =================================================
            BUSINESS JOURNEY
            ================================================= */}

        <section className="roadmap-section">

          <div className="section-heading">

            <div>

              <span>
                BUSINESS JOURNEY
              </span>

              <h2>
                From Idea to Growth
              </h2>

            </div>


            <div className="section-heading-actions">

              <p>
                Complete each stage at your own pace.
              </p>

              <button
                className="reset-roadmap-btn"
                onClick={
                  resetRoadmap
                }
              >
                ↻ Reset Progress
              </button>

            </div>

          </div>


          <div className="roadmap-timeline">

            {roadmapSteps.map(
              (step, index) => {

                const completed =
                  completedSteps.includes(
                    step.id
                  )

                const current =
                  nextStep?.id ===
                  step.id

                return (

                  <div
                    className={`roadmap-step ${
                      completed
                        ? "completed"
                        : ""
                    } ${
                      current
                        ? "current"
                        : ""
                    }`}
                    key={step.id}
                  >

                    <div className="timeline-column">

                      <div className="timeline-number">

                        {completed
                          ? "✓"
                          : step.id}

                      </div>


                      {index !==
                        roadmapSteps.length -
                          1 && (

                        <div className="timeline-line" />

                      )}

                    </div>


                    <div className="roadmap-step-card">

                      <div className="step-top">

                        <div className="step-title">

                          <div className="step-icon">
                            {step.icon}
                          </div>

                          <div>

                            <span>
                              STEP {step.id}
                            </span>

                            <h3>
                              {step.title}
                            </h3>

                          </div>

                        </div>


                        <span className="step-status">

                          {completed
                            ? "Completed"
                            : current
                            ? "Current"
                            : "Upcoming"}

                        </span>

                      </div>


                      <p className="step-description">
                        {step.description}
                      </p>


                      <div className="step-action">

                        <strong>
                          What you should do
                        </strong>

                        <p>
                          {step.action}
                        </p>

                      </div>


                      <div className="step-footer">

                        <span>
                          ⏱ {step.time}
                        </span>

                        <span>
                          🎯 {step.outcome}
                        </span>


                        <button
                          onClick={() => {

                            if (
                              step.id === 8
                            ) {
                              document
                                .getElementById(
                                  "monthly-tracking-section"
                                )
                                ?.scrollIntoView({
                                  behavior:
                                    "smooth",
                                  block:
                                    "start",
                                })

                              return
                            }

                            if (
                              step.id === 9
                            ) {

                              if (
                                !month2Estimate
                              ) {
                                document
                                  .getElementById(
                                    "monthly-tracking-section"
                                  )
                                  ?.scrollIntoView({
                                    behavior:
                                      "smooth",
                                    block:
                                      "start",
                                  })

                                return
                              }

                              completeMonth2()

                              return
                            }

                            toggleStep(
                              step.id
                            )
                          }}
                        >
                          {completed
                            ? "✓ Completed"
                            : step.id === 8
                            ? "Track Month 1"
                            : step.id === 9
                            ? month2Estimate
                              ? "Complete Step"
                              : "View Tracker"
                            : "Mark Complete"}
                        </button>

                      </div>

                    </div>

                  </div>

                )
              }
            )}

          </div>

        </section>


        {/* =================================================
            CATEGORY MONTHLY GUIDE
            ================================================= */}

        <section className="roadmap-card category-guide">

          <div className="section-heading">

            <div>

              <span>
                BUSINESS-SPECIFIC GUIDANCE
              </span>

              <h2>
                What to Focus on Next
              </h2>

            </div>

          </div>


          <div className="category-focus-grid">

            {categoryData.monthlyFocus.map(
              (item) => (

                <div
                  key={item.month}
                >

                  <span>
                    {item.month}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            AI GUIDANCE
            ================================================= */}

        <section className="roadmap-ai-card">

          <div className="roadmap-ai-icon">
            ✦
          </div>

          <div>

            <span>
              GRAM-BIZ AI ASSISTANT
            </span>

            <h2>
              Need help with your next step?
            </h2>

            <p>
              Gram-Biz AI can guide you through
              business planning, funding, customers,
              pricing and growth based on your
              assessment.
            </p>

          </div>

          <button
            onClick={() =>
              setPage("assessment")
            }
          >
            Update Assessment
          </button>

        </section>


        {/* FOOTER */}

        <div className="roadmap-footer">

          <span>
            Gram-Biz AI
          </span>

          <span>
            Smart Business. Stronger Villages.
          </span>

        </div>

      </main>

    </div>
  )
}

export default Roadmap