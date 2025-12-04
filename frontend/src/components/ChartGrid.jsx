import React from 'react'
import ChartWrapper from './ChartWrapper'

function ChartGrid({ charts, data }) {
  if (!charts || !charts.length) {
    return (
      <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
        No charts suggested yet. Try uploading a file.
      </p>
    )
  }

  return (
    <div className="charts-grid">
      {charts.map((chart) => (
        <div key={chart.id} className="card">
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: 4
            }}
          >
            {chart.title}
          </div>
          <ChartWrapper chart={chart} data={data} />
        </div>
      ))}
    </div>
  )
}

export default ChartGrid