import * as THREE from "three";
import React, { useRef, useState } from "react";
import lerp from "lerp";
import { useLoader, useFrame } from "react-three-fiber";
import "./shaders/wobble";

export default function WobblePlane({ img, speed }) {
  const mesh = useRef();
  const geometry = useRef();
  const wack = useRef();
  const texture = useLoader(THREE.TextureLoader, img);
  // const texture = useLoader(THREE.ImageUtils.loadTexture, img);

  const [active, setActive] = useState(false);

  useFrame(({ clock }) => {
    console.log(speed.current);
    wack.current.time = clock.elapsedTime;
    wack.current.speed = speed.current;
  });
  return (
    <mesh
      ref={mesh}
      scale={active ? [1.25, 1.25, 1.25] : [0.75, 0.75, 0.75]}
      onClick={(event) => setActive(!active)}
    >
      <planeBufferGeometry
        ref={geometry}
        attach="geometry"
        args={[8, 6, 100, 100]}
      />
      <wobbleImage
        ref={wack}
        attach="material"
        texture1={texture}
        toneMapped={false}
        // wireframe={true}
      />
      {/* <meshBasicMaterial attach="material" map={texture} toneMapped={false} /> */}
    </mesh>
  );
}
