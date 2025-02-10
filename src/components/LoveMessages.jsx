import { useTransition, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'

const messages = [
  { text: "Ardithya, do you Know ..", duration: 4000 },{ text: ".. I made this web application and the song for you ?", duration: 5000 },
  { text: "From the moment I saw you...", duration: 6000 },
  { text: "My heart knew something special", duration: 7000 },
  { text: "Your smile lights up my world", duration: 8000 },
  { text: "I will cherish every moment with you", duration: 9000 },
  { text: "I love you more than you can imagine and I wanna be yours !", duration: 10000 },
  { text: "I wanna make you mine, you are the only one !", duration: 11000 },
  { text: "Will you be my valentine and let me love you forever ?", duration: 12000 }
]

export default function LoveMessages({ isPlaying }) {
  const [index, setIndex] = useState(0)
  
  const transitions = useTransition(index, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-50px)' },
    config: { tension: 300, friction: 20 }
  })

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setIndex(prev => (prev + 1) % messages.length)
      }, messages[index]?.duration || 5000)
      
      return () => clearInterval(timer)
    }
  }, [isPlaying, index])

  return (
    <div className="fixed top-44 left-0 w-full h-full pointer-events-none flex flex-col items-center justify-center">
      {transitions((style, i) => (
        <animated.div
          style={style}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >
          {messages[i].text}
        </animated.div>
      ))}
    </div>
  )
}