import React from "react"
import { Routes, Route } from "react-router-dom"
import FeedPage from "./pages/FeedPage"
import ProfilePage from "./pages/ProfilePage"
import ProfileFeedPage from "./pages/ProfileFeedPage"
import UserPage from "./pages/UserPage"
import UploadPage from "./pages/UploadPage"
import BottomNav from "./components/BottomNav"
import SearchPage from "./pages/SearchPage"
import "./styles/App.css"

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-[375px] h-[667px] bg-blue-100 rounded-t-xl shadow-2xl">
        {/* Routes with scrollable content */}
        <div className="absolute top-0 left-0 right-0 bottom-12 overflow-y-auto scrollbar-hidden rounded-t-xl overflow-hidden">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile-feed" element={<ProfileFeedPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </div>

        {/* Fixed Bottom Navigation */}
        <div className="absolute bottom-0 w-full">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default App;
