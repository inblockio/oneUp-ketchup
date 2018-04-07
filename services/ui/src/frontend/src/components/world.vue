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
// import { mapGetters } from 'vuex';
import { getTexture } from '../util';
import FirstPersonControls from './FirstPersonControls';
import { materials } from '../store/modules/grid';

// console.log(FirstPersonControls);
THREE.FirstPersonControls = FirstPersonControls;

const world = {
  scene: null,
  camera: null,
  controls: null,
  renderer: null,
  clock: null,
  materials,
  models: [],
  gridMesh: [],
};

const tiles = [
  { x: 2, y: 2, type: 'PLOT_INACTIVE' },
  { x: 2, y: 3, type: 'PLOT_INACTIVE' },
  { x: 3, y: 2, type: 'PLOT_INACTIVE' },
  { x: 3, y: 3, type: 'PLOT_INACTIVE' },
  { x: 38, y: 2, type: 'PLOT_INACTIVE' },
  { x: 38, y: 3, type: 'PLOT_INACTIVE' },
  { x: 39, y: 2, type: 'PLOT_INACTIVE' },
  { x: 39, y: 3, type: 'PLOT_INACTIVE' },
  { x: 38, y: 38, type: 'PLOT_INACTIVE' },
  { x: 38, y: 39, type: 'PLOT_INACTIVE' },
  { x: 39, y: 38, type: 'PLOT_INACTIVE' },
  { x: 39, y: 39, type: 'PLOT_INACTIVE' },
  { x: 2, y: 38, type: 'PLOT_INACTIVE' },
  { x: 2, y: 39, type: 'PLOT_INACTIVE' },
  { x: 3, y: 38, type: 'PLOT_INACTIVE' },
  { x: 3, y: 39, type: 'PLOT_INACTIVE' },
];

