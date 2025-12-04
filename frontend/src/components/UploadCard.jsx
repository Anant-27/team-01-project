import React, { useRef } from 'react'

function UploadCard({ onFileSelected }) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) onFileSelected(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onFileSelected(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div
      className="upload-card"
      onClick={() => inputRef.current && inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 4 }}>
        Drag &amp; drop your file
      </div>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: 6 }}>
        or click to browse from your computer
      </div>
      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
        Supports CSV and Excel (.xlsx). We&apos;ll detect columns and suggest charts.
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </div>
  )
}

export default UploadCard