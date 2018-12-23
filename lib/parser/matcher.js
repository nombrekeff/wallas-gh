const WPEBase = require('./base')
const varRegExp = /<([\w\d_$]+)>/g;

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

  check(context, robot, vars) {
    let m = this._args.match(varRegExp)
    console.log('match: ', m)
    if (m && m.length) {
      let vname = m[0].replace('<', '').replace('>', '');
      console.log(vname, vars);
      if (vars[vname]) {
        this._args = vars[vname]._args
      }
    }
    console.log('match: ', this._args)

    // robot.log('Payload: ', context.payload)
    return this.feeder(context, this._args)
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
    (context, val) => context.payload.ref.split('/').pop() === val)

WMatcher.tag = args =>
  new WMatcher('tag', args,
    (context, val) => context.payload.ref === val)

WMatcher.owner = args =>
  new WMatcher('owner', args,
    (context, val) => context.repository.owner.login === val)

WMatcher.action = args =>
  new WMatcher('action', args,
    (context, val) => new RegExp(val, 'gi').test(context.payload.action))

WMatcher.sender = args =>
  new WMatcher('sender', args,
    (context, val) => context.payload.sender.login === val)

// For issues
WMatcher.body = args =>
  new WMatcher('body', args,
    (context, val) => {
      return new RegExp(val, 'gi').test(context.payload.issue.body)
    })


module.exports = WMatcher