import React from "react"
import { Link } from "react-router-dom"

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/">🏠</Link>
      <Link to="/search">🔍</Link>
      <Link to="/profile">👤</Link>
    </nav>
  )
}

export default BottomNav
