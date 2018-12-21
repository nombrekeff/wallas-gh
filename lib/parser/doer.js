const WPEBase = require('./base')
const github = require('../github')

class WDoer extends WPEBase {
  constructor(name, args, fn) {
    super(name, args)
    this.fn = fn
  }

  perform(context, robot) {
    robot.log('Performing: ' + this.name, this._args)
    return this.fn(this._args, context)
  }

  /**
   * 
   * @param {array} doers 
   */
  static get(doers) {
    let _doers = []
    for (let doer of doers) {
      let name = Object.keys(doer).pop()
      let args = doer[name]
      console.log('name: ', name)
      console.log('args: ', args)
      _doers.push(WDoer[name](args))
    }
    return _doers
  }

}

WDoer.create = args_ =>
  new WDoer('create', args_,
    (args, context) => {
      if (args.what === 'label') github.labels.create(context, args)
      if (args.what === 'issue') github.issues.create(context, args)
      if (args.what === 'tag') github.tag.create(context, args)
    })

module.exports = WDoer