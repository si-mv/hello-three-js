// dependencies
import '../css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import planets from './planets'

// set up scene, camera and renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

// configs
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(100)

// add some lights
const pointLight = new THREE.PointLight(0xffffff)
pointLight.intensity = 2
const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.intensity = 0.3
scene.add(pointLight, ambientLight)

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement)

// add background
const spaceTexture = new THREE.TextureLoader().load('../img/space.jpg')
scene.background = spaceTexture

// add stars
function addStar () {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => -100 + Math.random() * 200)
  star.position.set(x, y, z)
  scene.add(star)
}

Array(100).fill().forEach(() => addStar())

// add sun
function getSun () {
  const emissiveMap = new THREE.TextureLoader().load('../img/sun.jpg')
  const material = new THREE.MeshStandardMaterial({ emissiveMap, emissive: 'yellow' })
  const geometry = new THREE.SphereGeometry(8, 24, 24)
  const sun = new THREE.Mesh(geometry, material)
  return sun
}

const sun = getSun()
scene.add(sun)

// add planets
planets.forEach(planet => scene.add(planet.mesh))

// tick parameter
let t = 0

// loop
function animate () {
  requestAnimationFrame(animate)

  t += 0.001

  planets.forEach(planet => planet.animate(t))
  sun.rotation.y = t * Math.PI

  controls.update()
  renderer.render(scene, camera)
}

animate()
