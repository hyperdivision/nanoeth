class Request {
  constructor (rpc, method, args = []) {
    this.rpc = rpc
    this.method = method
    this.args = args

    this._promise = null
  }

  then (resolve, reject) {
    if (this.promise == null) this.promise = this.rpc.request(this.method, this.args)
    return this.promise.then(resolve, reject)
  }

  catch (reject) {
    if (this.promise == null) this.promise = this.rpc.request(this.method, this.args)
    return this.promise.catch(reject)
  }

  finally (cb) {
    if (this.promise == null) this.promise = this.rpc.request(this.method, this.args)
    return this.promise.finally(cb)
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
    return new Request(this.rpc, 'eth_accounts', [])
  }

  blockNumber () {
    return new Request(this.rpc, 'eth_blockNumber', [])
  }

  call (obj, from) {
    return new Request(this.rpc, 'eth_call', from ? [obj, from] : [obj])
  }

  chainId () {
    return new Request(this.rpc, 'eth_chainId', [])
  }

  coinbase () {
    return new Request(this.rpc, 'eth_coinbase', [])
  }

  estimateGas (obj, from) {
    return new Request(this.rpc, 'eth_estimateGas', from ? [obj, from] : [obj])
  }

  gasPrice () {
    return new Request(this.rpc, 'eth_gasPrice', [])
  }

  getBalance (obj, from) {
    return new Request(this.rpc, 'eth_getBalance', from ? [obj, from] : [obj])
  }

  getBlockByHash (hash, tx) {
    return new Request(this.rpc, 'eth_getBlockByHash', [hash, tx || false])
  }

  getBlockByNumber (n, tx) {
    return new Request(this.rpc, 'eth_getBlockByNumber', [n, tx || false])
  }

  getBlockTransactionCountByHash (hash) {
    return new Request(this.rpc, 'eth_getBlockTransactionCountByHash', [hash])
  }

  getBlockTransactionCountByNumber (n) {
    return new Request(this.rpc, 'eth_getBlockTransactionCountByNumber', [n])
  }

  getCode (addr, from) {
    return new Request(this.rpc, 'eth_getCode', from ? [addr, from] : [addr])
  }

  getFilterChanges (id) {
    return new Request(this.rpc, 'eth_getFilterChanges', [id])
  }

  getFilterLogs (id) {
    return new Request(this.rpc, 'eth_getFilterLogs', [id])
  }

  getLogs (obj) {
    return new Request(this.rpc, 'eth_getLogs', [obj])
  }

  getStorageAt (addr, pos, from) {
    return new Request(this.rpc, 'eth_getStorageAt', from ? [addr, pos, from] : [addr, pos])
  }

  getTransactionByBlockHashAndIndex (hash, pos) {
    return new Request(this.rpc, 'eth_getTransactionByBlockHashAndIndex', [hash, pos])
  }

  getTransactionByBlockNumberAndIndex (hash, pos) {
    return new Request(this.rpc, 'eth_getTransactionByBlockNumberAndIndex', [hash, pos])
  }

  getTransactionByHash (hash) {
    return new Request(this.rpc, 'eth_getTransactionByHash', [hash])
  }

  getTransactionCount (addr, from) {
    return new Request(this.rpc, 'eth_getTransactionCount', from ? [addr, from] : [addr])
  }

  getTransactionReceipt (hash) {
    return new Request(this.rpc, 'eth_getTransactionReceipt', [hash])
  }

  getUncleByBlockHashAndIndex (hash, pos) {
    return new Request(this.rpc, 'eth_getUncleByBlockHashAndIndex', [hash, pos])
  }

  getUncleByBlockNumberAndIndex (n, pos) {
    return new Request(this.rpc, 'eth_getUncleByBlockNumberAndIndex', [n, pos])
  }

  getUncleCountByBlockHash (hash) {
    return new Request(this.rpc, 'eth_getUncleCountByBlockHash', [hash])
  }

  getUncleCountByBlockNumber (hash) {
    return new Request(this.rpc, 'eth_getUncleCountByBlockNumber', [hash])
  }

  getWork () {
    return new Request(this.rpc, 'eth_getWork', [])
  }

  hashrate () {
    return new Request(this.rpc, 'eth_hashrate', [])
  }

  mining () {
    return new Request(this.rpc, 'eth_mining', [])
  }

  newBlockFilter () {
    return new Request(this.rpc, 'eth_newBlockFilter', [])
  }

  newFilter (obj) {
    return new Request(this.rpc, 'eth_newFilter', [obj])
  }

  newPendingTransactionFilter () {
    return new Request(this.rpc, 'eth_newPendingTransactionFilter', [])
  }

  protocolVersion () {
    return new Request(this.rpc, 'eth_protocolVersion', [])
  }

  sendRawTransaction (data) {
    return new Request(this.rpc, 'eth_sendRawTransaction', [data])
  }

  sendTransaction (data) {
    return new Request(this.rpc, 'eth_sendTransaction', [data])
  }

  sign (addr, data) {
    return new Request(this.rpc, 'eth_sign', [addr, data])
  }

  signTransaction (obj) {
    return new Request(this.rpc, 'eth_signTransaction', [obj])
  }

  submitHashrate (a, b) {
    return new Request(this.rpc, 'eth_submitHashrate', [a, b])
  }

  submitWork (a, b, c) {
    return new Request(this.rpc, 'eth_submitWork', [a, b, c])
  }

  syncing () {
    return new Request(this.rpc, 'eth_syncing', [])
  }

  uninstallFilter () {
    return new Request(this.rpc, 'eth_uninstallFilter', [])
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
