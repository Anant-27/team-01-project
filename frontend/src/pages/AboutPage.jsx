import React from 'react'

const team = [
  'Kanishka',
  'Divya Raj Varshney',
  'Rinki Jha',
  'Anant Seth',
  'Aman Khushwah'
]

function AboutPage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2.5rem 1rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
        About AutoCad
      </h1>
      <p
        style={{
          fontSize: '0.9rem',
          color: '#cbd5f5',
          maxWidth: 520,
          marginBottom: '1.5rem'
        }}
      >
        AutoCad is a project built to democratize data analysis. Upload a spreadsheet and
        instantly explore automatically generated charts and dashboards – no BI tools or
        complex formulas required. This version uses a Python FastAPI backend.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,2fr) minmax(0,1.5fr)',
          gap: '2rem'
        }}
      >
        <div
          style={{
            borderRadius: 24,
            border: '1px solid rgba(30,64,175,0.6)',
            background:
              'radial-gradient(circle at top left, rgba(56,189,248,0.1), rgba(15,23,42,0.9))',
            padding: '1.75rem'
          }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem' }}>
            Our mission
          </h2>
          <p
            style={{
              fontSize: '0.86rem',
              color: '#e5e7eb',
              marginBottom: '1.1rem'
            }}
          >
            We want to make working with data feel less like wrestling spreadsheets and
            more like asking questions. AutoCad automatically detects dates, numbers and
            categories in your dataset, picks visualization types, and lets you filter
            everything interactively.
          </p>
          <h3
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#9ca3af',
              marginBottom: '0.4rem'
            }}
          >
            Team
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem' }}>
            {team.map((name) => (
              <li key={name} style={{ marginBottom: 2 }}>
                • {name}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            borderRadius: 24,
            border: '1px solid rgba(30,64,175,0.6)',
            background: 'rgba(15,23,42,0.85)',
            padding: '1.75rem'
          }}
        >
          <h3
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '0.5rem'
            }}
          >
            Logo & branding
          </h3>
          <p
            style={{
              fontSize: '0.8rem',
              color: '#cbd5f5',
              marginBottom: '1rem'
            }}
          >
            This space is reserved for the official AutoCad logo and brand mark that the
            team will design. Use this section to showcase your brand identity in the final
            submission.
          </p>

          <div
            style={{
              borderRadius: 16,
              border: '1px dashed rgba(148,163,184,0.7)',
              padding: '1rem',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: '#9ca3af'
            }}
          >
            Logo placeholder – drop your final logo here for the presentation.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage