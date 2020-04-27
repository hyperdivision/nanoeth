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
const unsubscribe = await eth.subscribe(eth.getBlockByNumber('latest', false), function (block) {
  if (parseInt(block.timestamp) > Date.now() - 1000 * 60) return unsubscribe()

  console.log(block)
})
```

## RPC providers

The following RPC providers are included

* `nanoeth/metamask`
* `nanoeth/ipc`
* `nanoeth/ws`

## License

MIT
