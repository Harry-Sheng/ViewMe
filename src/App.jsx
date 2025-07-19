import React from "react"
import { Routes, Route } from "react-router-dom"
import FeedPage from "./pages/FeedPage"
import ProfilePage from "./pages/ProfilePage"
import BottomNav from "./components/BottomNav"
import SearchPage from "./pages/SearchPage"
import "./styles/App.css"

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-[375px] h-[667px] bg-blue-100 rounded-xl shadow-2xl overflow-y-auto border-2 border-blue-400">
        {/* Routes */}
        <div className="pb-16">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}

export default App
