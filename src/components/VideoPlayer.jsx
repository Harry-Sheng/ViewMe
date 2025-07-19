import React, { useRef, useEffect, useState } from 'react'

function VideoPlayer({ videoSrc, isActive, onVideoEnd }) {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedData = () => {
            console.log('Video loaded:', videoSrc)
        }

        const handleError = (e) => {
            console.error('Video error:', e, videoSrc)
        }

        video.addEventListener('loadeddata', handleLoadedData)
        video.addEventListener('error', handleError)

        if (isActive) {
            video.play().then(() => {
                setIsPlaying(true)
            }).catch((error) => {
                console.error('Play failed:', error)
            })
        } else {
            video.pause()
            setIsPlaying(false)
        }

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData)
            video.removeEventListener('error', handleError)
        }
    }, [isActive, videoSrc])

    const togglePlayPause = () => {
        const video = videoRef.current
        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }
    }

    const toggleMute = () => {
        const video = videoRef.current
        video.muted = !video.muted
        setIsMuted(video.muted)
    }

    const handleVideoEnd = () => {
        setIsPlaying(false)
        if (onVideoEnd) {
            onVideoEnd()
        }
    }

    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onEnded={handleVideoEnd}
                onClick={togglePlayPause}
                preload="metadata"
                controls={false}
            />

            {/* Play/Pause overlay */}
            {!isPlaying && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
                    onClick={togglePlayPause}
                >
                    <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[16px] border-l-black border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                </div>
            )}

            {/* Mute/Unmute button */}
            <button
                onClick={toggleMute}
                className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white"
            >
                {isMuted ? '🔇' : '🔊'}
            </button>

            {/* Video progress indicator */}
            <div className="absolute bottom-2 left-2 right-2 h-1 bg-white bg-opacity-30 rounded">
                <div className="h-full bg-white rounded transition-all duration-100" style={{ width: '0%' }}></div>
            </div>
        </div>
    )
}

export default VideoPlayer
