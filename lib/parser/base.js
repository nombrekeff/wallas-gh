
/**
 * WPEBase = Wallas Parser Entity Base
 */
class WPEBase {
  constructor(name, args) {
    this._args = args
    this.name = name
    this.bounded;
  }

  /**
   * Run after initializing
   * @param {*} args 
   */
  processArgs(args) { }

  bind(obj) {
    this.bounded = obj;
  }
}

module.exports = WPEBase