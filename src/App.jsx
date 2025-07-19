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
      <div className="relative w-[375px] h-[667px] bg-blue-100 rounded-xl shadow-2xl border-2 border-blue-400">
        {/* Routes with scrollable content */}
        <div className="absolute top-0 left-0 right-0 bottom-12 overflow-y-auto scrollbar-hidden rounded-xl overflow-hidden">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>

        {/* Fixed Bottom Navigation */}
        <div className="absolute bottom-0 w-full">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}


export default App
