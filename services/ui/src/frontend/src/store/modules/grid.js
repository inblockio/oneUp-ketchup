/* eslint-disable no-await-in-loop, max-len, function-paren-newline */
/* eslint-disable */
import _ from 'lodash';
import * as THREE from 'three';
import Notification from '../../notification';
import { getTexture, getRandomInt } from '../../util';

export const types = {
  SET_GRID: 'SET_GRID',
  SET_GRID_ITEM: 'SET_GRID_ITEM',
  GRID_EVENT: 'GRID_EVENT',
  INIT_MAP: 'INIT_MAP',
};

export const materials = {
  SAND: 'SAND',
  FARMLAND: 'FARMLAND',
  FARM: 'FARM',
  ROAD: 'ROAD',
};

export default {
  namespaced: true,
  state: {
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
    grid: [],
    events: [],
  },
  getters: {
    grid: state => state.grid,
    events: state => state.events,
  },
  mutations: {
    [types.SET_GRID](state, gridArray) {
      state.grid = gridArray;
    },
    [types.GRID_EVENT](state, event) {
      state.events = event;
    },
    [types.SET_GRID_ITEM](state, tileSettings) {
      const { x, y, type} = tileSettings;

      /* if (type !== state.grid[x][y].type) {
        state.grid[x][y].type = type;
        if (typeof state.grid[x][y].mesh === 'undefined') {
          const geometry = new THREE.PlaneGeometry(state.worldScaleX/state.worldWidth, state.worldScaleY/state.worldDepth, state.worldWidth - 1, state.worldDepth - 1);
          geometry.rotateX(-Math.PI / 2);
          const texture = getTexture(`textures/${type}.jpg`, 1, 1);
          const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.y = 1;
          const mapPosition = util.calcTile(x, y);
          mesh.position.x = mapPosition.x;
          mesh.position.z = mapPosition.y;
          state.grid[x][y].mesh = mesh;
        }
      } */
    },
  },
  actions: {
    setGrid({ commit }, gridArray) {
      commit(types.SET_GRID, gridArray);
    },
    setGridItem({ commit }, tileSettings) {
      commit(types.SET_GRID_ITEM, tileSettings);
      commit(types.GRID_EVENT, tileSettings);
    },
    setObject({ commit }, objectArray) {
      commit(types.SET_OBJECT, objectArray);
    },
    /* setMesh({ state, commit }, typeObj) {
      // eslint-disable-next-line
      const geometry = new THREE.PlaneGeometry(this.worldSca
      leX/this.worldWidth, this.worldScaleY/this.wo
      rldDepth, this.worldWidth - 1, this.worldDepth - 1);
      geometry.rotateX(-Math.PI / 2);
      const road = getTexture(`textures/${typeObj}.jpg`, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: road });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 1;
      const mapPosition = util.calcTile(x, y);
      mesh.position.x = mapPosition.x;
      mesh.position.z = mapPosition.y;
    } */
  },
};
