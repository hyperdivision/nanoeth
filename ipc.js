const net = require('net')
const ETH = require('./index')

module.exports = class IPC extends ETH {
  constructor (socket) {
    super(new RPC(socket))
  }
}

class RPC {
  constructor (socket) {
    this.id = 0
    this.inflight = new Map()
    this.subscriptions = new Map()
    this.socket = typeof socket === 'string' ? net.connect(socket) : socket
    this.socket.unref()

    let buf = ''
    const self = this

    this.socket.setEncoding('utf-8')
    this.socket.on('data', ondata)
    this.socket.on('error', this.socket.destroy)
    this.socket.on('close', onclose)
    this.destroyed = false

    this.ending = null
    this.endingResolve = null

    function onclose () {
      self.destroyed = true
      self.socket = null
      for (const [resolve, reject] of self.inflight.values()) {
        reject(new Error('Socket destroyed'))
      }
      if (self.endingResolve) self.endingResolve()
    }

    function onmessage (message) {
      let obj

      try {
        obj = JSON.parse(message)
      } catch (_) {
        return false
      }

      if (obj.method === 'parity_subscription') {
        const cb = self.subscriptions.get(obj.params.subscription)
        if (cb != null) {
          if (obj.params.error) {
            const err = new Error(obj.params.error.message)
            err.code = obj.params.error.code
            cb(err)
            return true
          }

          cb(null, obj.params.result)
          return true
        }
      }

      const p = self.inflight.get(obj.id)
      if (!p) return false

      self.inflight.delete(obj.id)
      if (!self.active()) {
        self.socket.unref()
        if (self.ending) self.socket.end()
      }

      if (obj.error) {
        const err = new Error(obj.error.message)
        err.code = obj.error.code
        p[1](err)
        return true
      }

      p[0](obj.result)
      return true
    }

    function ondata (data) {
      buf += data
      while (true) {
        const n = buf.indexOf('\n')
        if (n === -1) return
        if (!onmessage(buf.slice(0, n).trim())) {
          self.socket.destroy()
          return
        }
        buf = buf.slice(n + 1)
      }
    }
  }

  active () {
    return this.inflight.size > 0 || this.subscriptions.size > 0
  }

  request (method, params) {
    if (!this.socket) return Promise.reject(new Error('Socket destroyed'))

    const id = '' + ++this.id
    const obj = { jsonrpc: '2.0', id, method, params }

    return new Promise((resolve, reject) => {
      this.inflight.set(id, [resolve, reject])
      if (this.active()) this.socket.ref()
      this.socket.write(JSON.stringify(obj) + '\n')
    })
  }

  async subscribe (method, params, cb) {
    if (cb == null) return this.subscribe(method, [], params)

    const id = await this.request('parity_subscribe', [method, params])
    this.subscriptions.set(id, cb)

    return async function () {
      await this.request('parity_unsubscribe', [id])
      this.subscriptions.delete(id)
    }
  }

  end () {
    this.ending = new Promise(resolve => {
      if (!this.socket) return resolve()
      this.endingResolve = resolve
      if (!this.active()) this.socket.destroy()
    })

    return this.ending
  }

  destroy () {
    if (this.socket) this.socket.destroy()
  }
}
