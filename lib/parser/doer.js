const WPEBase = require('./base')
const github = require('../github')

class WDoer extends WPEBase {
  constructor(name, args, fn) {
    super(name, args)
    this.fn = fn
  }

  perform(context, robot, vars) {
    robot.log('Performing: ' + this.name, this._args)
    return this.fn(this._args, context, vars)
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
    (args, context, vars) => {
      if (args.what === 'label') github.labels.create(context, args, vars)
      if (args.what === 'issue') github.issues.create(context, args, vars)
      if (args.what === 'comment') github.comments.create(context, args, vars)
      if (args.what === 'tag') github.tag.create(context, args, vars)
    })
WDoer.edit = args_ =>
  new WDoer('edit', args_,
    (args, context, vars) => {
      if (args.what === 'label') github.labels.edit(context, args, vars)
      if (args.what === 'issue') github.issues.edit(context, args, vars)
      if (args.what === 'comment') github.comments.edit(context, args, vars)
      if (args.what === 'tag') github.tag.edit(context, args, vars)
    })
WDoer.add = args_ =>
  new WDoer('add', args_,
    (args, context, vars) => {
      if (args.labels) github.issues.addLabels(context, args, vars)
    })
module.exports = WDoer