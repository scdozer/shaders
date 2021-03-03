import { extend } from "react-three-fiber";
import { shaderMaterial } from "drei";

const WobbleImage = shaderMaterial(
  { time: 0, texture1: undefined, speed: 0 },
  `
  uniform float time;
  uniform float speed;
  varying vec2 vUv;
  void main()
  {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x + (time * 1.5)) * 0.25;
    modelPosition.x += sin(modelPosition.z + (time * 1.0)) * 0.05;
    modelPosition.y += (cos(modelPosition.y * 3.1415926535897932384626433832795) * (speed - 1.0) ) * 0.005;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    vUv = uv;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
    gl_Position = projectedPosition;
  }`,
  `
  uniform float time;
  uniform float speed;
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D texture1;
  void main()
  {
    // vec4 textureColor = texture2D(texture1, vUv);
    // gl_FragColor = textureColor;


    float angle = 1.55;
    vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - 0.1) + vec2(0.5, 0.5);

        vec2 offset = (speed - 1.0) * 0.05 / 4.0 * vec2(cos(angle), sin(angle));
        vec4 cr = texture2D(texture1, p + offset);
        vec4 cga = texture2D(texture1, p);
        vec4 cb = texture2D(texture1, p - offset);
        gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);


  }`
);

extend({ WobbleImage });
