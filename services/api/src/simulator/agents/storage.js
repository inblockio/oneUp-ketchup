module.exports = function createStorage(storage) {
  crops = [];

  function tick() {
    // @todo add logic of vehicle
  }
  function store(crop) {
    crops.push(crop);
  }
  function getState() {
    return {
      ...storage,
      crops: crops.length,
    };
  }

  return {
    tick,
    store,
    getState,
  };
}
