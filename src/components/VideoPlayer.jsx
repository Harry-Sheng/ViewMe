import React, { useRef, useEffect, useState } from 'react'

function VideoPlayer({ videoSrc, isActive, onVideoEnd }) {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(0.3)

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

        // Set initial volume
        video.volume = volume

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

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        const video = videoRef.current
        video.volume = newVolume
        setVolume(newVolume)

        // Automatically unmute if volume is increased from 0
        if (newVolume > 0 && isMuted) {
            video.muted = false
            setIsMuted(false)
        }
        // Automatically mute if volume is set to 0
        if (newVolume === 0 && !isMuted) {
            video.muted = true
            setIsMuted(true)
        }
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

            {/* Volume Controls */}
            <div className="absolute top-20 right-4 flex flex-col items-center opacity-20 hover:opacity-100 transition-opacity duration-300">
                {/* Volume Slider */}
                <div className="w-8 h-20 flex items-center justify-center">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-vertical"
                        style={{
                            transform: 'rotate(-90deg)',
                            transformOrigin: 'center'
                        }}
                    />
                </div>

                {/* Volume Icon */}
                <img
                    src="/volume.png"
                    alt="Volume"
                    className="w-5 h-5 mt-2"
                />
            </div>
        </div>
    )
}

export default VideoPlayer
