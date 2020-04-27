const ETH = require('./')

module.exports = class Metamask extends ETH {
  constructor () {
    super(new RPC())
  }
}

class RPC {
  constructor () {
    this.enable = window.ethereum.enable()
    this.destroyed = false
  }

  request (method, params) {
    return this.enable.then(accounts => {
      return new Promise((resolve, reject) => {
        window.ethereum.sendAsync({
          method,
          params,
          from: accounts[0]
        }, function (err, res) {
          if (err) {
            const error = new Error(err.message)
            error.code = err.code
            return reject(error)
          }
          resolve(res.result)
        })
      })
    })
  }

  subscribe () {
    throw new Error('Metamask does not support pubsub')
  }

  destroy () {}
}
