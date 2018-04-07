const craeteCrop = require('./crop');

module.exports = function createHarvest(harvest, world) {
  const harvestElapsed = harvest.harvestPeriod;

  function tick () {
    harvestElapsed--; 
  }
  function canHarvest () {
    return harvestElapsed === 0;
  }
  function harvest () {
    harvestElapsed = harvest.harvestPeriod;
    const crop = createCrop({
      rottingRate: 2,
    });
    world.addAgent(crop);
    return crop;
  }
  
  return {
    tick,
    canHarvest,
  };
}


