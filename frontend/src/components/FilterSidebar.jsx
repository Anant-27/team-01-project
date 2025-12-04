import React, { useMemo } from 'react'

function FilterSidebar({ filterableFields, data, filters, onChange }) {
  const uniqueValues = useMemo(() => {
    const result = {}
    filterableFields.forEach((f) => {
      if (f.type === 'category') {
        const vals = Array.from(
          new Set(data.map((row) => row[f.name]).filter((v) => v != null))
        )
        result[f.name] = vals.slice(0, 50)
      }
    })
    return result
  }, [filterableFields, data])

  const handleCategoryChange = (field, value) => {
    const current = filters[field] || []
    let next
    if (current.includes(value)) {
      next = current.filter((v) => v !== value)
    } else {
      next = [...current, value]
    }
    onChange({ ...filters, [field]: next })
  }

  const handleDateChange = (field, bound, value) => {
    const prev = filters[field] || {}
    const next = { ...prev, [bound]: value }
    onChange({ ...filters, [field]: next })
  }

  return (
    <div style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
      <div
        style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#9ca3af',
          marginBottom: '0.4rem'
        }}
      >
        Filters
      </div>
      {!filterableFields.length && (
        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          No filterable fields yet. Upload a file to begin.
        </div>
      )}
      {filterableFields.map((f) => (
        <div key={f.name} style={{ marginBottom: '0.75rem' }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              marginBottom: '0.25rem'
            }}
          >
            {f.name}
          </div>
          {f.type === 'category' && (
            <div
              style={{
                maxHeight: 120,
                overflowY: 'auto',
                borderRadius: 10,
                border: '1px solid rgba(30,64,175,0.7)',
                background: 'rgba(15,23,42,0.8)',
                padding: 6
              }}
            >
              {(uniqueValues[f.name] || []).map((val) => (
                <label
                  key={val}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.75rem',
                    marginBottom: 2
                  }}
                >
                  <input
                    type="checkbox"
                    checked={(filters[f.name] || []).includes(val)}
                    onChange={() => handleCategoryChange(f.name, val)}
                  />
                  <span>{String(val)}</span>
                </label>
              ))}
              {!uniqueValues[f.name]?.length && (
                <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>
                  No values
                </div>
              )}
            </div>
          )}
          {f.type === 'date' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <input
                type="date"
                value={(filters[f.name] && filters[f.name].from) || ''}
                onChange={(e) => handleDateChange(f.name, 'from', e.target.value)}
                style={{
                  borderRadius: 6,
                  border: '1px solid rgba(30,64,175,0.7)',
                  background: 'rgba(15,23,42,0.8)',
                  color: '#e5e7eb',
                  padding: '2px 6px',
                  fontSize: '0.75rem'
                }}
              />
              <input
                type="date"
                value={(filters[f.name] && filters[f.name].to) || ''}
                onChange={(e) => handleDateChange(f.name, 'to', e.target.value)}
                style={{
                  borderRadius: 6,
                  border: '1px solid rgba(30,64,175,0.7)',
                  background: 'rgba(15,23,42,0.8)',
                  color: '#e5e7eb',
                  padding: '2px 6px',
                  fontSize: '0.75rem'
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FilterSidebar