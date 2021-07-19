import React, { Suspense, useRef } from "react";
// import WobblePlane from "./plane.js";
import HB from "./hb.js";
// import Sphere from "./sphere.js";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";

import img1 from "./../img/photo1.jpg";

export default function WebGL() {
  let speed = useRef(0);
  const onWheel = (e) => {
    return (speed.current = e.deltaY);
  };
  function onPan(event, info) {
    const delta = info.delta.y > 0 ? info.delta.y : -1 * info.delta.x;
    return (speed.current += -1 * delta * 0.0009);
  }
  return (
    <div className="canvas">
      <Canvas colorManagement>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          intensity={2}
        />
        <pointLight position={[-10, -10, -5]} color="red" intensity={5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <Suspense fallback={null}>
          <HB img={img1} speed={speed} />
          {/* <Sphere img={img1} speed={speed} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
