module.exports = async function startSimulation(engine) {
  const { world } = engine;

  world.eventEmitter.on('TICK_STARTED', () => {
    console.log('Tick started');
  });

  world.eventEmitter.on('TICK_COMPLETED', () => {
    console.log('Tick completed');
    console.log(world.getState());
  });

  return Promise.all([
    world.createFarm({
      name: 'Ben farm',
      position: {
        x: 5,
        y: 10,
      },
    }, world),
    world.createFarm({
      name: 'Jurrr farm',
      position: {
        x: 20,
        y: 45,
      },
    }, world),
    world.createCity({
      name: 'Lagos',
      hungerPerTick: 10,
      position: {
        x: 25,
        y: 25,
      },
    }, world),
  ]).then(() => engine.start())
  .catch(err => {
    console.log(error)
  });
};

/*
 * map: {
 *   width:
 *   height:
 * },
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
