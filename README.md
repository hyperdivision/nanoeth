# nanoeth

Tiny RPC module to request methods on an ETH node

``` sh
npm install nanoeth
```

## Usage

``` js
const NanoETH = require('nanoeth')

// pass in the ipc socket path
const eth = new NanoETH('/tmp/parity.sock')

// call methods
await eth.blockNumber()
```

For a list of supported methods see https://wiki.parity.io/JSONRPC-eth-module.html

## License

MIT
