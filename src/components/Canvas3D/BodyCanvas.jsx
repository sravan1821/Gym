import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import HumanMannequin from './HumanMannequin';
import ControlsOverlay from './ControlsOverlay';
import MusclePin from './MusclePin';
import { MUSCLE_GROUPS } from '../../data/muscleData';

// Smooth Camera Rig for Focusing on Selected Muscles
function CameraRig({ selectedMuscle, cameraPreset }) {
  const { camera, controls } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0.9, 3.4));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.85, 0));

  useEffect(() => {
    if (cameraPreset === 'front') {
      targetPos.current.set(0, 0.9, 3.4);
      targetLookAt.current.set(0, 0.85, 0);
    } else if (cameraPreset === 'back') {
      targetPos.current.set(0, 0.9, -3.4);
      targetLookAt.current.set(0, 0.85, 0);
    } else if (cameraPreset === 'side') {
      targetPos.current.set(3.4, 0.9, 0);
      targetLookAt.current.set(0, 0.85, 0);
    } else if (cameraPreset === 'upper') {
      targetPos.current.set(0, 1.35, 2.2);
      targetLookAt.current.set(0, 1.25, 0);
    } else if (cameraPreset === 'lower') {
      targetPos.current.set(0, 0.35, 2.4);
      targetLookAt.current.set(0, 0.25, 0);
    } else if (selectedMuscle && MUSCLE_GROUPS[selectedMuscle]) {
      const data = MUSCLE_GROUPS[selectedMuscle];
      if (data.cameraPosition) {
        targetPos.current.set(...data.cameraPosition);
      }
      if (data.cameraTarget) {
        targetLookAt.current.set(...data.cameraTarget);
      }
    }
  }, [selectedMuscle, cameraPreset]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPos.current, delta * 3.5);
    if (controls) {
      controls.target.lerp(targetLookAt.current, delta * 3.5);
      controls.update();
    }
  });

  return null;
}

export default function BodyCanvas({
  selectedMuscle = null,
  selectedSubMuscle = null,
  hoveredMuscle = null,
  hoveredSubMuscle = null,
  onSelectMuscle,
  onSelectSubMuscle,
  onHoverMuscle,
  onHoverSubMuscle,
  showPins = true,
}) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [cameraPreset, setCameraPreset] = useState('front');
  const [pinsVisible, setPinsVisible] = useState(showPins);
  const controlsRef = useRef();

  useEffect(() => {
    if (selectedMuscle) {
      setAutoRotate(false);
    }
  }, [selectedMuscle]);

  const handleResetView = () => {
    setCameraPreset('front');
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handlePresetChange = (preset) => {
    setCameraPreset(preset);
    setAutoRotate(false);
  };

  // Pin data list from MUSCLE_GROUPS
  const pins = Object.values(MUSCLE_GROUPS).filter((m) => m.pin3D);

  return (
    <div className="relative w-full h-[720px] sm:h-[800px] lg:h-[860px] xl:h-[900px] rounded-3xl overflow-hidden glass-panel-glow border border-slate-700/60 shadow-2xl group select-none bg-[#050811] transition-all duration-500">
      {/* Studio Lighting Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1224] via-[#060b16] to-[#04060d] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Ground Floor Vignette */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#04060d] via-[#060b16]/60 to-transparent pointer-events-none z-10" />

      {/* 3D Viewport Controls HUD Overlay */}
      <ControlsOverlay
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
        isWireframe={isWireframe}
        onToggleWireframe={() => setIsWireframe((prev) => !prev)}
        showPins={pinsVisible}
        onTogglePins={() => setPinsVisible((p) => !p)}
        onSetCameraView={handlePresetChange}
        onResetView={handleResetView}
        activeView={cameraPreset}
      />

      {/* Three.js R3F Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0.9, 3.4], fov: 40 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={['#050811']} />
        <fog attach="fog" args={['#050811', 3.8, 9.5]} />

        {/* Studio Ambient & Key Lighting */}
        <ambientLight intensity={1.2} />

        {/* Crisp Top-Front Studio Key Light */}
        <directionalLight
          position={[2.5, 5, 3.5]}
          intensity={2.8}
          color="#e0f7ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        {/* Cool Electric Cyan Silhouette Fill Light */}
        <directionalLight position={[-3.5, 3, 2.5]} intensity={1.5} color="#00e5ff" />

        {/* Fiery Crimson / Cyan Rim Backlight */}
        <directionalLight position={[0, 4, -4.5]} intensity={4.2} color="#00f2fe" />
        <pointLight position={[0, 1.4, -2.5]} intensity={3.5} color="#00e5ff" distance={6} />
        <pointLight position={[0, 1.1, 2.2]} intensity={2.0} color="#ff2a5f" distance={4.5} />

        {/* Camera Lerp Controller */}
        <CameraRig selectedMuscle={selectedMuscle} cameraPreset={cameraPreset} />

        {/* 3D Holographic Translucent Anatomical Human Mannequin */}
        <HumanMannequin
          selectedMuscle={selectedMuscle}
          selectedSubMuscle={selectedSubMuscle}
          hoveredMuscle={hoveredMuscle}
          hoveredSubMuscle={hoveredSubMuscle}
          onSelectMuscle={onSelectMuscle}
          onSelectSubMuscle={onSelectSubMuscle}
          onHoverMuscle={onHoverMuscle}
          onHoverSubMuscle={onHoverSubMuscle}
          isWireframe={isWireframe}
        />

        {/* 3D Holographic Beacon Pins */}
        {pinsVisible &&
          pins.map((pin) => (
            <MusclePin
              key={pin.id}
              position={pin.pin3D}
              label={pin.simpleName || pin.name}
              isSelected={selectedMuscle === pin.id}
              onClick={() => onSelectMuscle(pin.id)}
            />
          ))}

        {/* Studio Floor Soft Contact Shadow (No grid lines) */}
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.85}
          scale={5.5}
          blur={1.8}
          far={3}
          color="#000000"
        />

        {/* Orbit Controls with Smooth Damping */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={1.4}
          maxDistance={5.2}
          maxPolarAngle={Math.PI / 2 + 0.12}
          minPolarAngle={Math.PI / 6}
          autoRotate={autoRotate}
          autoRotateSpeed={1.8}
        />
      </Canvas>
    </div>
  );
}
