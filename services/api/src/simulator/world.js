module.exports = function createWorld() {
  const vehicles = [];
  const storages = [];
  const consumers = [];
  const producers = [];
  
  function execute() {
    vehicles.forEach((vehicle) => {
      vehicle.execute();
    });
    storages.forEach((storage) => {
      storage.execute();
    });
    consumers.forEach((consumer) => {
      consumer.execute();
    });
    producers.forEach((producer) => {
      producer.execute();
    });
  }
  return {
    execute,
    addVehicle: () => {},
    addStorage: () => {},
    addProducer: () => {},
    addConsumer: () => {},
  }
}
