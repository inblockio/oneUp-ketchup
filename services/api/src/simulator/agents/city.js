module.exports = function createCity(city, world) {
  const id = world.getId();
  const type = 'CITY';
  const { hungerPerTick } = city;
  let starvingLevel = 0;

  const storage = world.createStorage({
    name: `${city.name} storage`,
  });

  function toString() {
    storage.get
  }
  function consume() {
    const quantity = storage.take(hungerPerTick);
    starvingLevel = hungerPerTick - quantity;
  }
  function tick() {
    // @todo build book
    consume();
  }
  function getState() {
    return {
      ...city,
      starvingLevel,
    };
  }

  return {
    tick,

    getId: () => id,
    getType: () => type,

    getState,
    getStarvingLevel: () => {},
  };
}

