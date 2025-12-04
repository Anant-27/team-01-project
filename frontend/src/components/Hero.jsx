import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">AutoCad • Python backend</div>
        <h1 className="hero-title">Turn spreadsheets into dashboards automatically</h1>
        <p className="hero-subtitle">
          Upload an Excel or CSV file and AutoCad will detect your columns, suggest charts
          and let you explore data interactively — powered by a FastAPI Python backend.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            Get started — upload a file
          </button>
          <button className="btn-secondary" onClick={() => navigate('/about')}>
            Meet the team
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero