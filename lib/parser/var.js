const WPEBase = require('./base')

class WVar extends WPEBase {
  constructor(name, args, fn) {
    super(name, args)
    this.fn = fn
  }
}

module.exports = WVar