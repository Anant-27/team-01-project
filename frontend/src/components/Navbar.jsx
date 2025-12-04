import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'nav-link ' + (isActive ? 'nav-link-active' : '')
      }
    >
      {children}
    </NavLink>
  )
}

function Navbar() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid rgba(30,64,175,0.6)',
        background:
          'linear-gradient(to right, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 700,
            fontSize: '1rem'
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 12,
              background:
                'conic-gradient(from 180deg, #6366f1, #06b6d4, #22c55e)'
            }}
          />
          <span>AutoCad</span>
        </Link>
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/dashboard">Upload</NavItem>
          <NavItem to="/about">About</NavItem>
        </nav>
        <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Logout</div>
      </div>
    </header>
  )
}

export default Navbar