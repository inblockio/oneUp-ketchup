var Web3 = require('web3');
var contract = require("truffle-contract");
const Order = require('./models/order');

var web3;
const TomatoArtifact = require('./contracts/TomatoesMarket.json');

const orderEnum = ['Placed', 'Executing', 'Completed'];


async function start() {
  try {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://ganache:8545"));
    }
    const tomatoContract = contract(TomatoArtifact);
    tomatoContract.setProvider(web3.currentProvider);
    //console.log(tomatoContract);  
    const tomatoInstance = await tomatoContract.deployed();
    const THISISWEB3 = web3.eth.contract(TomatoArtifact.abi);
    
    var contractInstance = THISISWEB3.at(tomatoInstance.address);
    console.log(contractInstance);

    var eventNewOrder = contractInstance.LogNewOrder({}, {fromBlock: 0, toBlock: 'latest'});
    eventNewOrder.watch(function(error, result){
      console.log('ERROR', error, 'RESULT', result.args);

    });

    var eventExecutingOrder = contractInstance.LogExecutingOrder({}, {fromBlock: 0, toBlock: 'latest'});
    eventNewOrder.watch(function(error, result){
      const order = Order.findOne({ orderId: result.args.orderId });
      order.state = 'Executing';
      order.save();
    });

    var eventCompletedOrder = contractInstance.LogCompletedOrder({}, {fromBlock: 0, toBlock: 'latest'});
    eventCompletedOrder.watch(function(error, result){
      const order = Order.findOne({ orderId: result.args.orderId });
      order.state = 'Completed';
      order.save();
    });
  }
  catch(e) {
    console.log(e);
  }
  
}




start();
