module.exports = function createStorage(storage) {
  crops = [];

  function tick() {
    // @todo add logic of vehicle
  }
  function store(crop) {
    crops.add(crop);
    const vehicle = // comes from something;
    vehicle.load(crop);
  }

  return {
    tick,
    store,
  };
}
