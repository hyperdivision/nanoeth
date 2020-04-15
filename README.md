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

## RPC providers

The following RPC providers are included

* `nanoeth/metamask`
* `nanoeth/ipc`
* `nanoeth/ws`

## License

MIT
