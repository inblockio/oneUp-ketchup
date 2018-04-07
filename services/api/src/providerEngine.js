// const Web3 = require('web3');
const lightwallet = require('eth-lightwallet');
const crypto = require('crypto');
// For information on the provider engine:
// https://github.com/MetaMask/provider-engine

// Initialize the main engine
const ProviderEngine = require('web3-provider-engine');

// Add subproviders for different tasks:
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
// const VmSubprovider = require('web3-provider-engine/subproviders/vm.js');
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const FetchSubprovider = require('web3-provider-engine/subproviders/fetch.js');
const InflightCacheSubprovider = require('web3-provider-engine/subproviders/inflight-cache');
const SanitizingSubprovider = require('web3-provider-engine/subproviders/sanitizer.js');
const Transaction = require('ethereumjs-tx');

const { ETHEREUM_HOST, ETHEREUM_PORT } = process.env;

class EthProviderEngine {
  constructor(keyStore = false, password = false) {
    this.keyStore = typeof keyStore === 'string' ? lightwallet.keystore.deserialize(keyStore) : keyStore;
    this.password = password;
    this.blockHandler = block => console.log('BLOCK CHANGED:', `#${block.number.toString('hex')}`, `0x${block.hash.toString('hex')}`);
    this.errorHandler = err => console.error(err.stack);
    this.newEngine();
  }

  setRpc(rpcAddress) {
    this.engine.addProvider(new RpcSubprovider({
      rpcUrl: rpcAddress || `http://${ETHEREUM_HOST}:${ETHEREUM_PORT}`,
    }));
    this.engine.start();
  }

  newEngine(options = false) {
    this.engine = new ProviderEngine();

    // static results
    this.engine.addProvider(new FixtureSubprovider({
      web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
      net_listening: true,
      eth_hashrate: '0x00',
      eth_mining: false,
      eth_syncing: true,
    }));

    // nonce tracker
    this.engine.addProvider(new NonceTrackerSubprovider());

    // sanitization
    const sanitizer = new SanitizingSubprovider();
    this.engine.addProvider(sanitizer);

    // cache layer
    const cacheSubprovider = new CacheSubprovider();
    this.engine.addProvider(cacheSubprovider);

    // filters
    const filterSubprovider = new FilterSubprovider();
    this.engine.addProvider(filterSubprovider);

    // inflight cache
    const inflightCache = new InflightCacheSubprovider();
    this.engine.addProvider(inflightCache);

    this.engine.addProvider(new HookedWalletSubprovider({
      // Override the getAccounts function with the addresses of the keystore
      getAccounts: (cb) => {
        cb(null, this.getAccounts());
      },
      // Sign a transaction via the keyStore
      signTransaction: (txParams, cb) => {
        // Initiate a new transaction based on the input JSON
        const tx = new Transaction(txParams);
        // Workaround for issue https://github.com/ethereumjs/ethereumjs-tx/issues/22
        // Specify the needed gas for the transaction
        tx.gas = txParams.gas;
        const rawTx = `0x${tx.serialize().toString('hex')}`;

        // Unlock the keyStore
        this.keyStore.keyFromPassword(this.getPassword(), (err, pwDerivedKey) => {
          if (err) cb(err);
          // Possible better way of signing
          cb(null, lightwallet.signing.signTx(this.keyStore, pwDerivedKey, rawTx, txParams.from));
        });
      },
    }));

    // data source
    const dataSubprovider = new FetchSubprovider({
      rpcUrl: options.rpcAddress || `http://${ETHEREUM_HOST}:${ETHEREUM_PORT}`,
    });
    this.engine.addProvider(dataSubprovider);

    // Error reporting
    this.engine.on('error', this.errorHandler);
    this.engine.on('block', this.blockHandler);

    // start polling
    this.engine.start();
  }

  static newKeyStore(password = '', seedPhraseInput = '') {
    const seedPhrase = seedPhraseInput ||
      lightwallet.keystore.generateRandomSeed(EthProviderEngine.randomString(32));

    return new Promise((resolve, reject) => {
      lightwallet.keystore.createVault({
        password,
        seedPhrase,
        hdPathString: 'm/44/60/0/0',
      }, (err, ks) => {
        if (err) reject(err);
        resolve({ keyStore: ks.serialize(), seedPhrase });
      });
    });
  }

  static randomString(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  getEngine() {
    return this.engine;
  }
  setKeyStore(keyStore) {
    this.keyStore = typeof keyStore === 'string' ? lightwallet.keystore.deserialize(keyStore) : keyStore;
  }
  getKeyStore() {
    return this.keyStore;
  }
  setPassword(password) {
    this.password = password;
  }
  getPassword() {
    return this.password;
  }
  getAccounts() {
    return this.getKeyStore().getAddresses();
  }
  newAddress(amountAddresses = 1) {
    const ks = this.getKeyStore();
    return new Promise((resolve, reject) => {
      ks.keyFromPassword(this.password, (err, pwDerivedKey) => {
        if (err) reject(err);
        ks.generateNewAddress(pwDerivedKey, amountAddresses);
        resolve(ks.serialize());
      });
    });
  }
}

module.exports = EthProviderEngine;
