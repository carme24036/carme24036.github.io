import * as THREE from 'three';

// starting position of the images from the top
const STARTY = -3;

// Create a new scene
const scene = new THREE.Scene();

// create and position the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = STARTY;

const bgTexture = new THREE.TextureLoader().load('/img/bg.png');
scene.background = bgTexture;

// Create list of images in the 'img' folder
let imgList = [
     'cert.png',
     'cert.png',
     'cert.png',
];

// add every listed image as a plane mesh with texture to scene
for (const image in imgList) {
// every mesh has a geometry, texture, and material
     const texture = new THREE.TextureLoader().load('img/' + imgList[image])
     const geometry = new THREE.PlaneGeometry(24, 18);
     const material = new THREE.MeshBasicMaterial(
          {
               color: 0xffffff,
               side: THREE.DoubleSide,
               map: texture, // add the texture image here
          }
     );
     const plane = new THREE.Mesh(geometry, material);
     // add new plane to the scene
     scene.add(plane);
};

// Move the camera with the scroll bar
function moveCamera() {
     const top = document.body.getBoundingClientRect().top;
     camera.position.y = STARTY + top * 0.05;
     console.log(top);
};

document.body.onscroll = moveCamera;

// create the renderer and attatch to the canvas
const renderer = new THREE.WebGLRenderer(
     { canvas: document.querySelector('#bg') }
);

// set renderer size and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// resize the threejs canvas with the window and adjust for phone sizes
function resizeWindow() {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
     // adjust for phone or desktop size
     if (window.innerWidth <= 600) {
          camera.position.x = 0
          for (const child in scene.children) {
               scene.children[child].rotation.y = 0;
               scene.children[child].position.y = child * -50
          };
     }
     else { 
          camera.position.x = 25;
          for (const child in scene.children) {
               scene.children[child].rotation.y = 16 * (Math.PI / 180);
               scene.children[child].position.y = child * -24
          };
     };
};

// set initial canvas size
resizeWindow();

// resize canvas on window resize
window.addEventListener('resize', resizeWindow, false);

// animation loop (calls itself resursively)
function animate() {
     requestAnimationFrame(animate);
     renderer.render(scene, camera);
};

// start the animation
animate();