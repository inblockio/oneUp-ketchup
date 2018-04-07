const createCrop = require('./crop');

module.exports = function createHarvest(harvest, world) {
  let harvestElapsed = harvest.harvestPeriod;

  function tick () {
    harvestElapsed--;
  }
  function canHarvest() {
    return harvestElapsed === 0;
  }
  function harvest() {
    harvestElapsed = harvest.harvestPeriod;
    const crop = createCrop({
      rottingRate: 2,
    });
    world.addAgent(crop);
    return crop;
  }
  function getState() {
    return {
      ...harvest,
      harvestElapsed,
    };
  }

  return {
    tick,
    canHarvest,
    getState,
    harvest,
  };
}

