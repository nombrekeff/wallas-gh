const WPEBase = require('./base')
const github = require('../github')

class WAction extends WPEBase {
  constructor(name, args, fn) {
    super(name, args)
    this.fn = fn
  }

  perform(context) {
    console.log('Performing: ' + this.name, this._args)
    // console.log('fn: ' + this.fn)
    return this.fn(this._args, context)
  }

  /**
   * 
   * @param {array} actions 
   */
  static get(actions) {
    let _returnActions = []
    for (let action of actions) {
      let name = Object.keys(action).pop()
      _returnActions.push(WAction[name](action[name]))
    }
    return _returnActions
  }

}

WAction.create = __args =>
  new WAction('create', __args,
    (args, context) => {
      if (args.what === 'label') github.labels.create(context, args)
      if (args.what === 'issue') github.issues.create(context, args)
      if (args.what === 'tag') github.tag.create(context, args)
    })

module.exports = WAction