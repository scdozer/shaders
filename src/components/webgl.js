import React, { Suspense, useRef } from "react";
// import WobblePlane from "./plane.js";
import Sphere from "./sphere.js";
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
        <Suspense fallback={null}>
          {/* <WobblePlane img={img1} speed={speed} /> */}
          <Sphere img={img1} speed={speed} />
        </Suspense>
      </Canvas>
    </div>
  );
}
