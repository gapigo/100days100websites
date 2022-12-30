import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const hdrTextureURL = new URL(
  '../img/MR_INT-003_Kitchen_Pierre.hdr',
  import.meta.url
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;

const loader = new RGBELoader();
loader.load(hdrTextureURL, function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  //   scene.environment = texture;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0xffea00,
      envMap: texture,
    })
  );
  scene.add(sphere);
  sphere.position.x = 1.5;

  const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x00ea00,
      envMap: texture,
    })
  );
  scene.add(sphere2);
  sphere2.position.x = -1.5;
});

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
