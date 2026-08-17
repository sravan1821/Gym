import * as THREE from 'three';

/**
 * Ultra-Realistic Holographic Translucent Blue Anatomy Shader
 * Matches the reference image:
 * - Electric cyan/sapphire translucent skin with continuous surface lighting
 * - Strong Fresnel rim glow
 * - Glowing crimson/fiery highlight on hover & selection
 * - Smooth depth handling (depthWrite: true to prevent sorting artifacts)
 */
export const createHolographicBodyMaterial = (isSelected = false, isHovered = false) => {
  const uniforms = {
    uTime: { value: 0 },
    uColorCore: { value: new THREE.Color(isSelected ? '#4a0011' : isHovered ? '#003355' : '#041c33') },
    uColorRim: { value: new THREE.Color(isSelected ? '#ff2a5f' : isHovered ? '#38bdf8' : '#00d2ff') },
    uColorHighlight: { value: new THREE.Color(isSelected ? '#ff1e42' : '#00f2fe') },
    uSelected: { value: isSelected ? 1.0 : 0.0 },
    uHovered: { value: isHovered ? 1.0 : 0.0 },
  };

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorCore;
      uniform vec3 uColorRim;
      uniform vec3 uColorHighlight;
      uniform float uSelected;
      uniform float uHovered;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      void main() {
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

        // Subtle biological pulse
        float pulse = sin(uTime * 3.0 + vPosition.y * 3.5) * 0.08 + 0.92;

        // Base holographic glass color
        vec3 col = mix(uColorCore, uColorRim, fresnel * 1.25) * pulse;

        // Active muscle highlight
        if (uSelected > 0.5 || uHovered > 0.5) {
          float glowWave = sin(uTime * 5.0 + vPosition.y * 4.0) * 0.15 + 0.85;
          vec3 highlight = uColorHighlight * (fresnel * 1.8 + 0.35) * glowWave;
          col = mix(col, highlight, uSelected > 0.5 ? 0.88 : 0.65);
        }

        gl_FragColor = vec4(col, 0.94);
      }
    `,
    transparent: true,
    depthWrite: true,
    depthTest: true,
    side: THREE.DoubleSide,
  });
};

/**
 * Glowing Circulatory / Neural Arterial Pathway Material (Red / Crimson Glow)
 */
export const createVascularMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ff1e42'),
    emissive: new THREE.Color('#ff0033'),
    emissiveIntensity: 3.2,
    roughness: 0.2,
    metalness: 0.8,
  });
};

/**
 * Glowing Internal Organ Material (e.g. Heart, Spinal Core)
 */
export const createOrganMaterial = (color = '#ff2a5f', emissive = '#ff0033') => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(emissive),
    emissiveIntensity: 2.8,
    roughness: 0.3,
    metalness: 0.5,
  });
};

/**
 * Skeletal Hologram Material
 */
export const createBoneMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0a365c'),
    emissive: new THREE.Color('#0088cc'),
    emissiveIntensity: 0.9,
    roughness: 0.3,
    transparent: true,
    opacity: 0.85,
  });
};
