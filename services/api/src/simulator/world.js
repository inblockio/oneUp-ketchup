const createAgentCrop = require('./agents/crop');
const createAgentStorage = require('./agents/storage');
const createAgentFarm = require('./agents/farm');

module.exports = function createWorld() {
  const world = {};
  const agents = [];

  function printWorld() {
    agents.forEach((agent) => {
      console.log(agent.getState());
    });
  }
  function tick() {
    agents.forEach((agent) => {
      agent.tick();
    });
    printWorld();
  }
  function addAgent(agent) {
    agents.push(agent);
  }
  function createCrop(def) {
    const crop = createAgentCrop(def, world);
    addAgent(crop);
    return crop;
  }
  function createStorage(def) {
    const storage = createAgentStorage(def, world);
    addAgent(storage);
    return storage;
  }
  function createFarm(def) {
    const fram = createAgentFarm(def, world);
    addAgent(fram);
    return fram;
  }
  world.tick = tick;
  world.addAgent = addAgent;
  world.createCrop = createCrop;
  world.createStorage = createStorage;
  world.createFarm = createFarm;
  return world;
}