const uuid = require('uuid/v1');
module.exports = function createStorage(storage, world) {
  const id = world.getId();
  const type = 'STORAGE';
  const crops = [];

  function tick() {
    // @todo add logic of vehicle
  }

  function store(crop) {
    crops.push(crop);
  }

  function getState() {
    return {
      ...storage,
      type: 'STORAGE',
      crops: crops.length,
    };
  }

  return {
    // engine methods
    tick,

    // agent methods
    getId: () => id,
    getType: () => type,
    getState,

    // custom method
    store,
  };
}
