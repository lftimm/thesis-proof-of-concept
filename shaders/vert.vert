varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vPosition = vec3(position.x,position.y,position.z+sin(position.y));
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}