module.exports = function createWorld() {
  const vehicles = [];
  const storages = [];
  const consumers = [];
  const producers = [];
  
  function execute() {
    console.log('execute world');
  }
  return {
    execute,
    addVehicle: () => {},
    addStorage: () => {},
    addProducer: () => {},
    addConsumer: () => {},
  }
}
