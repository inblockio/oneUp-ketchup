<template>
  <div id="render" @keyUp.prevent="logStats">
  </div>
</template>

<script>

import * as THREE from 'three';
import FirstPersonControls from './FirstPersonControls';

// console.log(FirstPersonControls);
THREE.FirstPersonControls = FirstPersonControls;
export default {
  name: 'World',
  data() {
    return {
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      geometry: null,
      material: null,
      mesh: null,
      worldWidth: 42,
      worldDepth: 42,
      worldScaleX: 1000,
      worldScaleY: 1000,
      worldFactor: null,
      worldHalfWidth: this.worldWidth / 2,
      worldHalfDepth: this.worldDepth / 2,
      clock: null,
      innerWidth: 1920,
      innerHeight: 1080,
      controlsEnabled: true,
      houses: [],
    };
  },
  beforeMount() {
    // eslint-disable-next-line
    this.innerHeight = window.innerHeight;
    // eslint-disable-next-line
    this.innerWidth = window.innerWidth;
  },
  mounted() {
    this.init();
    this.animate();
  },
  created() {
    // eslint-disable-next-line
    window.addEventListener('keyup', this.logStats);
  },
  methods: {
    logStats(event) {
      console.log(event);
      console.log(`this.camera.position.y = ${this.camera.position.y}; this.camera.position.x = ${this.camera.position.x}; this.camera.position.z = ${this.camera.position.z};`);
      console.log(`this.camera.rotation.y = ${this.camera.rotation.y}; this.camera.rotation.x = ${this.camera.rotation.x}; this.camera.rotation.z = ${this.camera.rotation.z};`);
    },
    async init() {
      this.worldFactor = this.worldScaleX / this.worldWidth;
      // console.log(this.worldFactor);

      this.clock = new THREE.Clock();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.innerWidth, this.innerHeight);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x9fd88c);

      this.camera = new THREE.PerspectiveCamera(65, this.innerWidth / this.innerHeight, 1, 20000);
      // eslint-disable-next-line
      this.camera.position.y = 719.3206532634914; this.camera.position.x = -1065.184710330534; this.camera.position.z = -285.04501866079187;
      // eslint-disable-next-line
      this.camera.rotation.y = -0.9; this.camera.rotation.x = -1.9531135609687742; this.camera.rotation.z = -2.0533794225771227;

      this.controls = new THREE.FirstPersonControls(this.camera);
      this.controls.movementSpeed = 500;
      this.controls.lookSpeed = 0.2;

      // eslint-disable-next-line
      this.geometry = new THREE.PlaneGeometry(this.worldScaleX, this.worldScaleY, this.worldWidth - 1, this.worldDepth - 1);
      this.geometry.rotateX(-Math.PI / 2);

      const grass = new THREE.TextureLoader().load('/static/textures/green-grass-texture.jpg');
      grass.wrapS = THREE.RepeatWrapping;
      grass.wrapT = THREE.RepeatWrapping;
      grass.repeat.set(100, 100);

      this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: grass });
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);

      // add subtle ambient lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);

      const houseMesh = await this.loadWithObjectLoader('/static/models/House/House_bamboo_state1.json', 'HouseMachine', 1.5);
      const amountHouses = 20;
      /* eslint-disable */
      for (let i = 0; i < amountHouses; i++) {
        this.houses[i] = houseMesh.clone();
        this.houses[i].x = 0;
        this.houses[i].y = 0;
        this.houses[i].position.x = 0;
        this.houses[i].position.z = 0;
        this.houses[i].position.y = 0;
        this.scene.add(this.houses[i]);
        this.moveMesh(this.houses[i], this.getRandomInt(2, 40), this.getRandomInt(2, 40));
      }

      setInterval(() => {
        this.moveMesh(this.houses[this.getRandomInt(0, (this.houses.length-1))], this.getRandomInt(-5, 5), this.getRandomInt(-5, 5));
      }, 250);

      /* eslint-enable */
      this.$el.appendChild(this.renderer.domElement);
    },
    getRandomInt(min, max) {
      // eslint-disable-next-line
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    moveMesh(object, x = 0, y = 0) {
      // console.log(object.x, object.y);
      object.x += x;
      object.y += y;
      const pos = this.calcTile(object.x, object.y);
      object.position.x = pos.x;
      object.position.z = pos.y;
      // console.log(pos);
    },
    calcTile(x, y) {
      return { x: ((x * this.worldFactor) - 500), y: ((y * this.worldFactor) - 500) };
    },
    loadWithObjectLoader(filename, name, scale) {
      return new Promise((resolve, reject) => {
        try {
          new THREE.ObjectLoader().load(filename, (mesh) => {
            mesh.scale.set(scale, scale, scale);
            resolve(mesh);
          });
        } catch (e) {
          reject(e);
        }
      });
    },
    animate() {
      // eslint-disable-next-line
      requestAnimationFrame(this.animate);

      const delta = this.clock.getDelta();
      // const time = this.clock.getElapsedTime() * 10;
      // console.log(delta, time, this.controls);
      if (this.controlsEnabled) {
        this.controls.update(delta);
      }
      // console.log('a');
      // console.log(this.camera.rotation.x);
      // this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
      // requestAnimationFrame(() => {});
      // eslint-disable-next-line
      return;
    },
  },
};
</script>
