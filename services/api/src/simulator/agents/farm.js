const {
  HARVEST_TIME,
} = require('../constants');
const createStorage = require('./storage');

module.exports = async function createFarm(farm, world) {
  const {
    name,
    position,
  } = farm;
  const id = world.getId();
  const type = 'FARM';
  let ticksToNextHarvest = 0;

  const storage = await world.createStorage({
    name: `${name} storage`,
  });

  async function doHarvest() {
    const crop = await world.createCrop({
      name: `${name} crop`,
      quantity: 10,
      rottingRate: 10,
    });
    await storage.store(crop);
  }
  async function tick() {
    ticksToNextHarvest--;
    if (ticksToNextHarvest <= 0) {
      await doHarvest();
      ticksToNextHarvest = HARVEST_TIME;
    }
  }
  function getState() {
    return {
      id,
      type,
      name,
      position,
      ticksToNextHarvest,
    };
  }

  return {
    tick,

    getId: () => id,
    getType: () => type,

    getState,
  };
}

