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

  return {
    tick,

    getId: () => id,
    getType: () => type,

    getState,
  };
}

