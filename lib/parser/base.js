
/**
 * WPEBase = Wallas Parser Entity Base
 */
class WPEBase {
  constructor(name, args) {
    this.name = name
    this.bounded
    this._args = args
  }

  /**
   * Run after initializing
   * @param {*} args 
   */
  processArgs(args) { }

  bind(obj) {
    this.bounded = obj
  }
}

module.exports = WPEBase