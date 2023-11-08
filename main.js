import * as THREE from './three.module.js';

// import './style.css'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);

const renderer = new THREE.WebGLRenderer(
  {  canvas: document.querySelector('#bg') }
);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.z = 400
camera.position.x = 0

const geoPog = new THREE.SphereGeometry(2, 50, 50, 100)

// Making Shape
const texturePog = new THREE.TextureLoader().load('earth.png')
const matPog = new THREE.MeshStandardMaterial( 
  { 
    color: 0xffffff, 
    wireframe: false,
    map: texturePog
  }
);

// LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 10000, 100000)
pointLight.position.set(0, 50, 100)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.33)

scene.add(pointLight)
scene.add(ambientLight)

// HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// const axesHelper = new THREE.AxesHelper(20, 20, 20);
// scene.add(lightHelper, gridHelper, axesHelper);
scene.add(lightHelper)

const pog = new THREE.Mesh( geoPog, matPog );
pog.rotation.x = 0

scene.add(pog);

// STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 15, 20);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(150) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1500).fill().forEach(addStar)

// BACKGROUND
const bgTexture = new THREE.TextureLoader().load('bg.png');
scene.background = bgTexture;

// MOON
const moonTexture = new THREE.TextureLoader().load('moon.png')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 16, 16),
  new THREE.MeshStandardMaterial( {
    map: moonTexture
  })
);

scene.add(moon)

moon.position.z = 10;
moon.position.setX(-4);

// SCROLL ANIMATION
function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.z = t * -0.01;
  camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera

// ANIMATING STUFF
function animate (time) {
  requestAnimationFrame( animate );
  // pog.rotation.x += 0.02;
  pog.rotation.y += 0.005;
  // pog.rotation.z += 0.03;

  renderer.render( scene, camera );
};

animate();

// b957ff purple