const createEngine = require('./simulator/engine');
const createWorld = require('./simulator/world');
const createFarm = require('./simulator/agents/farm');

const world = createWorld();
const engine = createEngine(world);

const farmBen = createFarm({ 
  name: 'Ben farm', 
}, world);

world.addAgent(farmBen);

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
