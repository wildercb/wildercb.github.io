import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FlowerOfLife() {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.005));
  return (
    <group ref={ref}>
      {[...Array(7)].map((_, i) => (
        <mesh position={[Math.cos((i / 7) * Math.PI * 2) * 3, Math.sin((i / 7) * Math.PI * 2) * 3, 0]}>
          <circleGeometry args={[1.5, 64]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      ))}
    </group>
  );
}

function MetatronsCube() {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y -= 0.005));
  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="purple" wireframe />
      </mesh>
      <mesh>
        <tetrahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="magenta" wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="yellow" wireframe />
      </mesh>
    </group>
  );
}

function SacredGeometryScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <FlowerOfLife />
      <MetatronsCube />
      <OrbitControls />
    </Canvas>
  );
}

export default SacredGeometryScene;
