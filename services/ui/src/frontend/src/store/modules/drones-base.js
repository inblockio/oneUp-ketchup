const droneStates = {
  READY: 'READY',
  LOADING: 'LOADING',
  UNLOADING: 'UNLOADING',
  MAINTENANCE: 'MAINTENANCE',
};

export default {
  x: 0,
  y: 0,
  status: droneStates.READY,
  transport: {
    from: {
      x: 0,
      y: 0,
    },
    to: {
      x: 0,
      y: 0,
    },
  },
};
