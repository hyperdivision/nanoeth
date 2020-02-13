const net = require('net')

module.exports = class RPC {
  constructor (socket) {
    this.id = 0
    this.inflight = new Map()
    this.socket = typeof socket === 'string' ? net.connect(socket) : socket
    this.socket.unref()

    let buf = ''
    const self = this

    this.socket.setEncoding('utf-8')
    this.socket.on('data', ondata)
    this.socket.on('error', this.socket.destroy)
    this.socket.on('close', onclose)

    function onclose () {
      self.socket = null
      for (const [resolve, reject] of self.inflight.values()) {
        reject(new Error('Socket destroyed'))
      }
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
      if (self.inflight.size === 0) self.socket.unref()

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

  request (method, params) {
    if (!this.socket) return Promise.reject(new Error('Socket destroyed'))

    const id = '' + ++this.id
    const obj = { jsonrpc: '2.0', id, method, params }

    return new Promise((resolve, reject) => {
      this.inflight.set(id, [resolve, reject])
      if (this.inflight.size === 1) this.socket.ref()
      this.socket.write(JSON.stringify(obj) + '\n')
    })
  }

  destroy () {
    this.socket.destroy()
  }
}
