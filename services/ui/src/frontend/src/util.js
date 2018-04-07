/* eslint-disable */
/* eslint-disable no-await-in-loop, max-len, function-paren-newline */
import * as THREE from 'three';

export const getTexture = function (filePath, repeatX = 100, repeatY = 100) {
  const path = `/static/${filePath.toLowerCase()}`;
  const texture = new THREE.TextureLoader().load(path);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  return texture;
};

export const getRandomInt = function (min, max) {
  // eslint-disable-next-line
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomItem = function(arrIn) {
  return arrIn[Object.keys(arrIn)[getRandomInt(0, (Object.keys(arrIn).length - 1))]];
}

export const shuffle = function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
