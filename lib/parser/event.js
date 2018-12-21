const WPEBase = require('./base')
const WMatcher = require('./matcher')
const WDoer = require('./doer')
const WAction = require('./action')

/**
 * 
 */
class WEvent extends WPEBase {
  constructor(name, args) {
    super(name, args)
    this.actions = []
    this.processArgs(args)
  }

  /**
   * @param {Array} args 
   */
  processArgs(args) {

    // check no args for event
    if (!args) {
      throw new Error('"args" is required for event ' + this.name)
    }
    // args must be an array
    if (args.constructor !== Array) {
      throw new Error('"args" for event ' + this.name + ' must be an Array')
    }

    // We got an array

    console.log('We got an array: ', args)
    for (let i = 0; i < args.length; i++) {
      let actionRaw = args[i]

      // Matcher
      let matcher = actionRaw.match
      let matcherChecks = []
      if (matcher) {
        console.log('actionRaw.match', matcher)
        for (let key in matcher) {
          let check = WMatcher.get(key, matcher[key])
          if (check) {
            console.log('  Adding check: ', key)
            matcherChecks.push(
              WMatcher.get(key, matcher[key])
            )
          }
        }
      }

      // Doer
      let doer = actionRaw.do
      console.log('actionRaw.do', doer)

      if (doer) {
        doer = WDoer.get(doer)
      }

      this.actions.push(
        new WAction(matcherChecks, doer)
      )
    }

  }

  process(context, robot) {
    // Check actions
    robot.log('procesing event: ' + this.name)
    for (let action of this.actions) {
      let passed = action.passesChecks(context, robot)
      robot.log('passed: ' + passed)

      if (passed) {
        action.run(context, robot)
      }
    }
  }

  static getGHEvent(name) {
    return WEvent.eventMap[name]
  }

  static exists(name) {
    return WEvent.eventMap[name]
  }
}

WEvent.eventMap = {
  on_push: 'push',
  on_issue: 'issues'
}


module.exports = WEvent