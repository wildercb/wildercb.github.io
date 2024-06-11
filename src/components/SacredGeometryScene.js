import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FlowerOfLife() {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.005));
  return (
    <group ref={ref}>
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 20) * Math.PI * 2) * (3 + i * 0.2),
            Math.sin((i / 20) * Math.PI * 2) * (3 + i * 0.2),
            0
          ]}
        >
          <circleGeometry args={[1.5 + i * 0.1, 64]} />
          <meshStandardMaterial color={new THREE.Color(`hsl(${(i * 15) % 360}, 100%, 50%)`)} />
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

function EvolvingShape() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <dodecahedronGeometry args={[3, 0]} />
      <meshStandardMaterial color="green" wireframe />
    </mesh>
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
      <EvolvingShape />
      <OrbitControls />
    </Canvas>
  );
}

export default SacredGeometryScene;
