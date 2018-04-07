const createAgentCrop = require('./agents/crop');
const createAgentStorage = require('./agents/storage');
const createAgentFarm = require('./agents/farm');
const createAgentCity = require('./agents/city');

module.exports = function createWorld() {
  let nextId = 1;
  const world = {};
  const agents = [];

  function getId() {
    return nextId++;
  }
  function printWorld() {
    agents.forEach((agent) => {
      console.log(agent.getType(), agent.getId(), agent.getState());
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
  function createCity(def) {
    const city = createAgentCity(def, world);
    addAgent(city);
    return city;
  }
  world.tick = tick;
  world.addAgent = addAgent;
  world.createCrop = createCrop;
  world.createStorage = createStorage;
  world.createFarm = createFarm;
  world.createCity = createCity;
  world.getId = getId;
  return world;
}
