import * as THREE from 'three'

class Planet {

  constructor (payload) {
    this.name = payload.name
    this.distance = payload.distance
    this.radius = payload.radius
    this.speed = payload.speed
    this.pitch = Math.random() * 2 * Math.PI
    this.map = new THREE.TextureLoader().load(`../img/${this.name}.jpg`)
    this.material = new THREE.MeshStandardMaterial({ map: this.map })
    this.geometry = new THREE.SphereGeometry(this.radius, 36, 36)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  position (t) {
    return [
      this.distance * Math.cos(t * this.speed) * Math.cos(this.pitch),
      this.distance * Math.cos(t * this.speed) * Math.sin(this.pitch),
      this.distance * Math.sin(t * this.speed)
    ]
  }

  animate (t) {
    this.mesh.position.set(...this.position(t))
    this.mesh.rotation.y = t * this.speed * Math.PI
  }

}

const planetsData = [
  {
    name: 'mercury',
    distance: 12,
    radius: 1.5,
    speed: 7
  },
  {
    name: 'venus',
    distance: 20,
    radius: 3,
    speed: 6
  },
  {
    name: 'earth',
    distance: 30,
    radius: 4,
    speed: 5
  },
  {
    name: 'mars',
    distance: 40,
    radius: 3,
    speed: 4
  },
  {
    name: 'jupiter',
    distance: 60,
    radius: 8,
    speed: 3
  },
  {
    name: 'saturn',
    distance: 80,
    radius: 6,
    speed: 2
  },
  {
    name: 'uranus',
    distance: 100,
    radius: 5,
    speed: 1
  },
  {
    name: 'neptune',
    distance: 120,
    radius: 5,
    speed: 1
  }
]

const planets = planetsData.map(data => new Planet(data))

export default planets
