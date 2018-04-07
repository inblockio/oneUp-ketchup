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
// import { materials } from '../store/modules/grid';

// console.log(FirstPersonControls);
THREE.FirstPersonControls = FirstPersonControls;

const world = {
  scene: null,
  camera: null,
  controls: null,
  renderer: null,
  worldFactor: null,
  clock: null,
};

export default {
  name: 'World',
  data() {
    return {
      worldScaleX: 42,
      worldScaleY: 42,
      worldWidth: 1000,
      worldDepth: 1000,
      innerWidth: 1920,
      innerHeight: 1080,
      controlsEnabled: true,
      grid: [],
    };
  },
  beforeMount() {
    // eslint-disable-next-line
    this.innerHeight = window.innerHeight;
    // eslint-disable-next-line
    this.innerWidth = window.innerWidth;
  },
  mounted() {
    // this.createGrid(this.worldScaleX, this.worldScaleY);
    this.init();
    this.animate();
  },
  created() {
    // eslint-disable-next-line
    // window.addEventListener('keyup', this.logStats);
  },
  methods: {
    createGrid(width, height) {
      const grid = [];
      for (let y = 0; y < height; y++) {
        const gridRow = [];
        for (let x = 0; x < width; x++) {
          gridRow.push({ type: 'sand' });
        }
        grid.push(gridRow);
      }
      this.grid = grid;
      // this.$store.dispatch('grid/setGrid', grid);
    },

    init() {
      world.worldFactor = this.worldScaleX / this.worldWidth;

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
      const geometry = new THREE.PlaneGeometry(this.worldWidth, this.worldDepth, this.worldWidth - 1, this.worldDepth - 1);
      geometry.rotateX(-Math.PI / 2);
      const texture = getTexture('textures/sand.jpg', 1, 1);
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
