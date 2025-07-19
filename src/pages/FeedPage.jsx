import React from "react"

function FeedPage() {
  return (
    <div className="h-[600px] bg-gray-300 relative overflow-hidden">
      {/* Header */}
      <div className="text-center pt-6 pb-4">
        <h1 className="text-3xl font-bold text-black">ViewMe</h1>
      </div>

      {/* Main content area - large gray space */}
      <div className="bg-gray-300 h-[350px]">
        {/* This creates the large gray area shown in your screenshot */}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-4 left-0 right-0 px-6">
        {/* Profile circle */}
        <div className="flex justify-end mb-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-8 mb-4">
          <button className="text-2xl text-gray-600">‹</button>
          <button className="text-2xl text-gray-600">›</button>
        </div>

        {/* Save/bookmark icon */}
        <div className="flex justify-end mb-3">
          <div className="w-6 h-6 border-2 border-gray-600 rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 border border-gray-600 rounded-sm"></div>
          </div>
        </div>

        {/* Name and description */}
        <div className="text-left">
          <h2 className="text-xl font-bold text-black mb-1">Name</h2>
          <p className="text-black text-sm">Brief Description ...........................</p>
          <p className="text-black text-sm">................................................</p>
        </div>
      </div>
    </div>
  )
}

export default FeedPage
