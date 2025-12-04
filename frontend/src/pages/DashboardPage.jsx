import React, { useState, useMemo } from 'react'
import axios from 'axios'
import UploadCard from '../components/UploadCard'
import FilterSidebar from '../components/FilterSidebar'
import ChartGrid from '../components/ChartGrid'

const API_BASE = 'http://localhost:8000'

function DashboardPage() {
  const [schema, setSchema] = useState(null)
  const [charts, setCharts] = useState([])
  const [filterableFields, setFilterableFields] = useState([])
  const [rawData, setRawData] = useState([])
  const [filters, setFilters] = useState({})

  const handleFileUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await axios.post(API_BASE + '/api/data/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    setSchema(res.data.columns)
    setCharts(res.data.suggested_charts)
    setFilterableFields(res.data.filterable_fields)
    setRawData(res.data.data)
    setFilters({})
  }

  const filteredData = useMemo(() => {
    if (!rawData.length) return []
    let data = [...rawData]

    Object.entries(filters).forEach(([field, value]) => {
      if (!value) return
      if (Array.isArray(value) && value.length > 0) {
        data = data.filter((row) => value.includes(row[field]))
      } else if (value.from || value.to) {
        const from = value.from ? new Date(value.from) : null
        const to = value.to ? new Date(value.to) : null
        data = data.filter((row) => {
          const dt = new Date(row[field])
          if (from && dt < from) return false
          if (to && dt > to) return false
          return true
        })
      }
    })

    return data
  }, [rawData, filters])

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div
          style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#cbd5f5',
            marginBottom: '0.6rem'
          }}
        >
          Upload & filters
        </div>
        <UploadCard onFileSelected={handleFileUpload} />
        {schema && (
          <FilterSidebar
            filterableFields={filterableFields}
            data={rawData}
            filters={filters}
            onChange={setFilters}
          />
        )}
        <div
          style={{
            marginTop: 'auto',
            fontSize: '0.7rem',
            color: '#6b7280',
            marginBottom: '0.3rem'
          }}
        >
          AutoCad • Python auto dashboard
        </div>
      </aside>
      <main className="dashboard-main">
        {!schema && (
          <p style={{ fontSize: '0.9rem', color: '#cbd5f5' }}>
            Start by uploading an Excel or CSV file using the panel on the left. AutoCad
            will detect your columns and generate a dashboard automatically.
          </p>
        )}
        {schema && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <section className="card">
              <h2
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '0.4rem'
                }}
              >
                Detected schema
              </h2>
              <table className="schema-table">
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {schema.map((col) => (
                    <tr key={col.name}>
                      <td>{col.name}</td>
                      <td style={{ color: '#cbd5f5' }}>{col.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section>
              <ChartGrid charts={charts} data={filteredData} />
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default DashboardPage