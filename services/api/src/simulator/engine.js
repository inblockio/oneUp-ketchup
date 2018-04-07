module.exports = function createEngine(world) {
  const TICK_TIMER = 2000; 
  let currentTick = 0;
  let interval;

  function runTick() {
    console.log('Thick'); 
    world.execute();
  }
  function start() {
    interval = setInterval(runTick, 2000);   
  }

  return {
    start,
  };
};
