import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// CONSTANTS
const width = window.innerWidth;
const height = window.innerHeight;
const ratio = width/height;
const cameraFov = 75;
const nearPlane = 0.1;
const farPlane = 1000;

// SCENE DEFINITIONS
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(cameraFov,ratio,nearPlane,farPlane);
camera.position.z = 1;

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;

// SCENE OBJECTS
const vertexShader = document.getElementById("vertexShader").textContent;
const fragmentShader = document.getElementById("fragmentShader").textContent;

// const geometry = new THREE.PlaneGeometry(1,1);
const geometry = new THREE.IcosahedronGeometry(0.5,32,16);

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
});

const object = new THREE.Mesh(geometry,material);
scene.add(object);

// MAIN LOOP
function animate() {
    renderer.render(scene,camera);
}