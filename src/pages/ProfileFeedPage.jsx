import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import VideoPlayer from "../components/VideoPlayer"

function ProfileFeedPage() {
    const navigate = useNavigate()
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [codeClicked, setCodeClicked] = useState({})
    const [saveClicked, setSaveClicked] = useState({})
    const [showSaveMessage, setShowSaveMessage] = useState(false)
    const [videos] = useState([
        {
            id: 4,
            src: "/videos/magic_nav.mp4",
            title: "Magic Navigation Bar",
            description: "Animated navigation bar with smooth transitions",
            author: "johnsmith",
            profileImage: "https://i.pravatar.cc/150?img=12",
            githubUrl: "https://github.com/johnsmith/magic-nav-bar"
        },
        {
            id: 5,
            src: "/videos/social_button.mp4",
            title: "Advanced Social Buttons",
            description: "Creative social media button animations",
            author: "johnsmith",
            profileImage: "https://i.pravatar.cc/150?img=12",
            githubUrl: "https://github.com/johnsmith/social-buttons"
        },
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

        // Open GitHub repository in new tab - specific to current video
        window.open(currentVideo.githubUrl, '_blank')
    }

    const handleSaveClick = () => {
        setSaveClicked(prev => ({
            ...prev,
            [currentVideo.id]: !prev[currentVideo.id]
        }))

        // Show save message when saving (not unsaving)
        if (!saveClicked[currentVideo.id]) {
            setShowSaveMessage(true)
            setTimeout(() => setShowSaveMessage(false), 1000) // Hide after 2 seconds
        }
    }

    return (
        <div className="h-full bg-black relative overflow-hidden">
            {/* Header with back button */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between pt-6 pb-4 px-4 bg-gradient-to-b from-black/40 to-transparent">
                <button
                    onClick={() => navigate('/profile')}
                    className="text-white text-2xl hover:text-gray-300"
                >
                    ←
                </button>
                <h1 className="text-2xl font-bold">
                    <span style={{ color: '#2A324B' }}>@johnsmith</span>
                </h1>
                <div className="w-8"></div> {/* Spacer for centering */}
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
            <div className="absolute right-4 bottom-6 z-20 flex flex-col items-center space-y-6">
                {/* Profile circle */}
                <button
                    onClick={() => navigate('/profile')}
                    className="w-12 h-12 bg-gray-700 rounded-full border-3 border-[#2A324B] cursor-pointer hover:bg-gray-600 transition-colors overflow-hidden"
                >
                    <img
                        src={currentVideo.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                </button>

                {/* Code button */}
                <button
                    onClick={handleCodeClick}
                    className="w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                    <img
                        src="/code_blue.png"
                        alt="Code"
                        className="w-8 h-8"
                    />
                </button>

                {/* Save button */}
                <button
                    onClick={handleSaveClick}
                    className="w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                    <img
                        src="/save_blue.png"
                        alt="Save"
                        className={`w-8 h-8 transition-all ${saveClicked[currentVideo.id] ? 'filter brightness-0 invert' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Navigation arrows */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
                <button
                    onClick={goToPrevVideo}
                    className="text-2xl text-white bg-[#2A324B] bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-300"
                    disabled={currentVideoIndex === 0}
                >
                    ↑
                </button>
                <button
                    onClick={goToNextVideo}
                    className="text-2xl text-white bg-[#2A324B] bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-300"
                    disabled={currentVideoIndex === videos.length - 1}
                >
                    ↓
                </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-6 left-4 right-20 z-20 text-white">
                <h2 className="text-xl font-bold mb-1">@{currentVideo.author}</h2>
                <p className="text-lg font-semibold mb-1">{currentVideo.title}</p>
                <p className="text-sm opacity-90">{currentVideo.description}</p>
            </div>

            {/* Save message */}
            {showSaveMessage && (
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
                    Video saved
                </div>
            )}
        </div>
    )
}

export default ProfileFeedPage
