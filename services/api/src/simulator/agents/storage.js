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

  function take(quantity) {
    const takenQuantity = 0;
    for(let i = 0; i < crops.length; i++) {
      if (takenQuantity <= quantity) break;
      takenQuantity += crops[i].use(takenQuantity - quantity);
    }
    return takenQuantity;
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
    take,
  };
}
