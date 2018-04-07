module.exports = async function createBlockchainService() {
  /*
   * The order is picked up by the vehicle
   */
  async function pickupOrder() {
    return Promise.resolve();
  }
  /*
   * An order is created by a city
   */
  async function createOrder() {
    return Promise.resolve();
  }
  /*
   * An order is completed by the vehicle.
   */
  async function completeOrder() {
    return Promise.resolve();
  }
  /*
   * Move crops from/to a storage from/to a vehicle
   */
  async function moveCrop() {
    return Promise.resolve();
  }
  /*
   * The city consume crops from a storage.
   */
  async function consumeCrop() {
    return Promise.resolve();
  }
  /*
   * Crop that is rotten and not consumed.
   */
  async function rotCrop() {
    return Promise.resolve();
  }
  /*
   * The vehicle requests the order book
   */
  async function getOrderBook() {
    return Promise.resolve();
  }
  /*
   * The city requests the storage
   */
  async function getStorages() {
    return Promise.resolve();
  }

  return {
    pickupOrder,
    createOrder,
    completeOrder,
    moveCrop,
    consumeCrop,
    rotCrop,

    getOrderBook,
    getStorages,
  };
};
