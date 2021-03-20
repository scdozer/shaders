import React, { Suspense } from "react";
// import WobblePlane from "./plane.js";
import Jar from "./jar.js";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

// import img1 from "./../img/photo1.jpg";

export default function WebGL() {
  // let speed = useRef(0);
  // const onWheel = (e) => {
  //   return (speed.current = e.deltaY);
  // };
  // function onPan(event, info) {
  //   const delta = info.delta.y > 0 ? info.delta.y : -1 * info.delta.x;
  //   return (speed.current += -1 * delta * 0.0009);
  // }

  return (
    <>
      <div className="buynow">
        <h1>
          <a
            href="https://foundation.app/popopshuv/digital-dispensary-ut-sour-diesel-9919"
            target="_blank"
            rel="noreferrer"
          >
            buy nft
          </a>
        </h1>
      </div>
      <div className="canvas">
        <Canvas colorManagement camera={{ position: [-20, 0, 15] }}>
          {/* <ambientLight intensity={10} /> */}
          <OrbitControls />
          <Suspense fallback={null}>
            <Jar position={[0, 0, 5]} />
            <Jar position={[0, 0, -5]} />
            <Jar position={[0, 0, 0]} />
            <Jar position={[0, 0, 10]} />
            <Jar position={[0, 0, -10]} />

            <Jar position={[-4, 0, 2.5]} />
            <Jar position={[-4, 0, -2.5]} />
            <Jar position={[-4, 0, 7.5]} />
            <Jar position={[-4, 0, -7.5]} />
            <Jar position={[-4, 0, -12.5]} />
            <mesh position={[-1.5, -3, -2]}>
              <boxBufferGeometry args={[10, 1, 30]} />
              <meshBasicMaterial color={"white"} />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
