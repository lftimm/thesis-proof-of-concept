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
const camera = new THREE.PerspectiveCamera(cameraFov,ratio,nearPlane,farPlane);
camera.position.x = 10;
camera.position.y = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const control = new OrbitControls(camera,renderer.domElement);
control.enableDamping = true;
control.dampingFactor = 0.05;

const gridHelper = new THREE.GridHelper(50,50);
const axesHelper = new THREE.AxesHelper();
scene.add(gridHelper);
scene.add(axesHelper);

const color = 0xFFFFFF;
const intensity = 1;

const ambientlight = new THREE.AmbientLight(color, intensity/2);
const light = new THREE.DirectionalLight(color, intensity*2);
light.position.set(-1, 2, 4);

scene.add(ambientlight);
scene.add(light);

// SCENE OBJECTS
const texture = new THREE.TextureLoader().load( "resources/concrete.jpg" );

const geometry = new THREE.CylinderGeometry(1,1,10,50);

const material = new THREE.MeshStandardMaterial({map:texture});

const object = new THREE.Mesh(geometry,material);
object.rotation.x = 3.14/2;
object.position.y += 5;
scene.add(object);

// MAIN LOOP
function animate() {
    renderer.render(scene,camera);
}