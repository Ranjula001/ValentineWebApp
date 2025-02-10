import { Canvas } from "@react-three/fiber";
import { Heart } from "./components/Heart";
import {
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { Suspense, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import PropTypes from "prop-types";
import MusicPlayer from './components/MusicPlayer';
import LoveMessages from './components/LoveMessages';
import FloatingHearts from "./components/FloatingHearts";
import { Preload } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)}% loaded</Html>;
}

function Overlay({ accepted, setAccepted }) {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  return (
    <animated.div
      style={styles}
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-8 pointer-events-none"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
        {!accepted ? "Hi Ardithya !! " : "I made this for you ❤️ !"}
      </h1>

      {!accepted && (
        <button
          onClick={() => setAccepted(true)}
          className="pointer-events-auto bg-white hover:bg-red-600 text-red-500 hover:text-white px-8 py-4 rounded-full text-2xl transition-all transform hover:scale-105"
        >
          TOUCH ME ❤️ !
        </button>
      )}
    </animated.div>
  );
}

Overlay.propTypes = {
  accepted: PropTypes.bool.isRequired,
  setAccepted: PropTypes.func.isRequired,
};

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  return (
    <div className="w-screen h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <Suspense fallback={<Loader />}>
        <FloatingHearts/>
          <color attach="background" args={['#1a1a1a']} />
          
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.8} color="#ffffff" />
          <pointLight 
            position={[5, 5, 3]} 
            intensity={2} 
            color="#ff4444"
            distance={20}
            decay={1}
          />
          <pointLight 
            position={[-5, 5, 3]} 
            intensity={2} 
            color="#4444ff"
            distance={20}
            decay={1}
          />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            color="#ffffff"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          <Heart position={[0, 0, 0]} />
          
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={3}
            maxDistance={15}
            autoRotate
            autoRotateSpeed={0.5}
            target={[0, 0, 0]}
          />
        </Suspense>
        <Preload all />
      </Canvas>
      
      <Overlay accepted={accepted} setAccepted={setAccepted} />
      
      {accepted && (
        <>
          <MusicPlayer onPlayStateChange={setIsMusicPlaying} />
          <LoveMessages isPlaying={isMusicPlaying} />
        </>
      )}
    </div>
  );
}