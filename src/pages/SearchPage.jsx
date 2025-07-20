import React, { useState, useEffect, useRef } from "react";

const dummyResults = [
  {
    id: 1,
    title: "Calculator",
    username: "@dancequeen",
    thumbnail: "/images/calculator.png",
  },
  {
    id: 2,
    title: "To Do List",
    username: "@foodie",
    thumbnail: "/images/todo-list.png",
  },
  {
    id: 3,
    title: "Hangman",
    username: "@skaterboi",
    thumbnail: "/images/hangman.png",
  },
  {
    id: 4,
    title: "Coding Editor",
    username: "@coderlife",
    thumbnail: "/images/coding-editor.png",
  },
  {
    id: 5,
    title: "Maze",
    username: "@coder2",
    thumbnail: "/images/maze.png",
  },
  {
    id: 6,
    title: "Weather App",
    username: "@alekhine",
    thumbnail: "/images/weather.png",
  },
  {
    id: 7,
    title: "Calendar",
    username: "@alekhine",
    thumbnail: "/images/calendar.png",
  },
  {
    id: 8,
    title: "Age and Gender Detection",
    username: "@alekhine",
    thumbnail: "/images/detection.png",
  },
  {
    id: 9,
    title: "Supply Chain",
    username: "@alekhine",
    thumbnail: "/images/supply-chain.png",
  },
  {
    id: 10,
    title: "Code",
    username: "@alekhine",
    thumbnail: "/images/code.png",
  },
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(dummyResults);
  const debounceRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new debounce timeout
    debounceRef.current = setTimeout(() => {
      const filtered = dummyResults.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300); // 300ms debounce delay

    // Cleanup on unmount or query change
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return (
    <div className="bg-[#2A324B] text-white px-4 pt-6 pb-6 overflow-auto">
      {/* Search Bar */}
      <form onSubmit={(e) => e.preventDefault()} className="mb-6">
        <input
          type="text"
          placeholder="Search videos..."
          className="w-full px-4 py-2 rounded-full bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c7ccdb]"
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
              className="aspect-[9/16] overflow-hidden rounded-lg border border-gray-600"
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
  );
}

export default SearchPage;
