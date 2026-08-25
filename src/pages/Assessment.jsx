import { useState } from "react"
import "./Assessment.css"

function Assessment({ setPage }) {
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    city: "",
    business: "",
    investment: "",
    experience: "",
    language: "English",
  })

  // =========================================================
  // LOCATION DATA
  // =========================================================

  const locationData = {
    "Andhra Pradesh": {
      "Anakapalli": ["Anakapalle", "Narsipatnam"],
      "Chittoor": ["Chittoor", "Tirupati"],
      "Guntur": ["Guntur", "Tenali"],
      "Krishna": ["Vijayawada", "Machilipatnam"],
      "Kurnool": ["Kurnool", "Adoni"],
      "Nellore": ["Nellore", "Kavali"],
      "Prakasam": ["Ongole", "Markapur"],
      "Visakhapatnam": ["Visakhapatnam", "Bheemunipatnam"],
    },

    "Assam": {
      "Kamrup Metropolitan": ["Guwahati"],
      "Dibrugarh": ["Dibrugarh"],
      "Jorhat": ["Jorhat"],
      "Sonitpur": ["Tezpur"],
    },

    "Bihar": {
      "Patna": ["Patna", "Danapur"],
      "Gaya": ["Gaya"],
      "Muzaffarpur": ["Muzaffarpur"],
      "Nalanda": ["Bihar Sharif"],
    },

    "Chhattisgarh": {
      "Raipur": ["Raipur"],
      "Durg": ["Bhilai", "Durg"],
      "Bilaspur": ["Bilaspur"],
      "Korba": ["Korba"],
    },

    "Delhi": {
      "Central Delhi": ["New Delhi"],
      "North Delhi": ["Delhi"],
      "South Delhi": ["Delhi"],
    },

    "Goa": {
      "North Goa": ["Panaji", "Mapusa"],
      "South Goa": ["Margao", "Vasco da Gama"],
    },

    "Gujarat": {
      "Ahmedabad": ["Ahmedabad"],
      "Gandhinagar": ["Gandhinagar"],
      "Rajkot": ["Rajkot"],
      "Surat": ["Surat"],
      "Vadodara": ["Vadodara"],
    },

    "Haryana": {
      "Gurugram": ["Gurugram"],
      "Faridabad": ["Faridabad"],
      "Hisar": ["Hisar"],
      "Panipat": ["Panipat"],
    },

    "Himachal Pradesh": {
      "Shimla": ["Shimla"],
      "Kangra": ["Dharamshala"],
      "Mandi": ["Mandi"],
      "Solan": ["Solan"],
    },

    "Jharkhand": {
      "Ranchi": ["Ranchi"],
      "East Singhbhum": ["Jamshedpur"],
      "Dhanbad": ["Dhanbad"],
      "Bokaro": ["Bokaro"],
    },

    "Karnataka": {
      "Bengaluru Urban": ["Bengaluru"],
      "Mysuru": ["Mysuru"],
      "Dakshina Kannada": ["Mangaluru"],
      "Belagavi": ["Belagavi"],
      "Dharwad": ["Hubballi", "Dharwad"],
      "Shivamogga": ["Shivamogga"],
    },

    "Kerala": {
      "Thiruvananthapuram": ["Thiruvananthapuram"],
      "Ernakulam": ["Kochi"],
      "Kozhikode": ["Kozhikode"],
      "Thrissur": ["Thrissur"],
      "Kollam": ["Kollam"],
      "Kannur": ["Kannur"],
    },

    "Madhya Pradesh": {
      "Bhopal": ["Bhopal"],
      "Indore": ["Indore"],
      "Jabalpur": ["Jabalpur"],
      "Gwalior": ["Gwalior"],
      "Ujjain": ["Ujjain"],
    },

    "Maharashtra": {
      "Mumbai City": ["Mumbai"],
      "Pune": ["Pune"],
      "Nagpur": ["Nagpur"],
      "Nashik": ["Nashik"],
      "Aurangabad": ["Chhatrapati Sambhajinagar"],
      "Thane": ["Thane", "Kalyan"],
    },

    "Odisha": {
      "Khordha": ["Bhubaneswar"],
      "Cuttack": ["Cuttack"],
      "Ganjam": ["Berhampur"],
      "Sundargarh": ["Rourkela"],
    },

    "Punjab": {
      "Amritsar": ["Amritsar"],
      "Ludhiana": ["Ludhiana"],
      "Jalandhar": ["Jalandhar"],
      "Patiala": ["Patiala"],
    },

    "Rajasthan": {
      "Jaipur": ["Jaipur"],
      "Jodhpur": ["Jodhpur"],
      "Udaipur": ["Udaipur"],
      "Kota": ["Kota"],
      "Ajmer": ["Ajmer"],
    },

    "Tamil Nadu": {
      "Ariyalur": ["Ariyalur", "Andimadam"],
      "Chengalpattu": ["Chengalpattu", "Tambaram", "Madurantakam"],
      "Chennai": ["Chennai"],
      "Coimbatore": ["Coimbatore", "Pollachi", "Mettupalayam"],
      "Cuddalore": ["Cuddalore", "Chidambaram", "Panruti"],
      "Dharmapuri": ["Dharmapuri", "Palacode"],
      "Dindigul": ["Dindigul", "Palani", "Oddanchatram"],
      "Erode": ["Erode", "Bhavani", "Gobichettipalayam"],
      "Kallakurichi": ["Kallakurichi", "Ulundurpet"],
      "Kancheepuram": ["Kanchipuram", "Sriperumbudur"],
      "Karur": ["Karur", "Kulithalai"],
      "Krishnagiri": ["Krishnagiri", "Hosur"],
      "Madurai": ["Madurai", "Melur", "Thirumangalam"],
      "Mayiladuthurai": ["Mayiladuthurai", "Sirkazhi"],
      "Nagapattinam": ["Nagapattinam", "Vedaranyam"],
      "Namakkal": ["Namakkal", "Tiruchengode", "Rasipuram"],
      "Nilgiris": ["Ooty", "Coonoor", "Gudalur"],
      "Perambalur": ["Perambalur", "Veppanthattai"],
      "Pudukkottai": ["Pudukkottai", "Aranthangi"],
      "Ramanathapuram": ["Ramanathapuram", "Paramakudi"],
      "Ranipet": ["Ranipet", "Arcot", "Walajapet"],
      "Salem": ["Salem", "Mettur", "Attur"],
      "Sivaganga": ["Sivaganga", "Karaikudi"],
      "Tenkasi": ["Tenkasi", "Sankarankovil", "Courtallam"],
      "Thanjavur": ["Thanjavur", "Kumbakonam", "Pattukkottai"],
      "Theni": ["Theni", "Periyakulam", "Bodinayakanur"],
      "Thoothukudi": ["Thoothukudi", "Kovilpatti", "Tiruchendur"],
      "Tiruchirappalli": ["Tiruchirappalli", "Manapparai", "Musiri"],
      "Tirunelveli": ["Tirunelveli", "Ambasamudram", "Palayamkottai"],
      "Tirupathur": ["Tirupathur", "Vaniyambadi"],
      "Tiruppur": ["Tiruppur", "Dharapuram", "Udumalpet"],
      "Tiruvallur": ["Tiruvallur", "Avadi", "Ponneri"],
      "Tiruvannamalai": ["Tiruvannamalai", "Arani"],
      "Tiruvarur": ["Tiruvarur", "Mannargudi"],
      "Vellore": ["Vellore", "Katpadi"],
      "Viluppuram": ["Viluppuram", "Tindivanam"],
      "Virudhunagar": ["Virudhunagar", "Sivakasi", "Rajapalayam"],
    },

    "Telangana": {
      "Hyderabad": ["Hyderabad"],
      "Rangareddy": ["Hyderabad", "Shamshabad"],
      "Warangal": ["Warangal"],
      "Nizamabad": ["Nizamabad"],
    },

    "Uttar Pradesh": {
      "Lucknow": ["Lucknow"],
      "Kanpur Nagar": ["Kanpur"],
      "Agra": ["Agra"],
      "Varanasi": ["Varanasi"],
      "Prayagraj": ["Prayagraj"],
      "Gautam Buddha Nagar": ["Noida", "Greater Noida"],
    },

    "Uttarakhand": {
      "Dehradun": ["Dehradun"],
      "Haridwar": ["Haridwar", "Roorkee"],
      "Nainital": ["Nainital", "Haldwani"],
    },

    "West Bengal": {
      "Kolkata": ["Kolkata"],
      "Howrah": ["Howrah"],
      "Darjeeling": ["Darjeeling", "Siliguri"],
      "North 24 Parganas": ["Barasat"],
    },

    "Jammu and Kashmir": {
      "Srinagar": ["Srinagar"],
      "Jammu": ["Jammu"],
      "Anantnag": ["Anantnag"],
    },

    "Puducherry": {
      "Puducherry": ["Puducherry"],
      "Karaikal": ["Karaikal"],
    },
  }

  // =========================================================
  // SORT STATES ALPHABETICALLY
  // =========================================================

  const states = Object.keys(locationData).sort((a, b) =>
    a.localeCompare(b)
  )

  // =========================================================
  // GET DISTRICTS
  // =========================================================

  const districts = formData.state
    ? Object.keys(locationData[formData.state]).sort((a, b) =>
        a.localeCompare(b)
      )
    : []

  // =========================================================
  // GET CITIES
  // =========================================================

  const cities =
    formData.state && formData.district
      ? [...locationData[formData.state][formData.district]].sort((a, b) =>
          a.localeCompare(b)
        )
      : []

  // =========================================================
  // HANDLE FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "state") {
      setFormData({
        ...formData,
        state: value,
        district: "",
        city: "",
      })

      return
    }

    if (name === "district") {
      setFormData({
        ...formData,
        district: value,
        city: "",
      })

      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // =========================================================
  // BUSINESS DISPLAY NAME
  // =========================================================

  const getBusinessName = (value) => {
    const businessNames = {
      dairy: "Dairy Farming",
      poultry: "Poultry Farming",
      millet: "Millet Processing",
      food: "Food Processing",
      tailoring: "Tailoring",
      handicraft: "Handicrafts",
      retail: "Rural Retail Shop",
      other: "Other",
    }

    return businessNames[value] || value
  }

  // =========================================================
  // EXPERIENCE DISPLAY NAME
  // =========================================================

  const getExperienceName = (value) => {
    const experienceNames = {
      none: "No experience",
      beginner: "Less than 1 year",
      some: "1–3 years",
      experienced: "More than 3 years",
    }

    return experienceNames[value] || value
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault()

    const location = `${formData.city}, ${formData.district}, ${formData.state}`

    const assessmentData = {
      location: location,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      businessType: getBusinessName(formData.business),
      businessKey: formData.business,
      investment: formData.investment,
      experience: getExperienceName(formData.experience),
      language: formData.language,
    }

    localStorage.setItem(
      "gramBizAssessment",
      JSON.stringify(assessmentData)
    )

    console.log("Business Assessment:", assessmentData)

    setPage("dashboard")
  }

  return (
    <div className="assessment-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="assessment-header">

        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

        <div className="assessment-brand">

          <div className="assessment-brand-icon">
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

        <div className="assessment-progress">

          <span>
            BUSINESS ASSESSMENT
          </span>

          <strong>
            5 Steps
          </strong>

        </div>

      </header>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="assessment-container">

        {/* INTRO */}

        <section className="assessment-intro">

          <div className="assessment-badge">
            <span>✦</span>
            AI BUSINESS ASSESSMENT
          </div>

          <h1>
            Let's understand
            <span> your business idea.</span>
          </h1>

          <p>
            Answer a few simple questions. Gram-Biz AI will analyze
            your local market, financial feasibility and suitable
            government schemes.
          </p>

        </section>


        {/* FORM */}

        <form
          className="assessment-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              STEP 01 — LOCATION
              ================================================= */}

          <div className="form-section">

            <div className="section-number">
              01
            </div>

            <div className="form-content">

              <div className="form-title-row">

                <label>
                  Where is your business located?
                </label>

                <span className="required-label">
                  Required
                </span>

              </div>

              <p>
                Select your state, district and city or town.
              </p>


              {/* LOCATION GRID */}

              <div className="location-grid">

                {/* STATE */}

                <div className="location-field">

                  <label>
                    State
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      🗺️
                    </span>

                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select State
                      </option>

                      {states.map((state) => (
                        <option
                          key={state}
                          value={state}
                        >
                          {state}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>


                {/* DISTRICT */}

                <div className="location-field">

                  <label>
                    District
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      📍
                    </span>

                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      disabled={!formData.state}
                    >

                      <option value="">
                        {formData.state
                          ? "Select District"
                          : "Select State First"}
                      </option>

                      {districts.map((district) => (
                        <option
                          key={district}
                          value={district}
                        >
                          {district}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>


                {/* CITY */}

                <div className="location-field">

                  <label>
                    City / Town
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      🏘️
                    </span>

                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      disabled={!formData.district}
                    >

                      <option value="">
                        {formData.district
                          ? "Select City / Town"
                          : "Select District First"}
                      </option>

                      {cities.map((city) => (
                        <option
                          key={city}
                          value={city}
                        >
                          {city}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>

              </div>


              {/* LOCATION PREVIEW */}

              {formData.city &&
                formData.district &&
                formData.state && (
                  <div className="location-preview">

                    <span>
                      ✓
                    </span>

                    <div>

                      <strong>
                        Selected Location
                      </strong>

                      <p>
                        {formData.city},{" "}
                        {formData.district},{" "}
                        {formData.state}
                      </p>

                    </div>

                  </div>
                )}

            </div>

          </div>


          {/* =================================================
              STEP 02 — BUSINESS
              ================================================= */}

          <div className="form-section">

            <div className="section-number">
              02
            </div>

            <div className="form-content">

              <div className="form-title-row">

                <label>
                  What business do you want to start?
                </label>

                <span className="required-label">
                  Required
                </span>

              </div>

              <p>
                Choose the business idea you are interested in.
              </p>

              <div className="input-wrapper">

                <span className="input-icon">
                  💡
                </span>

                <select
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a business
                  </option>

                  <option value="dairy">
                    🥛 Dairy Farming
                  </option>

                  <option value="poultry">
                    🐔 Poultry Farming
                  </option>

                  <option value="millet">
                    🌾 Millet Processing
                  </option>

                  <option value="food">
                    🍱 Food Processing
                  </option>

                  <option value="tailoring">
                    🧵 Tailoring
                  </option>

                  <option value="handicraft">
                    🧺 Handicrafts
                  </option>

                  <option value="retail">
                    🏪 Rural Retail Shop
                  </option>

                  <option value="other">
                    💡 Other
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              STEP 03 — INVESTMENT
              ================================================= */}

          <div className="form-section">

            <div className="section-number">
              03
            </div>

            <div className="form-content">

              <div className="form-title-row">

                <label>
                  How much can you invest?
                </label>

                <span className="required-label">
                  Required
                </span>

              </div>

              <p>
                Include your own savings and available capital.
              </p>

              <div className="input-wrapper input-with-symbol">

                <span className="currency-symbol">
                  ₹
                </span>

                <input
                  type="number"
                  name="investment"
                  placeholder="Example: 100000"
                  value={formData.investment}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>

            </div>

          </div>


          {/* =================================================
              STEP 04 — EXPERIENCE
              ================================================= */}

          <div className="form-section">

            <div className="section-number">
              04
            </div>

            <div className="form-content">

              <div className="form-title-row">

                <label>
                  Do you have experience in this field?
                </label>

                <span className="required-label">
                  Required
                </span>

              </div>

              <p>
                This helps us personalize your recommendation.
              </p>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select experience
                  </option>

                  <option value="none">
                    No experience
                  </option>

                  <option value="beginner">
                    Less than 1 year
                  </option>

                  <option value="some">
                    1–3 years
                  </option>

                  <option value="experienced">
                    More than 3 years
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              STEP 05 — LANGUAGE
              ================================================= */}

          <div className="form-section">

            <div className="section-number">
              05
            </div>

            <div className="form-content">

              <div className="form-title-row">

                <label>
                  Preferred language
                </label>

                <span className="optional-label">
                  Optional
                </span>

              </div>

              <p>
                Choose the language you are most comfortable with.
              </p>

              <div className="input-wrapper">

                <span className="input-icon">
                  🌐
                </span>

                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >

                  <option value="English">
                    🇬🇧 English
                  </option>

                  <option value="Tamil">
                    🇮🇳 தமிழ்
                  </option>

                  <option value="Hindi">
                    🇮🇳 हिन्दी
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              SUBMIT
              ================================================= */}

          <div className="assessment-submit">

            <div className="submit-info">

              <span>
                ✦
              </span>

              <div>

                <strong>
                  AI-powered analysis
                </strong>

                <p>
                  Your answers will be used to generate
                  personalized business insights.
                </p>

              </div>

            </div>

            <button
              type="submit"
              className="analyze-btn"
            >
              Analyze My Business →
            </button>

          </div>

        </form>

      </main>

    </div>
  )
}

export default Assessment