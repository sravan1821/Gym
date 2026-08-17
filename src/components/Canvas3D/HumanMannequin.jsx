import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  createHolographicBodyMaterial,
  createVascularMaterial,
  createOrganMaterial,
  createBoneMaterial,
} from './AnatomyShader';

/**
 * Ultra-Realistic Holographic Translucent Blue Anatomical Human
 * Continuous athletic proportions, sculpted muscle contours, pulsating heart, and vascular channels.
 */
export default function HumanMannequin({
  selectedMuscle = null,
  selectedSubMuscle = null,
  hoveredMuscle = null,
  hoveredSubMuscle = null,
  onSelectMuscle,
  onSelectSubMuscle,
  onHoverMuscle,
  onHoverSubMuscle,
  isWireframe = false,
}) {
  const groupRef = useRef();
  const heartRef = useRef();

  // Materials
  const baseMaterial = useMemo(() => createHolographicBodyMaterial(false, false), []);
  const hoveredMaterial = useMemo(() => createHolographicBodyMaterial(false, true), []);
  const selectedMaterial = useMemo(() => createHolographicBodyMaterial(true, false), []);
  const vascularMaterial = useMemo(() => createVascularMaterial(), []);
  const heartMaterial = useMemo(() => createOrganMaterial('#ff2a5f', '#ff0033'), []);
  const boneMaterial = useMemo(() => createBoneMaterial(), []);

  // Update time and animate heartbeat
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (baseMaterial.uniforms?.uTime) baseMaterial.uniforms.uTime.value = t;
    if (hoveredMaterial.uniforms?.uTime) hoveredMaterial.uniforms.uTime.value = t;
    if (selectedMaterial.uniforms?.uTime) selectedMaterial.uniforms.uTime.value = t;

    // Heartbeat pulsation (lub-dub rhythm)
    if (heartRef.current) {
      const beat = Math.sin(t * 6.5) > 0.5 ? 1.18 : Math.sin(t * 6.5 + 0.3) > 0.6 ? 1.10 : 1.0;
      heartRef.current.scale.set(beat, beat, beat);
    }
  });

  // Helper to determine material for muscle/sub-muscle
  const getSubMuscleMaterial = (parentMuscleId, subMuscleId) => {
    if (selectedSubMuscle === subMuscleId) return selectedMaterial;
    if (hoveredSubMuscle === subMuscleId) return hoveredMaterial;
    if (selectedMuscle === parentMuscleId && !selectedSubMuscle) return selectedMaterial;
    if (hoveredMuscle === parentMuscleId) return hoveredMaterial;
    return baseMaterial;
  };

  const handleSubPointerOver = (e, parentMuscleId, subMuscleId) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (onHoverSubMuscle) onHoverSubMuscle(subMuscleId);
    if (onHoverMuscle) onHoverMuscle(parentMuscleId);
  };

  const handleSubPointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    if (onHoverSubMuscle) onHoverSubMuscle(null);
    if (onHoverMuscle) onHoverMuscle(null);
  };

  const handleSubClick = (e, parentMuscleId, subMuscleId) => {
    e.stopPropagation();
    if (onSelectMuscle) onSelectMuscle(parentMuscleId);
    if (onSelectSubMuscle) onSelectSubMuscle(subMuscleId);
  };

  return (
    <group ref={groupRef} position={[0, -0.45, 0]} scale={[1.16, 1.16, 1.16]}>
      {/* ========================================================
          1. INTERNAL GLOWING ORGANS & VASCULAR / NEURAL PATHWAYS
      ======================================================== */}
      {/* Pulsating Heart */}
      <group position={[0.02, 1.44, 0.03]} ref={heartRef}>
        <mesh material={heartMaterial}>
          <sphereGeometry args={[0.046, 24, 24]} />
        </mesh>
        <mesh position={[-0.012, 0.045, -0.01]} material={vascularMaterial}>
          <cylinderGeometry args={[0.014, 0.016, 0.045, 16]} />
        </mesh>
      </group>

      {/* Internal Spinal Cord Core */}
      <mesh position={[0, 1.25, -0.03]} material={boneMaterial}>
        <cylinderGeometry args={[0.02, 0.025, 0.76, 20]} />
      </mesh>

      {/* Internal Glowing Arterial / Neural Channels */}
      <mesh position={[0, 1.16, 0.01]} material={vascularMaterial}>
        <cylinderGeometry args={[0.007, 0.006, 0.48, 12]} />
      </mesh>
      <mesh position={[-0.26, 1.28, 0.01]} rotation={[0, 0, 0.22]} material={vascularMaterial}>
        <cylinderGeometry args={[0.004, 0.003, 0.48, 10]} />
      </mesh>
      <mesh position={[0.26, 1.28, 0.01]} rotation={[0, 0, -0.22]} material={vascularMaterial}>
        <cylinderGeometry args={[0.004, 0.003, 0.48, 10]} />
      </mesh>
      <mesh position={[-0.11, 0.52, 0.01]} rotation={[0, 0, -0.05]} material={vascularMaterial}>
        <cylinderGeometry args={[0.005, 0.004, 0.62, 10]} />
      </mesh>
      <mesh position={[0.11, 0.52, 0.01]} rotation={[0, 0, 0.05]} material={vascularMaterial}>
        <cylinderGeometry args={[0.005, 0.004, 0.62, 10]} />
      </mesh>


      {/* ========================================================
          2. CONTINUOUS BASE TORSO & CORE
      ======================================================== */}
      {/* Ribcage & Core Body Hull */}
      <mesh position={[0, 1.34, 0]} material={baseMaterial}>
        <cylinderGeometry args={[0.19, 0.145, 0.46, 32]} />
      </mesh>
      {/* Pelvis & Hips */}
      <mesh position={[0, 0.94, 0]} material={baseMaterial}>
        <cylinderGeometry args={[0.155, 0.17, 0.24, 32]} />
      </mesh>


      {/* ========================================================
          3. HEAD & NECK
      ======================================================== */}
      <group position={[0, 1.76, 0]}>
        <mesh position={[0, 0.12, -0.01]} material={baseMaterial}>
          <sphereGeometry args={[0.115, 32, 32]} />
        </mesh>
        <mesh position={[0, 0.08, 0.038]} scale={[0.82, 0.95, 0.9]} material={baseMaterial}>
          <sphereGeometry args={[0.10, 24, 24]} />
        </mesh>
        <mesh position={[0, 0.01, 0.04]} rotation={[0.2, 0, 0]} scale={[0.72, 0.8, 0.85]} material={baseMaterial}>
          <coneGeometry args={[0.075, 0.11, 24]} />
        </mesh>
        <mesh position={[0, -0.09, 0.005]} rotation={[-0.04, 0, 0]} material={baseMaterial}>
          <cylinderGeometry args={[0.062, 0.078, 0.14, 24]} />
        </mesh>
      </group>


      {/* ========================================================
          4. CHEST / PECTORALS (Upper, Mid, Lower Sub-Muscles)
      ======================================================== */}
      <group>
        {/* 4A. UPPER CHEST (Clavicular Head) */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'chest', 'upper_chest')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'chest', 'upper_chest')}
        >
          <mesh
            position={[-0.096, 1.53, 0.075]}
            rotation={[0.12, -0.15, 0.14]}
            scale={[1.18, 0.72, 0.8]}
            material={getSubMuscleMaterial('chest', 'upper_chest')}
          >
            <sphereGeometry args={[0.09, 28, 28]} />
          </mesh>
          <mesh
            position={[0.096, 1.53, 0.075]}
            rotation={[0.12, 0.15, -0.14]}
            scale={[1.18, 0.72, 0.8]}
            material={getSubMuscleMaterial('chest', 'upper_chest')}
          >
            <sphereGeometry args={[0.09, 28, 28]} />
          </mesh>
        </group>

        {/* 4B. MID CHEST (Sternal Head) */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'chest', 'mid_chest')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'chest', 'mid_chest')}
        >
          <mesh
            position={[-0.108, 1.44, 0.08]}
            rotation={[0.06, -0.12, 0.06]}
            scale={[1.15, 0.92, 0.82]}
            material={getSubMuscleMaterial('chest', 'mid_chest')}
          >
            <sphereGeometry args={[0.096, 28, 28]} />
          </mesh>
          <mesh
            position={[0.108, 1.44, 0.08]}
            rotation={[0.06, 0.12, -0.06]}
            scale={[1.15, 0.92, 0.82]}
            material={getSubMuscleMaterial('chest', 'mid_chest')}
          >
            <sphereGeometry args={[0.096, 28, 28]} />
          </mesh>
        </group>

        {/* 4C. LOWER CHEST (Costal / Abdominal Head) */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'chest', 'lower_chest')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'chest', 'lower_chest')}
        >
          <mesh
            position={[-0.098, 1.36, 0.078]}
            rotation={[-0.08, -0.14, 0.08]}
            scale={[1.1, 0.65, 0.72]}
            material={getSubMuscleMaterial('chest', 'lower_chest')}
          >
            <sphereGeometry args={[0.085, 24, 24]} />
          </mesh>
          <mesh
            position={[0.098, 1.36, 0.078]}
            rotation={[-0.08, 0.14, -0.08]}
            scale={[1.1, 0.65, 0.72]}
            material={getSubMuscleMaterial('chest', 'lower_chest')}
          >
            <sphereGeometry args={[0.085, 24, 24]} />
          </mesh>
        </group>
      </group>


      {/* ========================================================
          5. SHOULDERS / DELTOIDS (Front, Side, Rear Delts)
      ======================================================== */}
      <group>
        {/* Front Delts */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'shoulders', 'front_delt')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'shoulders', 'front_delt')}
        >
          <mesh
            position={[-0.262, 1.51, 0.045]}
            rotation={[0.15, -0.15, 0.2]}
            scale={[0.88, 1.15, 0.88]}
            material={getSubMuscleMaterial('shoulders', 'front_delt')}
          >
            <sphereGeometry args={[0.092, 24, 24]} />
          </mesh>
          <mesh
            position={[0.262, 1.51, 0.045]}
            rotation={[0.15, 0.15, -0.2]}
            scale={[0.88, 1.15, 0.88]}
            material={getSubMuscleMaterial('shoulders', 'front_delt')}
          >
            <sphereGeometry args={[0.092, 24, 24]} />
          </mesh>
        </group>

        {/* Side Delts */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'shoulders', 'side_delt')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'shoulders', 'side_delt')}
        >
          <mesh
            position={[-0.292, 1.49, 0.002]}
            rotation={[0.04, 0, 0.22]}
            scale={[0.95, 1.28, 1.02]}
            material={getSubMuscleMaterial('shoulders', 'side_delt')}
          >
            <sphereGeometry args={[0.102, 24, 24]} />
          </mesh>
          <mesh
            position={[0.292, 1.49, 0.002]}
            rotation={[0.04, 0, -0.22]}
            scale={[0.95, 1.28, 1.02]}
            material={getSubMuscleMaterial('shoulders', 'side_delt')}
          >
            <sphereGeometry args={[0.102, 24, 24]} />
          </mesh>
        </group>

        {/* Rear Delts */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'shoulders', 'rear_delt')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'shoulders', 'rear_delt')}
        >
          <mesh
            position={[-0.262, 1.51, -0.045]}
            rotation={[-0.15, -0.15, 0.2]}
            scale={[0.88, 1.15, 0.88]}
            material={getSubMuscleMaterial('shoulders', 'rear_delt')}
          >
            <sphereGeometry args={[0.092, 24, 24]} />
          </mesh>
          <mesh
            position={[0.262, 1.51, -0.045]}
            rotation={[-0.15, 0.15, -0.2]}
            scale={[0.88, 1.15, 0.88]}
            material={getSubMuscleMaterial('shoulders', 'rear_delt')}
          >
            <sphereGeometry args={[0.092, 24, 24]} />
          </mesh>
        </group>
      </group>


      {/* ========================================================
          6. ARMS: BICEPS, TRICEPS, FOREARMS
      ======================================================== */}
      <group>
        {/* Biceps */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'biceps', 'long_head')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'biceps', 'long_head')}
        >
          <mesh
            position={[-0.315, 1.33, 0.02]}
            rotation={[0, 0, 0.2]}
            scale={[0.92, 1.25, 0.94]}
            material={getSubMuscleMaterial('biceps', 'long_head')}
          >
            <capsuleGeometry args={[0.065, 0.17, 16, 20]} />
          </mesh>
          <mesh
            position={[0.315, 1.33, 0.02]}
            rotation={[0, 0, -0.2]}
            scale={[0.92, 1.25, 0.94]}
            material={getSubMuscleMaterial('biceps', 'long_head')}
          >
            <capsuleGeometry args={[0.065, 0.17, 16, 20]} />
          </mesh>
        </group>

        {/* Triceps */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'triceps', 'lateral_head')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'triceps', 'lateral_head')}
        >
          <mesh
            position={[-0.315, 1.33, -0.02]}
            rotation={[0, 0, 0.18]}
            scale={[0.9, 1.25, 0.94]}
            material={getSubMuscleMaterial('triceps', 'lateral_head')}
          >
            <capsuleGeometry args={[0.064, 0.17, 16, 20]} />
          </mesh>
          <mesh
            position={[0.315, 1.33, -0.02]}
            rotation={[0, 0, -0.18]}
            scale={[0.9, 1.25, 0.94]}
            material={getSubMuscleMaterial('triceps', 'lateral_head')}
          >
            <capsuleGeometry args={[0.064, 0.17, 16, 20]} />
          </mesh>
        </group>

        {/* Forearms */}
        <mesh
          position={[-0.385, 1.05, 0.025]}
          rotation={[0.06, 0.16, 0.14]}
          material={getSubMuscleMaterial('biceps', 'brachialis')}
        >
          <cylinderGeometry args={[0.055, 0.038, 0.28, 20]} />
        </mesh>
        <mesh
          position={[0.385, 1.05, 0.025]}
          rotation={[0.06, -0.16, -0.14]}
          material={getSubMuscleMaterial('biceps', 'brachialis')}
        >
          <cylinderGeometry args={[0.055, 0.038, 0.28, 20]} />
        </mesh>

        {/* Hands / Open Palms */}
        <mesh position={[-0.445, 0.86, 0.03]} rotation={[0, 0, 0.12]} material={baseMaterial}>
          <boxGeometry args={[0.055, 0.12, 0.024]} />
        </mesh>
        <mesh position={[0.445, 0.86, 0.03]} rotation={[0, 0, -0.12]} material={baseMaterial}>
          <boxGeometry args={[0.055, 0.12, 0.024]} />
        </mesh>
      </group>


      {/* ========================================================
          7. ABS & CORE (Sculpted 6-Pack & Obliques)
      ======================================================== */}
      <group>
        {/* Upper 6-Pack */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'abs', 'upper_abs')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'abs', 'upper_abs')}
        >
          <mesh position={[-0.045, 1.25, 0.082]} scale={[1.1, 0.9, 0.6]} material={getSubMuscleMaterial('abs', 'upper_abs')}>
            <sphereGeometry args={[0.04, 20, 20]} />
          </mesh>
          <mesh position={[0.045, 1.25, 0.082]} scale={[1.1, 0.9, 0.6]} material={getSubMuscleMaterial('abs', 'upper_abs')}>
            <sphereGeometry args={[0.04, 20, 20]} />
          </mesh>
          <mesh position={[-0.045, 1.17, 0.08]} scale={[1.1, 0.9, 0.6]} material={getSubMuscleMaterial('abs', 'upper_abs')}>
            <sphereGeometry args={[0.04, 20, 20]} />
          </mesh>
          <mesh position={[0.045, 1.17, 0.08]} scale={[1.1, 0.9, 0.6]} material={getSubMuscleMaterial('abs', 'upper_abs')}>
            <sphereGeometry args={[0.04, 20, 20]} />
          </mesh>
        </group>

        {/* Lower Abs */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'abs', 'lower_abs')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'abs', 'lower_abs')}
        >
          <mesh position={[-0.045, 1.09, 0.076]} scale={[1.1, 0.9, 0.6]} material={getSubMuscleMaterial('abs', 'lower_abs')}>
            <sphereGeometry args={[0.04, 20, 20]} />
          </mesh>
          <mesh position={[0.045, 1.09, 0.076]} scale={[1.1, 0.9, 0.6]} material={getSubMuscleMaterial('abs', 'lower_abs')}>
            <sphereGeometry args={[0.04, 20, 20]} />
          </mesh>
        </group>

        {/* Obliques */}
        <mesh
          position={[-0.145, 1.16, 0.035]}
          rotation={[0, 0, 0.14]}
          scale={[0.85, 1.2, 0.9]}
          material={getSubMuscleMaterial('abs', 'upper_abs')}
        >
          <capsuleGeometry args={[0.042, 0.18, 16, 16]} />
        </mesh>
        <mesh
          position={[0.145, 1.16, 0.035]}
          rotation={[0, 0, -0.14]}
          scale={[0.85, 1.2, 0.9]}
          material={getSubMuscleMaterial('abs', 'upper_abs')}
        >
          <capsuleGeometry args={[0.042, 0.18, 16, 16]} />
        </mesh>
      </group>


      {/* ========================================================
          8. BACK & LATS
      ======================================================== */}
      <group
        onPointerOver={(e) => handleSubPointerOver(e, 'back', 'lats')}
        onPointerOut={handleSubPointerOut}
        onClick={(e) => handleSubClick(e, 'back', 'lats')}
      >
        <mesh
          position={[-0.155, 1.34, -0.055]}
          rotation={[0.1, 0.2, -0.14]}
          scale={[1.15, 1.3, 0.72]}
          material={getSubMuscleMaterial('back', 'lats')}
        >
          <capsuleGeometry args={[0.072, 0.22, 16, 16]} />
        </mesh>
        <mesh
          position={[0.155, 1.34, -0.055]}
          rotation={[0.1, -0.2, 0.14]}
          scale={[1.15, 1.3, 0.72]}
          material={getSubMuscleMaterial('back', 'lats')}
        >
          <capsuleGeometry args={[0.072, 0.22, 16, 16]} />
        </mesh>
        <mesh position={[0, 1.54, -0.05]} scale={[1.35, 0.65, 0.8]} material={getSubMuscleMaterial('back', 'upper_back_traps')}>
          <coneGeometry args={[0.16, 0.26, 20]} />
        </mesh>
      </group>


      {/* ========================================================
          9. LEGS: QUADS, HAMSTRINGS, GLUTES, CALVES
      ======================================================== */}
      <group>
        {/* Center Quad */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'quads', 'rectus_femoris')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'quads', 'rectus_femoris')}
        >
          <mesh
            position={[-0.105, 0.54, 0.04]}
            scale={[0.88, 1.25, 0.9]}
            material={getSubMuscleMaterial('quads', 'rectus_femoris')}
          >
            <capsuleGeometry args={[0.072, 0.36, 16, 20]} />
          </mesh>
          <mesh
            position={[0.105, 0.54, 0.04]}
            scale={[0.88, 1.25, 0.9]}
            material={getSubMuscleMaterial('quads', 'rectus_femoris')}
          >
            <capsuleGeometry args={[0.072, 0.36, 16, 20]} />
          </mesh>
        </group>

        {/* Outer Quad Sweep */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'quads', 'vastus_lateralis')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'quads', 'vastus_lateralis')}
        >
          <mesh
            position={[-0.155, 0.56, 0.018]}
            rotation={[0, 0, 0.08]}
            scale={[0.85, 1.2, 0.92]}
            material={getSubMuscleMaterial('quads', 'vastus_lateralis')}
          >
            <capsuleGeometry args={[0.065, 0.32, 16, 16]} />
          </mesh>
          <mesh
            position={[0.155, 0.56, 0.018]}
            rotation={[0, 0, -0.08]}
            scale={[0.85, 1.2, 0.92]}
            material={getSubMuscleMaterial('quads', 'vastus_lateralis')}
          >
            <capsuleGeometry args={[0.065, 0.32, 16, 16]} />
          </mesh>
        </group>

        {/* Teardrop VMO */}
        <group
          onPointerOver={(e) => handleSubPointerOver(e, 'quads', 'vastus_medialis')}
          onPointerOut={handleSubPointerOut}
          onClick={(e) => handleSubClick(e, 'quads', 'vastus_medialis')}
        >
          <mesh
            position={[-0.068, 0.36, 0.045]}
            scale={[0.92, 1.05, 0.92]}
            material={getSubMuscleMaterial('quads', 'vastus_medialis')}
          >
            <sphereGeometry args={[0.054, 20, 20]} />
          </mesh>
          <mesh
            position={[0.068, 0.36, 0.045]}
            scale={[0.92, 1.05, 0.92]}
            material={getSubMuscleMaterial('quads', 'vastus_medialis')}
          >
            <sphereGeometry args={[0.054, 20, 20]} />
          </mesh>
        </group>

        {/* Glutes */}
        <mesh position={[-0.095, 0.88, -0.058]} scale={[1.18, 1.08, 1.12]} material={getSubMuscleMaterial('glutes_hamstrings', 'glutes')}>
          <sphereGeometry args={[0.10, 24, 24]} />
        </mesh>
        <mesh position={[0.095, 0.88, -0.058]} scale={[1.18, 1.08, 1.12]} material={getSubMuscleMaterial('glutes_hamstrings', 'glutes')}>
          <sphereGeometry args={[0.10, 24, 24]} />
        </mesh>

        {/* Hamstrings */}
        <mesh
          position={[-0.105, 0.54, -0.04]}
          scale={[0.88, 1.25, 0.9]}
          material={getSubMuscleMaterial('glutes_hamstrings', 'hamstrings')}
        >
          <capsuleGeometry args={[0.07, 0.36, 16, 20]} />
        </mesh>
        <mesh
          position={[0.105, 0.54, -0.04]}
          scale={[0.88, 1.25, 0.9]}
          material={getSubMuscleMaterial('glutes_hamstrings', 'hamstrings')}
        >
          <capsuleGeometry args={[0.07, 0.36, 16, 20]} />
        </mesh>

        {/* Calves */}
        <mesh
          position={[-0.105, -0.05, -0.016]}
          scale={[0.95, 1.25, 0.98]}
          material={getSubMuscleMaterial('calves', 'gastrocnemius')}
        >
          <capsuleGeometry args={[0.058, 0.22, 16, 16]} />
        </mesh>
        <mesh
          position={[0.105, -0.05, -0.016]}
          scale={[0.95, 1.25, 0.98]}
          material={getSubMuscleMaterial('calves', 'gastrocnemius')}
        >
          <capsuleGeometry args={[0.058, 0.22, 16, 16]} />
        </mesh>

        {/* Shin & Feet */}
        <mesh position={[-0.105, -0.26, 0]} material={baseMaterial}>
          <cylinderGeometry args={[0.042, 0.032, 0.24, 16]} />
        </mesh>
        <mesh position={[0.105, -0.26, 0]} material={baseMaterial}>
          <cylinderGeometry args={[0.042, 0.032, 0.24, 16]} />
        </mesh>
        <mesh position={[-0.105, -0.42, 0.04]} rotation={[0.08, 0, 0]} material={baseMaterial}>
          <boxGeometry args={[0.075, 0.05, 0.16]} />
        </mesh>
        <mesh position={[0.105, -0.42, 0.04]} rotation={[0.08, 0, 0]} material={baseMaterial}>
          <boxGeometry args={[0.075, 0.05, 0.16]} />
        </mesh>
      </group>
    </group>
  );
}
