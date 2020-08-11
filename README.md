# nanoeth

Tiny RPC module to request methods on an ETH node

``` sh
npm install nanoeth
```

## Usage

``` js
const NanoETH = require('nanoeth/ipc')

// pass in the ipc socket path
const eth = new NanoETH('/tmp/parity.sock')

// call methods
await eth.blockNumber()

// to close the underlying socket/rpc when all
// current requests are done do
await eth.end()
```

For a list of supported methods see https://wiki.parity.io/JSONRPC-eth-module.html

If you are using Parity you can also use the pubsub module, to subscribe to
changes:

```js
const unsubscribe = await eth.subscribe(eth.getBlockByNumber('latest', false), function (err, block) {
  if (err) return
  if (parseInt(block.timestamp) > Date.now() - 1000 * 60) return unsubscribe()

  console.log(block)
})
```

## RPC providers

The following RPC providers are included

* `nanoeth/metamask`
* `nanoeth/ipc`
* `nanoeth/ws`
* `nanoeth/http`

## API

### `const unlisten = await subscribe(req, listener)`

Create a new pubsub subscription to a "Request". Requests are other method calls
that have not yet been awaited. `subscribe` resolves once the subscription has
been confirmed by the node. `unlisten` is a method that can be called to
unsubscribe. `listener` is called with `(err, data)`.

### `await eth.end()`

End the client gracefully

### `await eth.destroy()`

End the client forcefully

### `const bool = eth.destroyed`

Flag whether the client has been destroyed

### `const accounts = await eth.accounts()`

### `const height = await eth.blockNumber()`

### `const data = await eth.call(obj, [from])`

### `const id = await eth.chainId()`

### `const addr = await eth.coinbase()`

### `const gas = await eth.estimateGas(obj, [from])`

### `const price = await eth.gasPrice()`

### `const balance = await eth.getBalance(addr, [from])`

### `const block = await eth.getBlockByHash(hash, [tx = false])`

### `const block = await eth.getBlockByNumber(n, [tx = false])`

### `const count = await eth.getBlockTransactionCountByHash(hash)`

### `const count = await eth.getBlockTransactionCountByNumber(n)`

### `const code = await eth.getCode(addr, [from])`

### `const changes = await eth.getFilterChanges(id)`

### `const logs = await eth.getFilterLogs(id)`

### `const logs = await eth.getLogs(obj)`

### `const bytes = await eth.getStorageAt(addr, pos, [from])`

### `const tx = await eth.getTransactionByBlockHashAndIndex(hash, pos)`

### `const tx = await eth.getTransactionByBlockNumberAndIndex(hash, pos)`

### `const tx = await eth.getTransactionByHash(hash)`

### `const count = await eth.getTransactionCount(addr, [from])`

### `const receipt = await eth.getTransactionReceipt(hash)`

### `const block = await eth.getUncleByBlockHashAndIndex(hash, pos)`

### `const block = await eth.getUncleByBlockNumberAndIndex(n, pos)`

### `const count = await eth.getUncleCountByBlockHash(hash)`

### `const count = await eth.getUncleCountByBlockNumber(hash)`

### `const work = await eth.getWork()`

### `const rate = await eth.hashrate()`

### `const bool = await eth.mining()`

### `const id = await eth.newBlockFilter()`

### `const id = await eth.newFilter(obj)`

### `const id = await eth.newPendingTransactionFilter()`

### `const version = await eth.protocolVersion()`

### `const hash = await eth.sendRawTransaction(data)`

### `const hash = await eth.sendTransaction(data)`

### `const sig = await eth.sign(addr, data)`

### `const raw = await eth.signTransaction(obj)`

### `const success = await eth.submitHashrate(rate, id)`

### `const success = await eth.submitWork(nonce, pow, mix)`

### `const info = await eth.syncing()`

### `const success = await eth.uninstallFilter(id)`

## License

MIT
