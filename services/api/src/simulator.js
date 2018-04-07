const createEngine = require('./simulator/engine');
const createWorld = require('./simulator/world');

const world = createWorld();
const engine = createEngine(world);

engine.start();
