/* 
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

*/
import React, { useRef, useEffect, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, useTexture, Sky, Html } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';

// Utility functions
const random = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(random(min, max));
const randomColor = () => new THREE.Color(`hsl(${random(0, 360)}, ${random(50, 100)}%, ${random(50, 75)}%)`);

// Constants
const GALAXY_RADIUS = 1000;
const CLUSTER_COUNT = 50;
const STARS_PER_CLUSTER = 1000;
const NEBULA_COUNT = 20;
const PLANET_COUNT = 100;
const GEOMETRY_COUNT = 200;

// Custom Shaders
const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaMeteorFragmentShader = `
  uniform vec3 color;
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float d = length(uv);
    float alpha = smoothstep(0.8, 0.2, d);
    
    float t = fract(time * 0.2 + d * 3.0);
    float sparkle = smoothstep(0.8, 0.9, t) - smoothstep(0.9, 1.0, t);
    
    vec3 finalColor = mix(color, vec3(1.0), sparkle * 0.7);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Components
function GalacticCore({ position }) {
  const meshRef = useRef();
  const texture = useTexture('/path/to/core_texture.jpg'); // You'll need to provide this texture

  useFrame((state) => {
    meshRef.current.rotation.y += 0.001;
    meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[20, 64, 64]} />
      <meshStandardMaterial map={texture} emissive="#ffaa00" emissiveIntensity={2} />
    </mesh>
  );
}

function StarCluster({ position, starsCount }) {
  const points = useMemo(() => {
    const temp = new THREE.Vector3();
    return new Float32Array(starsCount * 3).map(() => {
      const radius = Math.cbrt(Math.random()) * 50;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      temp.setFromSphericalCoords(radius, phi, theta);
      return temp.toArray();
    }).flat();
  }, [starsCount]);

  const colors = useMemo(() => {
    return new Float32Array(starsCount * 3).map(() => {
      const color = new THREE.Color(randomColor());
      return color.toArray();
    }).flat();
  }, [starsCount]);

  const pointsRef = useRef();

  useFrame((state) => {
    pointsRef.current.rotation.y += 0.0001;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors />
    </points>
  );
}

function Nebula({ position, color }) {
  const shaderRef = useRef();

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={position}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={nebulaMeteorFragmentShader}
        fragmentShader={nebulaMeteorFragmentShader}
        transparent
        uniforms={{
          color: { value: new THREE.Color(color) },
          time: { value: 0 },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Planet({ position, size, color, ringColor }) {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    planetRef.current.rotation.y += 0.002;
    ringRef.current.rotation.x += 0.001;
  });

  return (
    <group position={position}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.5, size * 2, 32]} />
        <meshStandardMaterial color={ringColor} side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function GeometricStructure({ position, scale }) {
  const structureRef = useRef();
  const color = useMemo(() => randomColor(), []);

  useFrame((state) => {
    structureRef.current.rotation.x += 0.002;
    structureRef.current.rotation.y += 0.003;
    structureRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime) * 0.1);
  });

  return (
    <group ref={structureRef} position={position}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhongMaterial color={color} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshPhongMaterial color={color} wireframe />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhongMaterial color={color} wireframe />
      </mesh>
    </group>
  );
}

function PortfolioContent({ position, title, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Text
        color="white"
        fontSize={2}
        maxWidth={20}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000000"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {title}
      </Text>
      {hovered && (
        <Html distanceFactor={10}>
          <div style={{ background: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '10px', borderRadius: '5px', width: '200px' }}>
            {description}
          </div>
        </Html>
      )}
    </group>
  );
}

function CosmicWeb() {
  const points = useMemo(() => {
    const temp = new THREE.Vector3();
    return new Float32Array(1000 * 3).map(() => {
      const r = Math.random() * GALAXY_RADIUS;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      temp.setFromSphericalCoords(r, phi, theta);
      return temp.toArray();
    }).flat();
  }, []);

  const lineRef = useRef();

  useFrame((state) => {
    lineRef.current.rotation.y += 0.0001;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" opacity={0.1} transparent linewidth={1} />
    </line>
  );
}

function GalacticScene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.far = GALAXY_RADIUS * 2;
    camera.updateProjectionMatrix();
  }, [camera]);

  const clusters = useMemo(() => 
    Array(CLUSTER_COUNT).fill().map(() => ({
      position: [
        random(-GALAXY_RADIUS, GALAXY_RADIUS),
        random(-GALAXY_RADIUS / 4, GALAXY_RADIUS / 4),
        random(-GALAXY_RADIUS, GALAXY_RADIUS)
      ],
      starsCount: randomInt(STARS_PER_CLUSTER / 2, STARS_PER_CLUSTER)
    })),
  []);

  const nebulae = useMemo(() => 
    Array(NEBULA_COUNT).fill().map(() => ({
      position: [
        random(-GALAXY_RADIUS, GALAXY_RADIUS),
        random(-GALAXY_RADIUS / 4, GALAXY_RADIUS / 4),
        random(-GALAXY_RADIUS, GALAXY_RADIUS)
      ],
      color: randomColor()
    })),
  []);

  const planets = useMemo(() => 
    Array(PLANET_COUNT).fill().map(() => ({
      position: [
        random(-GALAXY_RADIUS, GALAXY_RADIUS),
        random(-GALAXY_RADIUS / 4, GALAXY_RADIUS / 4),
        random(-GALAXY_RADIUS, GALAXY_RADIUS)
      ],
      size: random(1, 5),
      color: randomColor(),
      ringColor: randomColor()
    })),
  []);

  const geometries = useMemo(() => 
    Array(GEOMETRY_COUNT).fill().map(() => ({
      position: [
        random(-GALAXY_RADIUS, GALAXY_RADIUS),
        random(-GALAXY_RADIUS / 4, GALAXY_RADIUS / 4),
        random(-GALAXY_RADIUS, GALAXY_RADIUS)
      ],
      scale: random(5, 20)
    })),
  []);

  return (
    <>
      <GalacticCore position={[0, 0, 0]} />
      <CosmicWeb />
      {clusters.map((props, i) => (
        <StarCluster key={i} {...props} />
      ))}
      {nebulae.map((props, i) => (
        <Nebula key={i} {...props} />
      ))}
      {planets.map((props, i) => (
        <Planet key={i} {...props} />
      ))}
      {geometries.map((props, i) => (
        <GeometricStructure key={i} {...props} />
      ))}
      <PortfolioContent
        position={[0, 50, 0]}
        title="Welcome to My Cosmic Portfolio"
        description="Explore the galaxy to discover my projects and skills!"
      />
      <PortfolioContent
        position={[100, 0, 100]}
        title="Web Development"
        description="Expert in React, Node.js, and modern web technologies."
      />
      <PortfolioContent
        position={[-100, 0, -100]}
        title="3D Graphics"
        description="Proficient in Three.js and WebGL for immersive experiences."
      />
      <PortfolioContent
        position={[0, -50, 150]}
        title="Machine Learning"
        description="Experience with TensorFlow and PyTorch for AI applications."
      />
    </>
  );
}

function ExpandedCosmicPortfolio() {
  const { brightness } = useControls({ brightness: { value: 1, min: 0, max: 2 } });

  return (
    <>
      <Canvas camera={{ position: [0, 0, 100], fov: 60, far: GALAXY_RADIUS * 2 }}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', GALAXY_RADIUS / 2, GALAXY_RADIUS]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={GALAXY_RADIUS} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Suspense fallback={null}>
          <GalacticScene />
        </Suspense>
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <OrbitControls enablePan={false} enableZoom={true} maxDistance={GALAXY_RADIUS} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
      <Leva collapsed />
    </>
  );
}

export default ExpandedCosmicPortfolio;