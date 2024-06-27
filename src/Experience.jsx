import {
  Center,
  OrbitControls,
  Sky,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useEffect } from 'react';

export default function Experience() {
  const { nodes } = useGLTF('./model/portal.glb');
  const bakedTexture = useTexture('./model/baked.jpg');
  bakedTexture.flipY = false;

  useEffect(() => {}, []);

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
        <mesh
          geometry={nodes.baked.geometry}
          position={nodes.baked.position}
          rotation={nodes.baked.rotation}
          scale={nodes.baked.scale}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.base006.geometry}
          position={nodes.base006.position}
          rotation={nodes.base006.rotation}
          scale={nodes.base006.scale}
        />
        <mesh
          geometry={nodes.rope008.geometry}
          position={nodes.rope008.position}
          rotation={nodes.rope008.rotation}
          scale={nodes.rope008.scale}
        />
      </Center>
    </>
  );
}

/* ​
0: Object { isObject3D: true, uuid: "d2ccf590-29ac-4fd6-8188-ff6f307b99a8", name: "Circle", … }
​​
1: Object { isObject3D: true, uuid: "fa8b6682-52db-4f97-9db4-f61030a04af4", name: "base006", … }
​​
2: Object { isObject3D: true, uuid: "bf078011-8b9f-4803-b5a4-d113e40cfb49", name: "rope008", … }
​​
3: Object { isObject3D: true, uuid: "80822ab8-c3e2-44fe-b806-02073e41c991", name: "baked", … } */
