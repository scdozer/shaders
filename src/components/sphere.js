// import * as THREE from "three";
import React, { useRef, useState } from "react";
// import lerp from "lerp";
import { useLoader, useFrame } from "react-three-fiber";
import "./shaders/trippy";

export default function Sphere({ img, speed }) {
  const mesh = useRef();
  const geometry = useRef();
  const wack = useRef();
  //   const texture1 = useLoader(THREE.TextureLoader, img);

  useFrame(({ clock }) => {
    // console.log(speed.current);
    wack.current.uTime = clock.elapsedTime;
    mesh.current.rotation.y = clock.elapsedTime;
    // wack.current.speed = speed.current;
  });
  return (
    <mesh ref={mesh} scale={[0.15, 0.15, 0.15]}>
      <sphereGeometry ref={geometry} attach="geometry" args={[3, 500, 500]} />
      <trippy
        ref={wack}
        attach="material"
        toneMapped={false}
        // wireframe={true}
        // texture={texture1}
      />
    </mesh>
  );
}
