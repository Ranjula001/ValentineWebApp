import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function FloatingHearts() {
  // Load heart texture
  const heartTexture = useTexture('/textures/heart.png');
  
  // Configure texture parameters
  heartTexture.wrapS = heartTexture.wrapT = THREE.RepeatWrapping;
  heartTexture.encoding = THREE.sRGBEncoding;
  heartTexture.anisotropy = 16;

  const hearts = useMemo(
    () =>
      Array(50).fill().map(() => ({
        position: [Math.random() * 20 - 10, Math.random() * 10 - 5, Math.random() * 10 - 5],
        speed: Math.random() * 0.05 + 0.02,
        scale: 0.5 + Math.random() * 0.3,
      })),
    []
  );

  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((heart, i) => {
        heart.position.y += hearts[i].speed;
        if (heart.position.y > 10) heart.position.y = -10;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {hearts.map((heart, i) => (
        <mesh
          key={i}
          position={heart.position}
          scale={[heart.scale, heart.scale, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial
            map={heartTexture}
            transparent
            alphaTest={0.5}
            color="#ffffff"
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}