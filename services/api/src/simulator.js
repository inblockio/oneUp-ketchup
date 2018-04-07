const createEngine = require('./simulator/engine');
const createWorld = require('./simulator/world');
const createFarm = require('./simulator/agents/farm');
const createHarvest = require('./simulator/agents/harvest');
const createStorage = require('./simulator/agents/storage');

const world = createWorld();
const engine = createEngine(world);

const harvestTomatoBen = createHarvest({ 
  harvestPeriod: 5, 
  quantity: 100,
  type: 'tomato',
});
const farmBen = createFarm({ 
  name: 'Ben farm', 
  harvests: [harvestTomatoBen], 
});

const storageBen = createStorage({
  name: 'Ben storage',
}, world);

world.addAgent(harvestTomatoBen);

engine.start();


/*
 *
 * vehicles: [{
 *   state: READY | LOADING | UNLOADING | MAINTENANCE
 *   position: { x, y }
 *   crop: {
 *    quantity.
 *    quality
 *   }
 * }],
 * storages: [{
 *   id: 
 *   position: { x, y }
 *   crops: Crop,
 * }]
 * consumer: [{
 *    id,
 *    position:
 *    crops:{  } 
 *    hungerPerTick
 *    haungerLevel: [0, 1, 2]
 * }],
 * farms: [],
 * 
 */
