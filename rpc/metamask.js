module.exports = class MetaMask {
  constructor () {
    this.enable = window.ethereum.enable()
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
            const err = new Error(err.message)
            err.code = err.code
            return reject(err)
          }
          resolve(res.result)
        })
      })
    })
  }

  destroy () {}
}
