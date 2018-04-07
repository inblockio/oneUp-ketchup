const createStorage = require('./storage');

const HARVEST_TIME = 10;
module.exports = function createFarm(farm, world) {
  let harvestElapsed = 0;

  const storage = world.createStorage({
    name: `${farm.name} storage`,
  });

  function doHarvest() {
    const crop = world.createCrop({
      name: `${farm.name} crop`,
      quantity: 10,
      rottingRate: 10,
    });
    storage.store(crop);
  }
  function tick() {
    harvestElapsed--;
    if (harvestElapsed <= 0) {
      doHarvest();
      harvestElapsed = HARVEST_TIME;
    }
  }
  function getState() {
    return { ...farm, harvestElapsed };
  }

  return {
    tick,
    getState,
  };
}

