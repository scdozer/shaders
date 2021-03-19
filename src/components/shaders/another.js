import { extend } from "react-three-fiber";
import { noise } from "./noise";
import { shaderMaterial } from "drei";

const rotation = `
  mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat3(
      c, 0.0, -s,
      0.0, 6.0, 0.0,
      s, 0.0, c
    );
  }
  
  vec3 rotateY(vec3 v, float angle) {
    return rotation3dY(angle) * v;
  }  
`;

const Trippy = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 0.2,
    uNoiseDensity: 1.5,
    uNoiseStrength: 0.2,
    uFrequency: 3.0,
    uAmplitude: 6.0,
    uIntensity: 10.0,
    vNormal: 0,
    vDistort: 0,
  },
  `
  varying vec3 vNormal;
  varying float vDistort;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  uniform float uFrequency;
  uniform float uAmplitude;
  ${noise}
  ${rotation}
  void main() {
    float t = uTime * uSpeed;
    float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
    vec3 pos = position + (normal * distortion);
    float angle = sin(uv.y * uFrequency + t) * uAmplitude;
    pos = rotateY(pos, angle);    
    // vNormal = normal;
    vDistort = distortion;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }  `,
  `
  varying vec3 vNormal;
  varying float vDistort;
  uniform float uTime;
  uniform float uIntensity;

  
  vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b * cos(6.28318 * (c * t + d));
    }   
    
    void main() {
  float distort = vDistort * uIntensity;
  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.1, 0.2);

  vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);

  gl_FragColor = vec4(color, 1.0);
    
    // vec3 color = vec3(1.0);
    // float distort = vDistort * uIntensity;
    // vec3 color = vec3(distort);
    // gl_FragColor = vec4(color, 1.0);
  } `
);

extend({ Trippy });
