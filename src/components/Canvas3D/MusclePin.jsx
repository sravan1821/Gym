import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Pure WebGL 3D Holographic Pin
 * High-performance 3D beacon with pulsing core and dual concentric rotating rings.
 */
export default function MusclePin({ position, label, isSelected, onClick }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 1.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 1.2;
    }
  });

  const activeColor = isSelected ? '#00f2fe' : hovered ? '#38bdf8' : '#ff2a5f';
  const emissiveColor = isSelected ? '#00f2fe' : hovered ? '#0284c7' : '#ff1e42';

  return (
    <group position={position}>
      {/* Central Pulsing Beacon Core */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[isSelected || hovered ? 0.038 : 0.026, 24, 24]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={emissiveColor}
          emissiveIntensity={isSelected || hovered ? 3.5 : 1.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Primary Concentric Orbit Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.045, 0.056, 32]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={isSelected || hovered ? 0.95 : 0.6}
          side={2}
        />
      </mesh>

      {/* Secondary Orbital Cross Ring */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
        <ringGeometry args={[0.062, 0.068, 32]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={isSelected || hovered ? 0.8 : 0.3}
          side={2}
        />
      </mesh>
    </group>
  );
}
