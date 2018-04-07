module.exports = async function createCity(city, world) {
  const {
    hungerPerTick,
    name,
    position,
  } = city;
  const id = world.getId();
  const type = 'CITY';
  let starvingLevel = 0;

  const storage = await world.createStorage({
    name: `${city.name} storage`,
    position: Object.assign({}, position),
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
      id,
      type,
      name,
      position,
      starvingLevel,
      hungerPerTick,
    };
  }

  return {
    tick,

    getId: () => id,
    getType: () => type,
    getPosition: () => position,

    getState,
    getStarvingLevel: () => {},
  };
}

