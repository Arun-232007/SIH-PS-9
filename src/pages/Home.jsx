import "./Home.css"

function Home({ setPage }) {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <div className="home-brand">
          <div className="brand-icon">G</div>

          <div>
            <strong>Gram-Biz AI</strong>
            <span>Smart Business. Stronger Villages</span>
          </div>
        </div>

        <div className="home-nav-links">

          <button
            className="active"
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            onClick={() => setPage("assessment")}
          >
            Assessment
          </button>

          <button
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

        </div>

        <button
          className="nav-start-btn"
          onClick={() => setPage("assessment")}
        >
          Get Started →
        </button>

      </nav>


      {/* ================= HERO ================= */}

      <main className="home-hero">

        <div className="hero-left">

          <div className="hero-badge">
            <span>✦</span>
            AI-powered rural entrepreneurship
          </div>

          <h1>
            Turn Your
            <span> Rural Idea</span>
            <br />
            Into a Growing Business.
          </h1>

          <p>
            Gram-Biz AI helps rural entrepreneurs understand local demand,
            evaluate business opportunities and discover suitable government
            loan schemes — all through one intelligent platform.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-hero-btn"
              onClick={() => setPage("assessment")}
            >
              Discover Your Business Potential →
            </button>

            <button
              className="secondary-hero-btn"
              onClick={() => setPage("dashboard")}
            >
              Explore Dashboard
            </button>

          </div>


          {/* ================= TRUST POINTS ================= */}

          <div className="hero-trust">

            <div className="trust-item">
              <strong>Local Insights</strong>
              <span>Understand your village market</span>
            </div>

            <div className="trust-item">
              <strong>Smart Funding</strong>
              <span>Find suitable loan schemes</span>
            </div>

            <div className="trust-item">
              <strong>AI Guidance</strong>
              <span>Make confident decisions</span>
            </div>

          </div>

        </div>


        {/* ================= AI VISUAL ================= */}

        <div className="hero-right">

          <div className="hero-glow"></div>


          {/* ================= BUSINESS POTENTIAL ================= */}

          <div className="floating-card card-one">

            <span>📈</span>

            <div>
              <strong>82%</strong>
              <small>Business Potential</small>
            </div>

          </div>


          {/* ================= AI DASHBOARD ================= */}

          <div className="ai-dashboard-card">

            <div className="mini-card-header">

              <div className="mini-profile">

                <div className="mini-avatar">
                  G
                </div>

                <div>
                  <strong>Gram-Biz AI Analysis</strong>

                  <span>
                    Analysing your local opportunity
                  </span>
                </div>

              </div>

              <span className="online-dot"></span>

            </div>


            {/* ================= SCORE ================= */}

            <div className="mini-score-area">

              <div className="mini-score-circle">

                <strong>82</strong>

                <span>/100</span>

              </div>


              <div>

                <span className="mini-label">
                  BUSINESS SCORE
                </span>

                <h3>
                  Strong Local Potential
                </h3>

                <p>
                  Your idea shows encouraging demand
                  in the local market.
                </p>

              </div>

            </div>


            {/* ================= ANALYSIS BARS ================= */}

            <div className="mini-bars">

              <div>

                <span>
                  <b>Market Demand</b>
                  88%
                </span>

                <div className="mini-progress">
                  <i style={{ width: "88%" }}></i>
                </div>

              </div>


              <div>

                <span>
                  <b>Profitability</b>
                  79%
                </span>

                <div className="mini-progress">
                  <i style={{ width: "79%" }}></i>
                </div>

              </div>


              <div>

                <span>
                  <b>Competition</b>
                  76%
                </span>

                <div className="mini-progress">
                  <i style={{ width: "76%" }}></i>
                </div>

              </div>

            </div>


            {/* ================= AI RECOMMENDATION ================= */}

            <div className="mini-recommendation">

              <span>✦</span>

              <div>

                <strong>
                  Gram-Biz AI Recommendation
                </strong>

                <p>
                  Build locally. Grow sustainably.
                  Create community value.
                </p>

              </div>

            </div>

          </div>


          {/* ================= FUNDING MATCH ================= */}

          <div className="floating-card card-two">

            <span>₹</span>

            <div>
              <strong>₹4.5L</strong>
              <small>Funding Match</small>
            </div>

          </div>

        </div>

      </main>


      {/* ================= FEATURES ================= */}

      <section className="home-features">

        <div className="section-heading">

          <span>
            BUILT FOR RURAL ENTREPRENEURS
          </span>

          <h2>
            From a local idea to a smarter business.
          </h2>

          <p>
            Gram-Biz AI brings market insights, business evaluation
            and financial guidance together to help entrepreneurs
            make better decisions and build sustainable businesses.
          </p>

        </div>


        <div className="feature-grid">


          {/* ================= FEATURE 1 ================= */}

          <div className="feature-card">

            <div className="feature-icon">
              🌱
            </div>

            <h3>
              Discover Opportunities
            </h3>

            <p>
              Identify business ideas that can work well
              in your local community and market.
            </p>

          </div>


          {/* ================= FEATURE 2 ================= */}

          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Understand Local Demand
            </h3>

            <p>
              Analyse demand, competition and potential
              profitability before investing your money.
            </p>

          </div>


          {/* ================= FEATURE 3 ================= */}

          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <h3>
              Find Suitable Funding
            </h3>

            <p>
              Discover government loan schemes and financial
              support that match your business profile.
            </p>

          </div>


          {/* ================= FEATURE 4 ================= */}

          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              Grow With AI Guidance
            </h3>

            <p>
              Get simple recommendations that help you make
              confident business decisions.
            </p>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}

      <section className="home-cta">

        <div>

          <span>
            READY TO TAKE THE FIRST STEP?
          </span>

          <h2>
            Your idea could be the next
            successful business in your village.
          </h2>

          <p>
            Let Gram-Biz AI help you understand its potential.
          </p>

        </div>

        <button
          onClick={() => setPage("assessment")}
        >
          Start Your Assessment →
        </button>

      </section>

    </div>
  )
}

export default Home