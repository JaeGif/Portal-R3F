import {
  Center,
  OrbitControls,
  Sky,
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Shaders
import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';
import { extend, useFrame } from '@react-three/fiber';

const PortalMaterial = shaderMaterial(
  { uTime: 0 },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF('./model/portal.glb');
  const bakedTexture = useTexture('./model/baked.jpg');
  bakedTexture.flipY = false;

  const portalLightRef = useRef(null);

  useFrame((state, delta) => {
    portalLightRef.current.uTime += delta;
  });
  return (
    <>
      <Perf position='top-left' />
      <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.1} />

      <Sky
        sunPosition={[0, -1, 0]}
        distance={450000}
        turbidity={10}
        rayleigh={1}
        mieCoefficient={0.05}
        mieDirectionalG={0.95}
        azimuth={-167.2}
      />
      <Center position-y={0.75}>
        {/* Main Geometry */}
        <mesh
          geometry={nodes.baked.geometry}
          position={nodes.baked.position}
          rotation={nodes.baked.rotation}
          scale={nodes.baked.scale}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        {/* Lights */}
        <mesh
          geometry={nodes.base006.geometry}
          position={nodes.base006.position}
          rotation={nodes.base006.rotation}
          scale={nodes.base006.scale}
        >
          <meshBasicMaterial color={'#ffffe5'} />
        </mesh>
        <mesh
          geometry={nodes.rope008.geometry}
          position={nodes.rope008.position}
          rotation={nodes.rope008.rotation}
          scale={nodes.rope008.scale}
        >
          <meshBasicMaterial color={'#ffffe5'} />
        </mesh>

        {/* Portal Light */}
        <mesh
          geometry={nodes.Circle.geometry}
          position={nodes.Circle.position}
          rotation={nodes.Circle.rotation}
          scale={nodes.Circle.scale}
        >
          <portalMaterial ref={portalLightRef} transparent side={2} />
        </mesh>

        {/* Fireflies */}
        <Sparkles
          size={6}
          scale={[4, 3, 4]}
          position-y={1.6}
          speed={0.4}
          count={20}
          color={'orange'}
        />
      </Center>
    </>
  );
}