export default {
  name: 'World',
  data() {
    return {
      worldWidth: 42,
      worldDepth: 42,
      worldScaleX: 1000,
      worldScaleY: 1000,
      worldFactor: null,
      innerWidth: 1920,
      innerHeight: 1080,
      controlsEnabled: true,
      grid: [],
      drones: [
        { x: 10, y: 10, model: 'drone' },
      ],
      farms: [
        { x: 30, y: 30, model: 'farm' },
      ],
    };
  },
  beforeMount() {
    // eslint-disable-next-line
    this.innerHeight = window.innerHeight;
    // eslint-disable-next-line
    this.innerWidth = window.innerWidth;
  },
  mounted() {
    if (this.grid.length === 0) {
      this.createGrid(this.worldScaleX, this.worldScaleY);
    }
    if (world.renderer === null) {
      this.init();
      this.animate();
      this.loadModels();
    }
    // this.getTile();
    setInterval(this.tick, 5000);
  },
  watch: {
  },
  created() {
    // eslint-disable-next-line
    // window.addEventListener('keyup', this.logStats);
  },
  methods: {
    tick() {
      console.log('tick');
      this.renderGrid();
    },
    createGrid(width, height) {
      const grid = [];
      for (let y = 0; y < height; y++) {
        const gridRow = [];
        for (let x = 0; x < width; x++) {
          gridRow.push({ type: 'PLOT_INACTIVE' });
        }
        grid.push(gridRow);
      }
      this.grid = grid;
      // const newMesh = this.getGridMesh(5, 5, 'PLOT_INACTIVE');
      // console.log(newMesh);
      // this.$store.dispatch('grid/setGrid', grid);
    },
    setFarms() {
      // world.farms.push({ x: 4, y: 3 });
    },
    renderDrones() {
      const drone = this.drones[0];
      drone.mesh = world.models[drone.model].clone();
      const position = this.calcTile(drone.x, drone.y);
      console.log(position, drone.mesh);
      drone.mesh.position.x = position.x;
      drone.mesh.position.z = position.y;
      drone.mesh.position.y = 1;
      world.scene.add(drone.mesh);
    },
    renderFarms() {
      const farm = this.farms[0];
      farm.mesh = world.models[farm.model].clone();
      const position = this.calcTile(farm.x, farm.y);
      console.log(position, farm.mesh);
      farm.mesh.position.x = position.x;
      farm.mesh.position.z = position.y;
      farm.mesh.position.y = 1;
      world.scene.add(farm.mesh);
    },
    renderGrid() {
      // eslint-disable-next-line
      // Object.keys(this.grid).forEach((x) => {});this.setMesh(5, 5, this.getMesh('PLOT_INACTIVE'));
      this.renderDrones();
      this.renderFarms();
      Object.keys(tiles).forEach((i) => {
        this.grid[tiles[i].x][tiles[i].y].type = 'PLOT_INACTIVE';
        this.setMesh(tiles[i].x, tiles[i].y, this.getMesh('PLOT_INACTIVE'));
      });
    },
    setMesh(x, y, mesh) {
      const mapPosition = this.calcTile(x, y);
      mesh.position.x = mapPosition.x;
      mesh.position.z = mapPosition.y;
      if (typeof world.gridMesh[`${x}_${y}`] === 'undefined') {
        world.gridMesh[`${x}_${y}`] = mesh;
        world.scene.add(world.gridMesh[`${x}_${y}`]);
      }
    },
    getMesh(type = 'PLOT_INACTIVE') {
      // eslint-disable-next-line
      const geometry = new THREE.PlaneGeometry(this.worldScaleX / this.worldWidth, this.worldScaleY / this.worldDepth, this.worldWidth - 1, this.worldDepth - 1);
      geometry.rotateX(-Math.PI / 2);
      const texture = getTexture(`textures/${this.getMaterial(type)}`, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 1;
      return mesh;
    },
    calcTile(x, y) {
      // eslint-disable-next-line
      return { x: ((x * this.worldFactor) - (this.worldScaleX / 2)), y: ((y * this.worldFactor) - (this.worldScaleY / 2)) };
    },
    getTile(x = 5, y = 5) {
      return this.grid[x][y];
    },
    // setTile(x = 5, y = 5) {
    // const gridTile = this.grid[x][y];
    // const texture = this.getMaterial(gridTile.type);
    // console.log(this.grid[x][y], texture);
    // },
    getMaterial(type = 'PLOT_INACTIVE') {
      return typeof world.materials[type.toUpperCase()] !== 'undefined' ? world.materials[type.toUpperCase()].texture : 'sand.jpg';
    },
    async loadModels() {
      world.models.farm = await this.loadModel('House/House_bamboo_state1.json', 1.5);
      world.models.drone = await this.loadModel('drone.json', 1.5);
    },
    loadModel(filename, scale) {
      return new Promise((resolve, reject) => {
        try {
          new THREE.ObjectLoader().load(`/static/models/${filename}`, (mesh) => {
            mesh.scale.set(scale, scale, scale);
            resolve(mesh);
          });
        } catch (e) {
          reject(e);
        }
      });
    },
    init() {
      this.worldFactor = this.worldScaleX / this.worldWidth;

      world.clock = new THREE.Clock();
      world.renderer = new THREE.WebGLRenderer();
      world.renderer.setSize(this.innerWidth, this.innerHeight);

      world.scene = new THREE.Scene();
      world.scene.background = new THREE.Color(0xb5e3f2);

      world.camera = new THREE.PerspectiveCamera(65, this.innerWidth / this.innerHeight, 1, 20000);
      // eslint-disable-next-line
      world.camera.position.y = 519.3206532634914;
      world.camera.position.x = -1065.184710330534;
      world.camera.position.z = -185.04501866079187;
      // eslint-disable-next-line
      world.camera.rotation.y = 40;
      world.camera.rotation.x = -0.9531135609687742;
      world.camera.rotation.z = -7.0533794225771227;

      world.controls = new THREE.FirstPersonControls(world.camera);
      world.controls.movementSpeed = 500;
      world.controls.lookSpeed = 0.2;

      // eslint-disable-next-line
      const geometry = new THREE.PlaneGeometry(this.worldScaleX, this.worldScaleY, this.worldWidth - 1, this.worldDepth - 1);
      geometry.rotateX(-Math.PI / 2);
      const texture = getTexture('textures/sand.jpg', this.worldWidth, this.worldDepth);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      world.scene.add(mesh);

      // add subtle ambient lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      world.scene.add(ambientLight);

      /* eslint-enable */
      this.$el.appendChild(world.renderer.domElement);
    },
    animate() {
      // eslint-disable-next-line
      requestAnimationFrame(this.animate);
      const delta = world.clock.getDelta();
      if (this.controlsEnabled) {
        world.controls.update(delta);
      }
      world.renderer.render(world.scene, world.camera);
    },
  },
};
</script>
