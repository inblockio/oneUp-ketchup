module.exports = function createCrop(crop, world) {
  const id = world.getId();
  const type = 'CROP';

  let quality = 100;
  let isRotten = false;
  const { rottingRate } = crop;

  function toString() {
    console.log(`CROP: quality: ${quality}. isRotten: ${false}`);
  }
  function rot() {
    if (!isRotten) {
      quality -= crop.rottingRate;
      if (quality < 0) {
        isRotten = true;
      }
    }
  }
  function tick() {
    rot();
  }
  function getState() {
    return {
      ...crop,
      quality,
      isRotten,
    };
  }
  function use(value) {
    let toUse;
    if (value >= quantity) {
      toUse = quantity;
      quantity = 0;
    } else {
      toUse = value;
      quantity = quantity - value;
    }
    return toUse;
  }

  return {
    tick,

    getId: () => id,
    getType: () => type,

    getState,

    getQuantity: () => quantity,
    getQuality: () => quality,
    isRotten: () => isRotten,
    use,
  };
}

