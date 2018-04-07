module.exports = function createEngine(world) {
  const TICK_TIMER = 2000;
  let currentTick = 0;
  let interval;

  function tick() {
    console.log('Engine: Thick');
    world.tick();
  }
  function start() {
    interval = setInterval(tick, 2000);
  }

  return {
    start,
  };
};
