import { useState, useEffect, useRef } from 'react'

export default function MusicPlayer({ onPlayStateChange }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)

  // Add play state callback
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying)
    }
  }, [isPlaying, onPlayStateChange])

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgress = (e) => {
    const duration = e.target.duration
    const currentTime = e.target.currentTime
    setProgress((currentTime / duration) * 100)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
      <audio 
        ref={audioRef}
        src="/music/foryou.mp3" 
        autoPlay
        onTimeUpdate={handleProgress}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="text-white hover:text-red-500 transition-colors text-3xl"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <div className="flex-1 bg-gray-700 h-1 rounded-full">
          <div 
            className="bg-red-500 h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-24 accent-red-500"
          aria-label="Volume control"
        />
      </div>
    </div>
  )
}