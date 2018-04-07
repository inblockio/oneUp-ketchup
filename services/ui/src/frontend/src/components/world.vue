<template>
  <div>
    <!-- <div class="tileRow" v-for="(row, x) in grid">
      <div class="tile" @click.prevent="changeMaterial(x, y)" :class="col.type" v-for="(col, y) in row">{{x}} {{y}}</div>
    </div> -->
  </div>
</template>

<style scoped>

.tileRow{
  width:auto;
  height:auto;
  border-bottom:1px solid #666;
  clear:left;
  float:left;
}
.tile{
  width:50px;
  height:50px;
  border-right:1px solid #666;
  float:left;
  font-size:11px;
  background-image: url('/static/textures/sand.jpg');
  background-size: 100% 100%;
}

.EMPTY{
  background-color: #777;
}
.GRASS{
  background-color: green;
}
.FARMLAND{
  background-color: brown;
}
.FARM{
  background-color: red;
}
.ROAD{
  background-color: #333;
}

</style>

<script>

/* eslint-disable no-plusplus */
import * as THREE from 'three';
import { mapGetters } from 'vuex';
import { getTexture, getRandomItem, calcTile } from '../util';
import FirstPersonControls from './FirstPersonControls';
import { materials } from '../store/modules/grid';

// console.log(FirstPersonControls);
THREE.FirstPersonControls = FirstPersonControls;
export default {
  name: 'World',
  data() {
    return {
      worldScaleX: 42,
      worldScaleY: 42,
      worldWidth: 1000,
      worldDepth: 1000,
      mapMesh: null,
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      worldFactor: null,
      clock: null,
      innerWidth: 1920,
      innerHeight: 1080,
      controlsEnabled: true,
      houses: [],
      gridTiles: [],
      grid: [],
    };
  },
  computed: {
    // ...mapGetters('drones', ['drones']),
    // ...mapGetters('grid', ['grid']),
  },
  watch: {
    // events(newVal) {
    // console.log('WATCH', newVal);
    // this.setTile(newVal.x, newVal.y);
    // },
  },
  beforeMount() {
    // eslint-disable-next-line
    this.innerHeight = window.innerHeight;
    // eslint-disable-next-line
    this.innerWidth = window.innerWidth;
  },
  async mounted() {
    this.createGrid(this.worldScaleX, this.worldScaleY);
    await this.init();
    this.animate();
    // this.$store.dispatch('grid/init');
  },
  created() {
    // eslint-disable-next-line
    window.addEventListener('keyup', this.logStats);
  },
  methods: {
    changeMaterial(x, y) {
      // console.log(x, y);
      const type = getRandomItem(materials);
      // console.log(randomMaterial);
      // const tileSettings = { type: getRandomItem(randomMaterial) };
      // this.$store.dispatch('grid/setGridItem', { x, y, type });
    },
    createGrid(width, height) {
      const grid = [];
      for (let y = 0; y < height; y++) {
        const gridRow = [];
        for (let x = 0; x < width; x++) {
          gridRow.push({ type: getRandomItem(materials) });
          // this.gridTiles[x][y].mesh = this.getMaterialMesh(x, y);
          // const gridItem = { x, y, type: getRandomItem(materials) };
          // this.$store.dispatch('grid/setGridItem', gridItem);
        }
        grid.push(gridRow);
      }
      this.grid = grid;
      // this.$store.dispatch('grid/setGrid', grid);
    },
    getMaterialMesh(x = 5, y = 5, type = 'sand') {
      // eslint-disable-next-line
      const geometry = new THREE.PlaneGeometry(this.worldScaleX / this.worldWidth, this.worldScaleY / this.worldDepth, this.worldWidth - 1, this.worldDepth - 1);
      geometry.rotateX(-Math.PI / 2);
      const texture = getTexture(`textures/${type.toLowerCase()}.jpg`, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 1;
      const mapPosition = calcTile(x, y);
      mesh.position.x = mapPosition.x;
      mesh.position.z = mapPosition.y;
      return mesh;
    },
    addSomeDrones() {
      const droneSpecs = { range: 325, capacity: 100, speed: 80 };
      this.$store.dispatch('drones/addDrone', droneSpecs);
      this.$store.dispatch('drones/addDrone', droneSpecs);
      // this.$store.dispatch('drones/addDrone', droneSpecs);
      this.moveSomeDrones();
    },
    moveSomeDrones() {
      if (this.drones.length) {
        Object.keys(this.drones).forEach((index) => {
          const moveData = { index,
            location: {
              x: this.getRandomInt(0, 5),
              y: this.getRandomInt(0, 5),
            },
          };
          this.$store.dispatch('drones/setLocation', moveData);
          console.log(this.drones[index]);
        });
      }
      // this.$store.dispatch('drones/moveDrone', moveData);
    },
    async init() {
      this.worldFactor = this.worldScaleX / this.worldWidth;
      console.log(this.worldFactor);

      this.clock = new THREE.Clock();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.innerWidth, this.innerHeight);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xb5e3f2);

      this.camera = new THREE.PerspectiveCamera(65, this.innerWidth / this.innerHeight, 1, 20000);
      // eslint-disable-next-line
      this.camera.position.y = 519.3206532634914; this.camera.position.x = -1065.184710330534; this.camera.position.z = -185.04501866079187;
      // eslint-disable-next-line
      this.camera.rotation.y = 40; this.camera.rotation.x = -0.9531135609687742; this.camera.rotation.z = -7.0533794225771227;

      this.controls = new THREE.FirstPersonControls(this.camera);
      this.controls.movementSpeed = 500;
      this.controls.lookSpeed = 0.2;

      const grass = getTexture('textures/sand.jpg', this.worldWidth, this.worldDepth);

      // eslint-disable-next-line
      this.geometry = new THREE.PlaneGeometry(this.worldScaleX, this.worldScaleY, this.worldWidth - 1, this.worldDepth - 1);
      this.geometry.rotateX(-Math.PI / 2);
      this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: grass });
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);

      // add subtle ambient lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);
      console.log(this);
      // const houseMesh = await this.loadWithObjectLoader('/static/mod
      // els/House/House_bamboo_state1.json', 'HouseMachine', 1.5);
      // const amountHouses = 20;
      // this.setTile();
      /* eslint-disable */
      /*for (let i = 0; i < amountHouses; i++) {
        this.houses[i] = houseMesh.clone();
        this.houses[i].x = 0;
        this.houses[i].y = 0;
        this.houses[i].position.x = 0;
        this.houses[i].position.z = 0;
        this.houses[i].position.y = 0;
        this.scene.add(this.houses[i]);
        this.moveMesh(this.houses[i], this.getRandomInt(2, 40), this.getRandomInt(2, 40));
      }*/

      /*setInterval(() => {
        this.moveMesh(this.houses[this.getRandomInt(0, (this.houses.length-1))],this.getRandomInt(0, (this.houses.length-1)), this.getRandomInt(-5, 5), this.getRandomInt(-5, 5));
      }, 250);
      */
      /* setInterval(() => {
        this.changeMaterial(this.getRandomInt(0, (this.worldWidth-1)), this.getRandomInt(0, (this.worldDepth-1)));
      }, 1000); /*

      /* eslint-enable */
      this.$el.appendChild(this.renderer.domElement);
    },
    logStats() {
      // console.log(this.camera.rotation.y, this.camera.rotation.x, this.camera.rotation.z);
    },
    // setTile(type, x = 5, y = 5) {
    // this.$store.dispatch('grid/setGridItem', { x, y, type });
    // },
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
