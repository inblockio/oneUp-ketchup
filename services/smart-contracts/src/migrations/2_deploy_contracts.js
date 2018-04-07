/*
  global
  artifacts:true,
*/

const TomatoesMarket = artifacts.require('./TomatoesMarket.sol');

module.exports = async (deployer) => {
  // deploy with the possible choices
  await deployer.deploy(
    TomatoesMarket,
  );
};
