import React, { useState } from "react"

const dummyResults = [
  {
    id: 1,
    title: "Dance Compilation",
    username: "@dancequeen",
    thumbnail: "https://source.unsplash.com/random/300x400?dance",
  },
  {
    id: 2,
    title: "Food Vlog",
    username: "@foodie",
    thumbnail: "https://source.unsplash.com/random/300x400?food",
  },
  {
    id: 3,
    title: "Skate Tricks",
    username: "@skaterboi",
    thumbnail: "https://source.unsplash.com/random/300x400?skate",
  },
  {
    id: 4,
    title: "Tech Tips",
    username: "@coderlife",
    thumbnail: "https://source.unsplash.com/random/300x400?tech",
  },
]

function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(dummyResults)

  const handleSearch = (e) => {
    e.preventDefault()
    const filtered = dummyResults.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }

  return (
    <div className="bg-black min-h-screen text-white px-4 py-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search videos..."
          className="w-full px-4 py-2 rounded-full bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {results.map((item) => (
            <div
              key={item.id}
              className="aspect-[9/16] overflow-hidden rounded-lg"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No results found.</p>
      )}
    </div>
  )
}

export default SearchPage
