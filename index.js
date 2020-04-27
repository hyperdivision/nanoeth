class Request {
  constructor (rpc, method, args = []) {
    this.rpc = rpc
    this.method = method
    this.args = args
  }

  then () {
    return this.rpc.request(this.method, this.args)
  }
}

module.exports = class ETH {
  constructor (rpc) {
    this.rpc = rpc
  }

  subscribe (req, cb) {
    return req.rpc.subscribe(req.method, req.args, cb)
  }

  accounts () {
    return new Request('eth_accounts', [])
  }

  blockNumber () {
    return new Request('eth_blockNumber', [])
  }

  call (obj, from) {
    return new Request('eth_call', from ? [obj, from] : [obj])
  }

  chainId () {
    return new Request('eth_chainId', [])
  }

  coinbase () {
    return new Request('eth_coinbase', [])
  }

  estimateGas (obj, from) {
    return new Request('eth_estimateGas', from ? [obj, from] : [obj])
  }

  gasPrice () {
    return new Request('eth_gasPrice', [])
  }

  getBalance (obj, from) {
    return new Request('eth_getBalance', from ? [obj, from] : [obj])
  }

  getBlockByHash (hash, tx) {
    return new Request('eth_getBlockByHash', [hash, tx || false])
  }

  getBlockByNumber (n, tx) {
    return new Request('eth_getBlockByNumber', [n, tx || false])
  }

  getBlockTransactionCountByHash (hash) {
    return new Request('eth_getBlockTransactionCountByHash', [hash])
  }

  getBlockTransactionCountByNumber (n) {
    return new Request('eth_getBlockTransactionCountByNumber', [n])
  }

  getCode (addr, from) {
    return new Request('eth_getCode', from ? [addr, from] : [addr])
  }

  getFilterChanges (id) {
    return new Request('eth_getFilterChanges', [id])
  }

  getFilterLogs (id) {
    return new Request('eth_getFilterLogs', [id])
  }

  getLogs (obj) {
    return new Request('eth_getLogs', [obj])
  }

  getStorageAt (addr, pos, from) {
    return new Request('eth_getStorageAt', from ? [addr, pos, from] : [addr, pos])
  }

  getTransactionByBlockHashAndIndex (hash, pos) {
    return new Request('eth_getTransactionByBlockHashAndIndex', [hash, pos])
  }

  getTransactionByBlockNumberAndIndex (hash, pos) {
    return new Request('eth_getTransactionByBlockNumberAndIndex', [hash, pos])
  }

  getTransactionByHash (hash) {
    return new Request('eth_getTransactionByHash', [hash])
  }

  getTransactionCount (addr, from) {
    return new Request('eth_getTransactionCount', from ? [addr, from] : [addr])
  }

  getTransactionReceipt (hash) {
    return new Request('eth_getTransactionReceipt', [hash])
  }

  getUncleByBlockHashAndIndex (hash, pos) {
    return new Request('eth_getUncleByBlockHashAndIndex', [hash, pos])
  }

  getUncleByBlockNumberAndIndex (n, pos) {
    return new Request('eth_getUncleByBlockNumberAndIndex', [n, pos])
  }

  getUncleCountByBlockHash (hash) {
    return new Request('eth_getUncleCountByBlockHash', [hash])
  }

  getUncleCountByBlockNumber (hash) {
    return new Request('eth_getUncleCountByBlockNumber', [hash])
  }

  getWork () {
    return new Request('eth_getWork', [])
  }

  hashrate () {
    return new Request('eth_hashrate', [])
  }

  mining () {
    return new Request('eth_mining', [])
  }

  newBlockFilter () {
    return new Request('eth_newBlockFilter', [])
  }

  newFilter (obj) {
    return new Request('eth_newFilter', [obj])
  }

  newPendingTransactionFilter () {
    return new Request('eth_newPendingTransactionFilter', [])
  }

  protocolVersion () {
    return new Request('eth_protocolVersion', [])
  }

  sendRawTransaction (data) {
    return new Request('eth_sendRawTransaction', [data])
  }

  sendTransaction (data) {
    return new Request('eth_sendTransaction', [data])
  }

  sign (addr, data) {
    return new Request('eth_sign', [addr, data])
  }

  signTransaction (obj) {
    return new Request('eth_signTransaction', [obj])
  }

  submitHashrate (a, b) {
    return new Request('eth_submitHashrate', [a, b])
  }

  submitWork (a, b, c) {
    return new Request('eth_submitWork', [a, b, c])
  }

  syncing () {
    return new Request('eth_syncing', [])
  }

  uninstallFilter () {
    return new Request('eth_uninstallFilter', [])
  }

  end () {
    return this.rpc.end ? this.rpc.end() : Promise.resolve()
  }

  destroy () {
    if (this.rpc.destroy) this.rpc.destroy()
  }

  get destroyed () {
    return !!this.rpc.destroyed
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
