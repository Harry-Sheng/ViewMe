import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import VideoPlayer from "../components/VideoPlayer"

function FeedPage() {
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [codeClicked, setCodeClicked] = useState({})
  const [saveClicked, setSaveClicked] = useState({})
  const [videos] = useState([
    {
      id: 1,
      src: "/videos/1581402133124.mp4",
      title: "Cool Video",
      description: "Amazing content from the feed",
      author: "Creator_1"
    },
    {
      id: 2,
      src: "/videos/ssstik.io_@rippleranks_1752898321072.mp4",
      title: "Ripple Ranks",
      description: "Check out this awesome content",
      author: "rippleranks"
    }
  ])

  const containerRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(false)

  const scrollToVideo = (index) => {
    if (containerRef.current) {
      const container = containerRef.current
      const videoHeight = container.clientHeight
      container.scrollTo({
        top: index * videoHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (!containerRef.current || isScrolling) return

    const container = containerRef.current
    const scrollTop = container.scrollTop
    const videoHeight = container.clientHeight
    const newIndex = Math.round(scrollTop / videoHeight)

    if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
      setCurrentVideoIndex(newIndex)
    }
  }

  const goToNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      const newIndex = currentVideoIndex + 1
      setCurrentVideoIndex(newIndex)
      setIsScrolling(true)
      scrollToVideo(newIndex)
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  const goToPrevVideo = () => {
    if (currentVideoIndex > 0) {
      const newIndex = currentVideoIndex - 1
      setCurrentVideoIndex(newIndex)
      setIsScrolling(true)
      scrollToVideo(newIndex)
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  const currentVideo = videos[currentVideoIndex]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        goToPrevVideo()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        goToNextVideo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentVideoIndex, videos.length])

  const handleCodeClick = () => {
    setCodeClicked(prev => ({
      ...prev,
      [currentVideo.id]: !prev[currentVideo.id]
    }))
  }

  const handleSaveClick = () => {
    setSaveClicked(prev => ({
      ...prev,
      [currentVideo.id]: !prev[currentVideo.id]
    }))
  }

  return (
    <div className="h-[600px] bg-black relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 text-center pt-6 pb-4 bg-gradient-to-b from-black to-transparent">
        <h1 className="text-3xl font-bold text-white">ViewMe</h1>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-full snap-start relative">
            <VideoPlayer
              videoSrc={video.src}
              isActive={index === currentVideoIndex}
              onVideoEnd={goToNextVideo}
            />
          </div>
        ))}
      </div>

      {/* Right side controls */}
      <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center space-y-6">
        {/* Profile circle */}
        <button
          onClick={() => navigate('/profile')}
          className="w-12 h-12 bg-gray-700 rounded-full border-2 border-white cursor-pointer hover:bg-gray-600 transition-colors"
        ></button>


        {/* Code button */}
        <button
          onClick={handleCodeClick}
          className="w-8 h-8 flex items-center justify-center"
        >
          <img
            src="/images/code.png"
            alt="Code"
            className={`w-6 h-6 transition-all ${codeClicked[currentVideo.id] ? 'filter brightness-0 invert' : ''
              }`}
          />
        </button>

        {/* Save button */}
        <button
          onClick={handleSaveClick}
          className="w-8 h-8 flex items-center justify-center"
        >
          <img
            src="/images/save.png"
            alt="Save"
            className={`w-6 h-6 transition-all ${saveClicked[currentVideo.id] ? 'filter brightness-0 invert' : ''
              }`}
          />
        </button>
      </div>

      {/* Navigation arrows */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
        <button
          onClick={goToPrevVideo}
          className="text-2xl text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
          disabled={currentVideoIndex === 0}
        >
          ↑
        </button>
        <button
          onClick={goToNextVideo}
          className="text-2xl text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
          disabled={currentVideoIndex === videos.length - 1}
        >
          ↓
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-20 left-4 right-20 z-20 text-black">
        <h2 className="text-xl font-bold mb-1">@{currentVideo.author}</h2>
        <p className="text-lg font-semibold mb-1">{currentVideo.title}</p>
        <p className="text-sm opacity-90">{currentVideo.description}</p>
      </div>

      {/* Video indicators */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all ${index === currentVideoIndex ? 'bg-white' : 'bg-white bg-opacity-30'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default FeedPage
