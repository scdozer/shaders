import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, createPortal, useFrame } from "react-three-fiber";
import { Text, Shadow, OrthographicCamera, OrbitControls } from "drei";
// import "./styles.css";

export default function TextSphere({ children }) {
  const cam = useRef();
  const sphere = useRef();
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");
    const target = new THREE.WebGLMultisampleRenderTarget(2048, 2048, {
      format: THREE.RGBFormat,
      stencilBuffer: false,
    });
    target.samples = 8;
    return [scene, target];
  }, []);

  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.render(scene, cam.current);
    state.gl.setRenderTarget(null);
    sphere.current.rotateY(state.clock.elapsedTime * 0.0005);
  });

  return (
    <>
      <OrthographicCamera ref={cam} position={[0, 10, 10]} zoom={10} />
      {createPortal(
        <Text
          color="#171717"
          fontSize={4}
          maxWidth={600}
          lineHeight={1}
          letterSpacing={-0.1}
          textAlign="left"
          text={children}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          {children}
        </Text>,
        scene
      )}
      <mesh>
        <sphereBufferGeometry
          ref={sphere}
          attach="geometry"
          args={[2, 64, 64]}
          position={[0, 2, 0]}
        />
        <meshStandardMaterial attach="material" map={target.texture} />
      </mesh>
      <Shadow
        scale={[2, 2, 1]}
        opacity={0.2}
        position={[0, -2.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Shadow
        color="#C12020"
        scale={[4, 4, 1]}
        opacity={0.2}
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </>
  );
}
