const WPEBase = require('./base')
const WAction = require('./action')

class WFilter extends WPEBase {
  constructor(name, args, feeder) {
    super(name, args)
    this.feeder = feeder
    this.checks = []
    this.actions = []
    this.value = null
    this.processArgs(args)
  }

  /**
   * @param {*} args 
   */
  processArgs(args) {
    this.checks = []

    // Checks
    if (args.is) {
      console.log('args.is', args.is)
      this.checks.push({
        checker: this.is.bind(this, args.is)
      })
    } else if (args.has) {
      this.checks.push({
        checker: this.has.bind(this, args.has)
      })
    } else if (args.one_of) {
      this.checks.push({
        checker: this.oneOf.bind(this, args.one_of)
      })
    }

    // Actions
    if (args.do) {
      console.log('args.do', args.do)
      this.actions = WAction.get(args.do)
      console.log('this.actions', this.actions)
    } else {
      this.actions = []
    }
  }


  /**
   * @param {probot.Context} context 
   */
  feed(context) {
    // feed the context through the checks
    // is they pass proceed to execute action

    this.value = this.feeder(context)

    for (let check of this.checks) {
      if (!check.checker()) return
    }

    for (let action of this.actions) {
      action.perform(context)
    }
  }

  /**
   * 
   * @param {object|Array} args 
   */
  is(args) {
    console.log('args: ', args)
    console.log('value: ', this.value)
    if (typeof args === 'string') {
      return this.value === args
    }
    else if (args.constructor === Array) {
      for (let a of args) {
        if (a !== this.value) return false
      }
    }
    return true
  }

  has(args) { }

  oneOf(args) { }

  /**
   * 
   * @param {string} name 
   * @param {any} args 
   */
  static get(name, args) {
    return WFilter[name](args)
  }
}

WFilter.branch = args =>
  new WFilter('branch', args,
    (context) => context.payload.ref.split('/').pop())

WFilter.tag = args =>
  new WFilter('tag', args,
    (context) => context.payload.ref)

WFilter.owner = args =>
  new WFilter('owner', args,
    (context) => context.repository.owner.login)


module.exports = WFilter