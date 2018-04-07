const EventEmitter = require('events');
const {
  MAP_HEIGHT,
  MAP_WIDTH
} = require('./constants');
const createMap = require('./map');
const createAgentCrop = require('./agents/crop');
const createAgentStorage = require('./agents/storage');
const createAgentFarm = require('./agents/farm');
const createAgentCity = require('./agents/city');

module.exports = function createWorld() {
  const eventEmitter = new EventEmitter();
  let nextId = 1;
  const world = {};
  const agents = [];
  const map = createMap({
    height: MAP_HEIGHT,
    width: MAP_HEIGHT
  });

  function getId() {
    return nextId++;
  }
  function getState() {
    return {
      map,
      agents: agents.map((agent) => agent.getState()),
    };
  }
  function addAgent(agent) {
    agents.push(agent);
  }
  async function tick() {
    eventEmitter.emit('TICK_STARTED');
    await agents.reduce((promise, agent) => {
      return promise.then(() => agent.tick());
    }, Promise.resolve());
    eventEmitter.emit('TICK_COMPLETED', getState());
  }

  async function createCrop(def) {
    const crop = await createAgentCrop(def, world);
    addAgent(crop);
    return crop;
  }
  async function createStorage(def) {
    const storage = await createAgentStorage(def, world);
    addAgent(storage);
    return storage;
  }
  async function createFarm(def) {
    const fram = await createAgentFarm(def, world);
    addAgent(fram);
    return fram;
  }
  async function createCity(def) {
    const city = await createAgentCity(def, world);
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
  world.eventEmitter = eventEmitter;
  world.getState = getState;

  return world;
}
