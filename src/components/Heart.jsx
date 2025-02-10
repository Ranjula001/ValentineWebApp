import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export function Heart(props) {
  const { scene } = useGLTF('/models/heart.glb');
  const heartRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (heartRef.current) {
      heartRef.current.rotation.y = time * 0.2;
      heartRef.current.position.y = Math.sin(time * 2) * 0.1; // More subtle bounce
    }
  });

  return (
    <group ref={heartRef} {...props} scale={0.5} dispose={null}>
      <primitive 
        object={scene}
        rotation={[0, Math.PI / 2, 0]}
        children-0-castShadow
      />
    </group>
  );
}

useGLTF.preload('/models/heart.glb')