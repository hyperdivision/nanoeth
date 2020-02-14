module.exports = class ETH {
  constructor (rpc) {
    this.rpc = rpc 
  }
  
  static ipc (path) {
    const IPC = require('./rpc/ipc')
    return new ETH(new IPC(path))
  }

  static metamask () {
    const MetaMask = require('./rpc/metamask')
    return new ETH(new MetaMask())
  }

  accounts () {
    return this.rpc.request('eth_accounts', [])
  }

  blockNumber () {
    return this.rpc.request('eth_blockNumber', [])
  }

  call (obj, from) {
    return this.rpc.request('eth_call', from ? [obj, from] : [obj])
  }

  chainId () {
    return this.rpc.request('eth_chainId', [])
  }

  coinbase () {
    return this.rpc.request('eth_coinbase', [])
  }

  estimateGas (obj, from) {
    return this.rpc.request('eth_estimateGas', from ? [obj, from] : [obj])
  }

  gasPrice () {
    return this.rpc.request('eth_gasPrice', [])
  }

  getBalance (obj, from) {
    return this.rpc.request('eth_getBalance', from ? [obj, from] : [obj])
  }

  getBlockByHash (hash, tx) {
    return this.rpc.request('eth_getBlockByHash', [hash, tx || false])
  }

  getBlockByNumber (n, tx) {
    return this.rpc.request('eth_getBlockByNumber', [n, tx || false])
  }

  getBlockTransactionCountByHash (hash) {
    return this.rpc.request('eth_getBlockTransactionCountByHash', [hash])
  }

  getBlockTransactionCountByNumber (n) {
    return this.rpc.request('eth_getBlockTransactionCountByNumber', [n])
  }

  getCode (addr, from) {
    return this.rpc.request('eth_getCode', from ? [addr, from] : [addr])
  }

  getFilterChanges (id) {
    return this.rpc.request('eth_getFilterChanges', [id])
  }

  getFilterLogs (id) {
    return this.rpc.request('eth_getFilterLogs', [id])
  }

  getLogs (obj) {
    return this.rpc.request('eth_getLogs', [obj])
  }

  getStorageAt (addr, pos, from) {
    return this.rpc.request('eth_getStorageAt', from ? [addr, pos, from] : [addr, pos])
  }

  getTransactionByBlockHashAndIndex (hash, pos) {
    return this.rpc.request('eth_getTransactionByBlockHashAndIndex', [hash, pos])
  }

  getTransactionByBlockNumberAndIndex (hash, pos) {
    return this.rpc.request('eth_getTransactionByBlockNumberAndIndex', [hash, pos])
  }

  getTransactionByHash (hash) {
    return this.rpc.request('eth_getTransactionByHash', [hash])
  }

  getTransactionCount (addr, from) {
    return this.rpc.request('eth_getTransactionCount', from ? [addr, from] : [addr])
  }

  getTransactionReceipt (hash) {
    return this.rpc.request('eth_getTransactionReceipt', [hash])
  }

  getUncleByBlockHashAndIndex (hash, pos) {
    return this.rpc.request('eth_getUncleByBlockHashAndIndex', [hash, pos])
  }

  getUncleByBlockNumberAndIndex (n, pos) {
    return this.rpc.request('eth_getUncleByBlockNumberAndIndex', [n, pos])
  }

  getUncleCountByBlockHash (hash) {
    return this.rpc.request('eth_getUncleCountByBlockHash', [hash])
  }

  getUncleCountByBlockNumber (hash) {
    return this.rpc.request('eth_getUncleCountByBlockNumber', [hash])
  }

  getWork () {
    return this.rpc.request('eth_getWork', [])
  }

  hashrate () {
    return this.rpc.request('eth_hashrate', [])
  }

  mining () {
    return this.rpc.request('eth_mining', [])
  }

  newBlockFilter () {
    return this.rpc.request('eth_newBlockFilter', [])
  }

  newFilter (obj) {
    return this.rpc.request('eth_newFilter', [obj])
  }

  newPendingTransactionFilter () {
    return this.rpc.request('eth_newPendingTransactionFilter', [])
  }

  protocolVersion () {
    return this.rpc.request('eth_protocolVersion', [])
  }

  sendRawTransaction (data) {
    return this.rpc.request('eth_sendRawTransaction', [data])
  }

  sendTransaction (data) {
    return this.rpc.request('eth_sendTransaction', [data])
  }

  sign (addr, data) {
    return this.rpc.request('eth_sign', [addr, data])
  }

  signTransaction (obj) {
    return this.rpc.request('eth_signTransaction', [obj])
  }

  submitHashrate (a, b) {
    return this.rpc.request('eth_submitHashrate', [a, b])
  }

  submitWork (a, b, c) {
    return this.rpc.request('eth_submitWork', [a, b, c])
  }

  syncing () {
    return this.rpc.request('eth_syncing', [])
  }

  uninstallFilter () {
    return this.rpc.request('eth_uninstallFilter', [])
  }

  static hexToBigInt (s) {
    return BigInt(s, 16)
  }

  static bigIntToHex (n) {
    return '0x' + n.toString(16)
  }

  static hexToNumber (s) {
    return Number(s, 16)
  }

  static numberToHex (n) {
    return '0x' + n.toString(16)
  }
}
