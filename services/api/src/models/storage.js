const uuid = require('uuid');
const mongoose = require('../databases/mongo');
const Web3 = require('web3');
const ProviderEngine = require('../providerEngine');

const { ETHEREUM_HOST, ETHEREUM_PORT } = process.env;

const StorageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  storageType: {
    type: String,
    enum: ['farm', 'coop', 'city'],
    required: true,
  },
  capacity: {
    type: Number,
  },
  positionX: {
    type: Number,
  },
  positionY: {
    type: Number,
  },
  rottingFactor: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  keyStore: {
    type: Object,
  },
  seedPhrase: {
    type: String,
  },
});

StorageSchema.methods.newKeyStore = async function newKeyStore() {
  const storageKeyStore = await ProviderEngine.newKeyStore(this.password);
  this.keyStore = storageKeyStore.keyStore;
  this.seedPhrase = storageKeyStore.seedPhrase;
  return this;
};

StorageSchema.methods.seedKeyStore = async function seedKeyStore() {
  const pe = new ProviderEngine(this.keyStore, this.password);
  const web3 = new Web3(pe.engine);
  const accounts = pe.getAccounts();
  if (!accounts.length) {
    pe.setKeyStore(await pe.newAddress(1));
    this.keyStore = pe.getKeyStore();
  }
  const web3seed = new Web3(new Web3.providers.HttpProvider(`http://${ETHEREUM_HOST}:${ETHEREUM_PORT}`));
  if (web3seed.eth.accounts.length > 0) {
    return new Promise((resolve, reject) => {
      web3seed.eth.sendTransaction({
        from: web3seed.eth.accounts[0],
        to: accounts[0],
        value: web3.toWei('5', 'ether'),
      }, (err, txHash) => (
        err ? reject(err) : resolve(txHash)
      ));
    });
  }

  return false;
};

StorageSchema.methods.getKeyStore = function getKeyStore() {
  const pe = new ProviderEngine(this.keyStore, this.password);
  return pe.getKeyStore();
};

StorageSchema.methods.getProviderEngine = function getProviderEngine() {
  return new ProviderEngine(this.keyStore, this.password);
};

StorageSchema.methods.getAccounts = function getAccounts() {
  const pe = new ProviderEngine(this.keyStore, this.password);
  return pe.getAccounts();
};

module.exports = mongoose.model('Storage', StorageSchema);
