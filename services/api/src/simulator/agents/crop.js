module.exports = function createCrop(crop) {
  let quality = 100;
  let isRotten = false;
  function rot() {
    if (!isRotten) {
      quality -= crop.rottingRate;
      if (quality < 0) {
        isRotten = false;
      }
    }
  }
  function tick() {
    rot();
  }
  return {
    tick,
  };
}

