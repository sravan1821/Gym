import * as THREE from 'three';

/**
 * Materials for the Luxury Black Anatomical Mannequin:
 * - baseBodyMaterial: Deep satin obsidian / stealth black with soft specular highlights
 * - hoveredMaterial: Dynamic pulsing glowing red-crimson gradient shader with Fresnel edge rim light
 * - selectedMaterial: Fiery red gradient shader with intense crimson aura
 */

// Custom GLSL Shader for Red Gradient Muscle Glow on Black Body
export const createRedGradientMaterial = (isSelected = false) => {
  const uniforms = {
    uTime: { value: 0 },
    uColorTop: { value: new THREE.Color(isSelected ? '#ff3b5c' : '#ff1e42') },
    uColorBottom: { value: new THREE.Color(isSelected ? '#800015' : '#4a000d') },
    uColorGlow: { value: new THREE.Color(isSelected ? '#ff6685' : '#ff2b56') },
    uIntensity: { value: isSelected ? 1.5 : 1.1 },
    uSelected: { value: isSelected ? 1.0 : 0.0 }
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
      uniform vec3 uColorTop;
      uniform vec3 uColorBottom;
      uniform vec3 uColorGlow;
      uniform float uIntensity;
      uniform float uSelected;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;

      void main() {
        // Vertical gradient interpolation along local height
        float gradientFactor = clamp((vPosition.y + 0.8) * 0.7, 0.0, 1.0);
        vec3 baseGradient = mix(uColorBottom, uColorTop, gradientFactor);

        // Fresnel edge rim aura
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);
        
        // Pulse wave effect
        float pulse = sin(uTime * (uSelected > 0.5 ? 4.5 : 2.5) + vPosition.y * 3.0) * 0.12 + 0.88;

        vec3 finalColor = (baseGradient * pulse) + (uColorGlow * fresnel * uIntensity);
        
        gl_FragColor = vec4(finalColor, 0.96);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });
};

// Premium Satin Stealth Black Body Material (Obsidian / Matte Black)
export const createBaseBodyMaterial = (isWireframe = false) => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0c0c10),     // Deep stealth black
    roughness: 0.42,                      // Smooth satin skin finish
    metalness: 0.22,                      // Subtle premium metallic sheen
    wireframe: isWireframe,
    emissive: new THREE.Color(0x050508),   // Gentle dark ambient occlusion
    emissiveIntensity: 0.15,
  });
};

// Head / Face / Joint details material (Rich graphite black)
export const createJointMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x08080a),
    roughness: 0.48,
    metalness: 0.15,
  });
};
