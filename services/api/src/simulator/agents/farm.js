const createStorage = require('./storage');
const createCrop = require('./crop');

const HARVEST_TIME = 10;
module.exports = function createFarm(farm, world) {
  let harvestElapsed = 0;

  const storage = createStorage({
    name: 'Ben storage',
  }, world);
  world.addAgent(storage);

  function doHarvest() {
    const crop = createCrop({
      name: 'Ben crop',
      quantity: 10,
      rottingRate: 10,
    });
    storage.store(crop);
    world.addAgent(crop);
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

