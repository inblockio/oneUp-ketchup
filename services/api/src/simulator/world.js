module.exports = function createWorld() {
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

  return {
    tick,
    addAgent: (agent) => { agents.push(agent); },
  };
}
