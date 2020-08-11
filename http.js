const ETH = require('./')
const got = require('got')
module.exports = class HTTP extends ETH {
  constructor (endpoint) {
    super(new RPC(endpoint))
  }
}

class RPC {
  constructor (endpoint) {
    this.endpoint = endpoint
    this.destroyed = false
  }

  async request (method, params) {
    const res = await got.post({
      url: this.endpoint,
      json: {
        jsonrpc: '2.0',
        method,
        params,
        id: 1
      },
      responseType: 'json'
    })

    if (res.body.error) {
      const error = new Error(res.body.error.message)
      error.code = res.body.error.code
      throw error
    }

    return res.body.result
  }

  subscribe () {
    throw new Error('HTTP does not support pubsub')
  }

  destroy () {}
}
