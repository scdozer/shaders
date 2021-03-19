import * as THREE from "three";
import React, { useRef, useState } from "react";
// import lerp from "lerp";
import { useLoader, useFrame } from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
// import jar from "../img/jarDraco.gltf";
import "./shaders/trippy";
import "./shaders/trippy2";
import "./shaders/wobble";
import img from "./../img/weed.jpeg";

export default function Jar({ position }) {
  const group = useRef();
  const cyl1 = useRef();
  const cyl2 = useRef();

  const texture = useLoader(THREE.TextureLoader, img);
  useFrame(({ clock }) => {
    cyl1.current.uTime = clock.elapsedTime;
    cyl2.current.time = clock.elapsedTime;
    cyl2.current.speed = 0;
  });
  return (
    <group ref={group} position={position || [0, 0, 0]}>
      <mesh position={[0, 3, 0]}>
        <cylinderBufferGeometry
          attach="geometry"
          args={[1.75, 1.75, 1.2, 100, 100]}
        />
        <meshNormalMaterial attach="material" />
        <trippy
          ref={cyl1}
          attach="material"
          toneMapped={false}
          //   wireframe={true}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderBufferGeometry
          attach="geometry"
          args={[1.3, 1.3, 5, 100, 100]}
        />
        <meshNormalMaterial attach="material" />
        <wobbleImage
          ref={cyl2}
          attach="material"
          texture1={texture}
          toneMapped={false}
          // wireframe={true}
        />
        {/* <trippy2
          ref={cyl2}
          attach="material"
          toneMapped={false}
          // wireframe={true}
        /> */}
      </mesh>
    </group>
  );
}
