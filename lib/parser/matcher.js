const WPEBase = require('./base')

class WMatcher extends WPEBase {
  constructor(name, args, feeder) {
    super(name, args)
    this.feeder = feeder
    this.processArgs(args)
  }

  /**
   * @param {*} args 
   */
  processArgs(args) {

  }

  check(context) {
    return this.feeder(context)
  }

  /**
   * 
   * @param {string} name 
   * @param {any} args 
   */
  static get(name, args) {
    return WMatcher[name](args)
  }
}

WMatcher.branch = args =>
  new WMatcher('branch', args,
    (context) => context.payload.ref.split('/').pop())

WMatcher.tag = args =>
  new WMatcher('tag', args,
    (context) => context.payload.ref)

WMatcher.owner = args =>
  new WMatcher('owner', args,
    (context) => context.repository.owner.login)


module.exports = WMatcher