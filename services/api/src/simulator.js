const createEngine = require('./simulator/engine');
const createWorld = require('./simulator/world');
const createFarm = require('./simulator/agents/farm');

const world = createWorld();
const engine = createEngine(world);

world.createFarm({
  name: 'Ben farm',
}, world);

world.createFarm({
  name: 'Jurrr',
}, world);

world.createCity({
  name: 'City',
  hungerPerTick: 10,
}, world);

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
