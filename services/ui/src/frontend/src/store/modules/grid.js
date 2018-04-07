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
  SAND: {
    texture: 'sand.jpg',
  },
  PLOT_INACTIVE: {
    texture: 'plot_inactive.png',
  },
  PLOT_GROWING: {
    texture: 'plot_growing.jpg',
  },
  PLOT_READY: {
    texture: 'plot_ready.png',
  },
};

export default {
  namespaced: true,
  state: {
    grid: [],
    events: [],
  },
  getters: {},
  mutations: {
    [types.SET_GRID](state, gridArray) {
      state.grid = gridArray;
    },
    [types.GRID_EVENT](state, e) {
      state.events = e;
    },
  },
  actions: {
    setGrid({ commit }, gridArray) {
      commit(types.SET_GRID, gridArray);
    },
  },
};
