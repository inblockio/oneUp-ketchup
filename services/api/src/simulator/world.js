module.exports = function createWorld() {
  const agents = [];
  
  function tick() {
    //vehicles.forEach((vehicle) => {
      //vehicle.execute();
    //});
    //storages.forEach((storage) => {
      //storage.execute();
    //});
    agents.forEach((agent) => {
      agent.tick();
    });
  }

  return {
    tick,
    addAgent: (agent) => { agents.push(); },
  };
}
