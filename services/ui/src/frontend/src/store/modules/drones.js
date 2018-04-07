/* eslint-disable no-await-in-loop, max-len, function-paren-newline */
/* eslint-disable */
import _ from 'lodash';
import Notification from '../../notification';

export const types = {
  NEW_DRONE: 'NEW_DRONE',
  SET_LOCATION: 'SET_LOCATION',
  SET_TRANSPORT: 'SET_TRANSPORT',
};

export const droneStates = {
  READY: 'READY',
  LOADING: 'LOADING',
  UNLOADING: 'UNLOADING',
  MAINTENANCE: 'MAINTENANCE',
};

const droneBase = {
  x: 0,
  y:0,
  status: droneStates.READY,
  transport: {
    from: {
      x:0,
      y:0,
    },
    to: {
      x:0,
      y:0,
    },
  },
};

export default {
  namespaced: true,
  state: {
    drones: [],
  },
  getters: {
    drones: state => state.drones,
  },
  mutations: {
    [types.NEW_DRONE](state, droneObj) {
      state.drones.push({ ...droneBase, ...droneObj });
    },
    [types.SET_LOCATION](state, moveData) {
      const { index, location } = moveData;
      state.drones[index] = { ...state.drones[index], location };
    },
    [types.SET_TRANSPORT](state, transportData) {
      const { index, fromLocation, toLocation, droneState } = transportData;
      state.drones[index] = { ...state.drones[index], state: droneState, transport: { from: fromLocation, to: toLocation } };
    },
  },
  actions: {
    addDrone({ commit }, droneSpecs) {
      commit(types.NEW_DRONE, droneSpecs);
    },
    setTransport({ commit }, transportData) {
      commit(types.SET_TRANSPORT, transportData);
    },
    setLocation({ commit }, locationData) {
      commit(types.SET_LOCATION, locationData);
    }
  },
};
