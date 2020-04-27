module.exports = class ETH {
  constructor (rpc) {
    this.rpc = rpc

    this.Request = class Request {
      constructor (method, args = []) {
        this.method = method
        this.args = args
      }

      then () {
        return rpc.request(this.method, this.args)
      }
    }
  }

  subscribe (req, cb) {
    return this.rpc.subscribe(req.method, req.args, cb)
  }

  accounts () {
    return new this.Request('eth_accounts', [])
  }

  blockNumber () {
    return new this.Request('eth_blockNumber', [])
  }

  call (obj, from) {
    return new this.Request('eth_call', from ? [obj, from] : [obj])
  }

  chainId () {
    return new this.Request('eth_chainId', [])
  }

  coinbase () {
    return new this.Request('eth_coinbase', [])
  }

  estimateGas (obj, from) {
    return new this.Request('eth_estimateGas', from ? [obj, from] : [obj])
  }

  gasPrice () {
    return new this.Request('eth_gasPrice', [])
  }

  getBalance (obj, from) {
    return new this.Request('eth_getBalance', from ? [obj, from] : [obj])
  }

  getBlockByHash (hash, tx) {
    return new this.Request('eth_getBlockByHash', [hash, tx || false])
  }

  getBlockByNumber (n, tx) {
    return new this.Request('eth_getBlockByNumber', [n, tx || false])
  }

  getBlockTransactionCountByHash (hash) {
    return new this.Request('eth_getBlockTransactionCountByHash', [hash])
  }

  getBlockTransactionCountByNumber (n) {
    return new this.Request('eth_getBlockTransactionCountByNumber', [n])
  }

  getCode (addr, from) {
    return new this.Request('eth_getCode', from ? [addr, from] : [addr])
  }

  getFilterChanges (id) {
    return new this.Request('eth_getFilterChanges', [id])
  }

  getFilterLogs (id) {
    return new this.Request('eth_getFilterLogs', [id])
  }

  getLogs (obj) {
    return new this.Request('eth_getLogs', [obj])
  }

  getStorageAt (addr, pos, from) {
    return new this.Request('eth_getStorageAt', from ? [addr, pos, from] : [addr, pos])
  }

  getTransactionByBlockHashAndIndex (hash, pos) {
    return new this.Request('eth_getTransactionByBlockHashAndIndex', [hash, pos])
  }

  getTransactionByBlockNumberAndIndex (hash, pos) {
    return new this.Request('eth_getTransactionByBlockNumberAndIndex', [hash, pos])
  }

  getTransactionByHash (hash) {
    return new this.Request('eth_getTransactionByHash', [hash])
  }

  getTransactionCount (addr, from) {
    return new this.Request('eth_getTransactionCount', from ? [addr, from] : [addr])
  }

  getTransactionReceipt (hash) {
    return new this.Request('eth_getTransactionReceipt', [hash])
  }

  getUncleByBlockHashAndIndex (hash, pos) {
    return new this.Request('eth_getUncleByBlockHashAndIndex', [hash, pos])
  }

  getUncleByBlockNumberAndIndex (n, pos) {
    return new this.Request('eth_getUncleByBlockNumberAndIndex', [n, pos])
  }

  getUncleCountByBlockHash (hash) {
    return new this.Request('eth_getUncleCountByBlockHash', [hash])
  }

  getUncleCountByBlockNumber (hash) {
    return new this.Request('eth_getUncleCountByBlockNumber', [hash])
  }

  getWork () {
    return new this.Request('eth_getWork', [])
  }

  hashrate () {
    return new this.Request('eth_hashrate', [])
  }

  mining () {
    return new this.Request('eth_mining', [])
  }

  newBlockFilter () {
    return new this.Request('eth_newBlockFilter', [])
  }

  newFilter (obj) {
    return new this.Request('eth_newFilter', [obj])
  }

  newPendingTransactionFilter () {
    return new this.Request('eth_newPendingTransactionFilter', [])
  }

  protocolVersion () {
    return new this.Request('eth_protocolVersion', [])
  }

  sendRawTransaction (data) {
    return new this.Request('eth_sendRawTransaction', [data])
  }

  sendTransaction (data) {
    return new this.Request('eth_sendTransaction', [data])
  }

  sign (addr, data) {
    return new this.Request('eth_sign', [addr, data])
  }

  signTransaction (obj) {
    return new this.Request('eth_signTransaction', [obj])
  }

  submitHashrate (a, b) {
    return new this.Request('eth_submitHashrate', [a, b])
  }

  submitWork (a, b, c) {
    return new this.Request('eth_submitWork', [a, b, c])
  }

  syncing () {
    return new this.Request('eth_syncing', [])
  }

  uninstallFilter () {
    return new this.Request('eth_uninstallFilter', [])
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
