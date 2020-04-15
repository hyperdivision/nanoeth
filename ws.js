const ETH = require('./index')

module.exports = class WS extends ETH {
  constructor (socket) {
    super(new RPC(socket))
  }
}

class RPC {
  constructor (socket) {
    this.id = 0
    this.inflight = new Map()
    this.socket = socket

    const self = this

    on(this.socket, 'message', onmessage)
    on(this.socket, 'close', onclose)
    on(this.socket, 'open', onopen)

    this.destroyed = false
    this.ending = null
    this.endingResolve = null
    this.queued = []
    this.opened = false

    function onopen () {
      self.opened = true
      for (const s of self.queued) self.socket.send(s)
    }

    function onclose () {
      self.destroyed = true
      self.socket = null
      for (const [resolve, reject] of self.inflight.values()) {
        reject(new Error('WebSocket destroyed'))
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

      const p = self.inflight.get(obj.id)
      if (!p) return false

      self.inflight.delete(obj.id)
      if (self.inflight.size === 0) {
        if (self.ending) self.socket.close()
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
  }

  request (method, params) {
    if (!this.socket) return Promise.reject(new Error('Socket destroyed'))

    const id = '' + ++this.id
    const obj = { jsonrpc: '2.0', id, method, params }

    return new Promise((resolve, reject) => {
      this.inflight.set(id, [resolve, reject])

      const s = JSON.stringify(obj)
      if (!this.opened) this.queued.push(s)
      else this.socket.send(s)
    })
  }

  end () {
    this.ending = new Promise(resolve => {
      if (!this.socket) return resolve()
      this.endingResolve = resolve
      if (this.inflight.size === 0) this.socket.close()
    })

    return this.ending
  }

  destroy () {
    if (this.socket) this.socket.close()
  }
}

function on (e, name, fn) {
  if (e.on) e.on(name, fn)
  else if (e.addEventListener) e.addEventListener(name, fn)
}
