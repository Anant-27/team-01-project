import React, { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const COLORS = ['#6366f1', '#06b6d4', '#22c55e', '#f97316', '#eab308', '#ec4899']

function aggregateData(data, chart) {
  if (!data || !data.length) return []

  if (chart.type === 'bar') {
    const groups = {}
    data.forEach((row) => {
      const key = row[chart.xField]
      const val = Number(row[chart.yField]) || 0
      if (!groups[key]) groups[key] = 0
      groups[key] += val
    })
    return Object.entries(groups).map(([k, v]) => ({
      [chart.xField]: k,
      [chart.yField]: v
    }))
  }

  if (chart.type === 'line') {
    const groups = {}
    data.forEach((row) => {
      const key = row[chart.xField]
      const val = Number(row[chart.yField]) || 0
      if (!groups[key]) groups[key] = 0
      groups[key] += val
    })
    const arr = Object.entries(groups).map(([k, v]) => ({
      [chart.xField]: k,
      [chart.yField]: v
    }))
    arr.sort((a, b) => new Date(a[chart.xField]) - new Date(b[chart.xField]))
    return arr
  }

  if (chart.type === 'pie') {
    const groups = {}
    data.forEach((row) => {
      const key = row[chart.labelField]
      const val = Number(row[chart.valueField]) || 0
      if (!groups[key]) groups[key] = 0
      groups[key] += val
    })
    return Object.entries(groups).map(([k, v]) => ({
      [chart.labelField]: k,
      [chart.valueField]: v
    }))
  }

  return data
}

function ChartWrapper({ chart, data }) {
  const chartData = useMemo(() => aggregateData(data, chart), [data, chart])

  if (!chartData.length) {
    return (
      <p style={{ fontSize: '0.75rem', color: '#9ca3af', padding: '0.25rem 0.4rem' }}>
        No data after filters.
      </p>
    )
  }

  if (chart.type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <XAxis dataKey={chart.xField} stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Legend />
          <Bar dataKey={chart.yField} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (chart.type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>
          <XAxis dataKey={chart.xField} stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={chart.yField} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (chart.type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey={chart.valueField}
            nameKey={chart.labelField}
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <p style={{ fontSize: '0.75rem', color: '#9ca3af', padding: '0.25rem 0.4rem' }}>
      Unsupported chart type: {chart.type}
    </p>
  )
}

export default ChartWrapper