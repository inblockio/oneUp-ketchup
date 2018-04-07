const Web3 = require('web3');
const contract = require("truffle-contract");
const Order = require('./models/order');

let web3;
const TomatoArtifact = require('./contracts/TomatoesMarket.json');

async function start() {
  try {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider('http://ganache:8545'));
    }
    const tomatoContract = contract(TomatoArtifact);
    tomatoContract.setProvider(web3.currentProvider);
    const tomatoInstance = await tomatoContract.deployed();
    const web3Contract = web3.eth.contract(TomatoArtifact.abi);
    
    const contractInstance = web3Contract.at(tomatoInstance.address);
    console.log(contractInstance);

    const eventNewOrder = contractInstance.LogNewOrder({}, { fromBlock: 0, toBlock: 'latest' });
    eventNewOrder.watch((error, result) => {
      //Do we add the new order to mongo here?
    });

    const eventExecutingOrder = contractInstance.LogExecutingOrder({}, { fromBlock: 0, toBlock: 'latest' });
    eventNewOrder.watch((error, result) => {
      const order = Order.findOne({ orderId: result.args.orderId });
      order.state = 'Executing';
      order.save();
    });

    const eventCompletedOrder = contractInstance.LogCompletedOrder({}, { fromBlock: 0, toBlock: 'latest' });
    eventCompletedOrder.watch((error, result) => {
      const order = Order.findOne({ orderId: result.args.orderId });
      order.state = 'Completed';
      order.save();
    });
  } catch (e) {
    console.log(e);
  }
}

start();
