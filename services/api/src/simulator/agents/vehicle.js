module.exports async function createVehicle(vehicle, world, blockchain) {
  const {
    storage,
    capacity,
    speed,
  };
  const id = world.getId();
  const type = 'VEHICLE';
  let currentPosition = Object.assign({}, storage.position);
  let currentOrder;
  let currentCrops;
  let autonomy;
  let state = 'READY';
  const address = await blockchain.addVehicle();

  function pickupOrder() {
    return await blockchain.pickupOrder(vehicleAddress);
    // get all orders with source within autonomy / 2;
    // pick the order
    // execute the order
  }

  async function tick() {
    if (!currentOrder) {
      // @todo get an order
    } else {
      // @todo perform move to fullfill the order.
      // moves can be:
      // - moveToNextPosition if the tile
      // - load if the current position is same as currentOrder.source
      // - unload if the current position is same as currentOrder.destination
    }
  }

  function getState() {
    return {
      id,
      type,
      position,
    }
  }
  return {
    tick,

    getId: () => id,
    getType: () => type,

    getState,
    getStarvingLevel: () => {},
  };
};
