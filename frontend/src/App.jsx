import { useState } from "react"

import Home from "./pages/Home"
import Assessment from "./pages/Assessment"
import Dashboard from "./pages/Dashboard"
import LoanSchemes from "./pages/LoanSchemes"
import Reports from "./pages/Reports"
import Roadmap from "./pages/Roadmap"
import StartupCalculator from "./pages/StartupCalculator"
import BusinessPlan from "./pages/BusinessPlan"
import BusinessGuide from "./pages/BusinessGuide"
import MarketingPlan from "./pages/MarketingPlan"
import MonthlyTracker from "./pages/MonthlyTracker"

function App() {
  const [page, setPage] = useState("home")

  return (
    <>
      {/* HOME */}
      {page === "home" && (
        <Home setPage={setPage} />
      )}

      {/* ASSESSMENT */}
      {page === "assessment" && (
        <Assessment setPage={setPage} />
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}

      {/* LOAN SCHEMES */}
      {page === "loans" && (
        <LoanSchemes setPage={setPage} />
      )}

      {/* REPORTS */}
      {page === "reports" && (
        <Reports setPage={setPage} />
      )}

      {/* BUSINESS ROADMAP */}
      {page === "roadmap" && (
        <Roadmap setPage={setPage} />
      )}

      {/* STARTUP CALCULATOR */}
      {page === "calculator" && (
        <StartupCalculator setPage={setPage} />
      )}

      {/* BUSINESS PLAN */}
      {page === "business-plan" && (
        <BusinessPlan setPage={setPage} />
      )}

      {/* UNDERSTAND CUSTOMERS */}
      {page === "customers" && (
        <BusinessGuide
          setPage={setPage}
          mode="customers"
        />
      )}

      {/* CHECK LOCAL MARKET */}
      {page === "market" && (
        <BusinessGuide
          setPage={setPage}
          mode="market"
        />
      )}

      {/* MARKETING PLAN */}
      {page === "marketing" && (
        <MarketingPlan setPage={setPage} />
      )}

      {/* MONTHLY TRACKER */}
      {page === "monthly-tracker" && (
        <MonthlyTracker setPage={setPage} />
      )}
    </>
  )
}

export default App