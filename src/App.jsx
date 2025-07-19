import React from "react"
import { Routes, Route } from "react-router-dom"
import FeedPage from "./pages/FeedPage"
import ProfilePage from "./pages/ProfilePage"
import BottomNav from "./components/BottomNav"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <BottomNav />s
    </>
  )
}

export default App
