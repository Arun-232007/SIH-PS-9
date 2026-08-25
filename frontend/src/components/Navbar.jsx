function Navbar({ setPage }) {
  return (
    <nav className="navbar">

      <div
        className="brand"
        onClick={() => setPage('home')}
      >
        <div className="brand-icon">
          🌾
        </div>

        <div>
          <strong>GRAM-BIZ</strong>
          <span>AI</span>
        </div>
      </div>

      <div className="nav-links">

        <a href="#features">
          Features
        </a>

        <a href="#how">
          How It Works
        </a>

        <a href="#about">
          About
        </a>

        <button
          onClick={() => setPage('assessment')}
          className="nav-button"
        >
          Get Started →
        </button>

      </div>

    </nav>
  )
}

export default Navbar