module.exports = async function createStorage(storage, world) {
  const {
    name,
    position,
  } = storage;
  const id = world.getId();
  const type = 'STORAGE';
  const crops = [];

  function tick() {
    // @todo add logic of vehicle
  }

  function store(crop) {
    crops.push(crop);
  }

  function take(quantity) {
    const takenQuantity = 0;
    for(let i = 0; i < crops.length; i++) {
      if (takenQuantity <= quantity) break;
      takenQuantity += crops[i].use(takenQuantity - quantity);
    }
    return takenQuantity;
  }

  function getState() {
    return {
      id,
      type,
      name,
      position,
      crops: crops.map(crop => crop.getId()),
    };
  }

  return {
    // engine methods
    tick,

    // agent methods
    getId: () => id,
    getType: () => type,
    getState,

    // custom method
    store,
    take,
  };
}
