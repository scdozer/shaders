import * as THREE from "three";
import { extend } from "react-three-fiber";
// import { noise } from "./noise";
import { shaderMaterial } from "drei";
import glsl from "babel-plugin-glsl/macro";
const Hb = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  glsl`
  varying vec2 vUv;
  uniform float time;
  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += cos(modelPosition.z + (time * 1.)) * 0.25;
    modelPosition.x += cos(modelPosition.x + (time * 1.0)) * 0.25;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
    `,
  // fragment shader
  glsl`
  vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase)
    {
    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
    }
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      uniform vec2 resolution;
      
      void main() {
        vec2 pos = ((vUv.xy) - 0.5) * 2.; 
        float angle =  atan(pos.y/abs(pos.x) + 0.01);
        float r = sin(angle + time * 0.005);
        float ringFrequency = 5.;
        float g = cos(length(pos * ringFrequency) - time * 0.5);
        float blueFrequency = 15.;
        float b = cos(angle + cos(length(pos * blueFrequency) - time * 0.5)); 
        
        vec3 brightness = vec3(0.9);
        vec3 contrast = vec3(0.3,0.13,0.19);
        vec3 osc = vec3(b,cos(time/20.),cos(time/31.)) *0.5;
        vec3 phase = vec3(b,0.5,0.1);
        vec3 color = cosPalette(g, brightness, contrast, osc, phase);

        gl_FragColor = vec4(color,1.);  
      }
    `
);

extend({ Hb });
