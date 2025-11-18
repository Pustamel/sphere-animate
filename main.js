import * as THREE from "three";
import { WHITE_COLOR, GREEN_COLOR, PIVOT } from "./meta/consts";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100e6
);
const renderer = new THREE.WebGLRenderer();

camera.position.set(1, 1, 6);
camera.lookAt(0, 0, 0);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.2, 5, 1);
const material = new THREE.MeshStandardMaterial({ color: GREEN_COLOR });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

const geometrySphere = new THREE.SphereGeometry(0.3, 32, 16);
const materialSphere = new THREE.MeshStandardMaterial({
  color: WHITE_COLOR,
  emissive: WHITE_COLOR,
});
const sphere = new THREE.Mesh(geometrySphere, materialSphere);
scene.add(sphere);

// move the sphere away from the cube
const offsetSphere = new THREE.Vector3(1, 1, 1);
sphere.position.add(offsetSphere);

const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

const light = new THREE.PointLight(0xffffff, 5, 100);

light.position.copy(sphere.position);
scene.add(light);

/**
 * Rotate sphere around a cube
 */
function rotateSphere() {
  const offsetSphere = new THREE.Vector3().copy(sphere.position).sub(PIVOT);

  offsetSphere.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.02);
  sphere.position.copy(PIVOT).add(offsetSphere);
  light.position.copy(sphere.position);
}

function animate() {
  renderer.render(scene, camera);

  rotateSphere();
}

renderer.setAnimationLoop(animate);
