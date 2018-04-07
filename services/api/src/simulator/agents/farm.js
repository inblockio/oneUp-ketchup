module.exports = function createFarm(farm, world) {
  let crops = [];
  let harvest;

  function doHarvest(harvest) {
    if (harvest.canHarvest()) {
      const crops = harvest.harvest();
      farm.storage.store(crop);
      harvest = null;
    } 
  }
  function tick() { 
    if (!harvest) {
      harvest = createHarvest({ 
        harvestPeriod: 5, 
        quantity: 100,
        type: 'tomato',
      });
      world.addAgent(harvest);
    }
    if (harvest.canHarvest()) {
      doHarvest(harvest);
    }
  }
  
  return {
    tick,
  }; 
}

