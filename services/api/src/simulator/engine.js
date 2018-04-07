module.exports = function createEngine(world) {
  const TICK_TIMER = 200;
  let currentTick = 0;
  let interval;

  async function tick() {
    console.log('Engine: Thick');
    await world.tick();
    setTimeout(tick, TICK_TIMER);
  }
  async function start() {
    await tick();
  }

  return {
    start,
  };
};
