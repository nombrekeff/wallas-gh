const WPEBase = require('./base')
const github = require('../github')

class WAction extends WPEBase {
  constructor(matchers, doer) {
    super('WAction')
    this.matchers = matchers
    this.doer = doer
  }

  passesChecks(context, robot, vars) {
    if (!this.matchers || this.matchers.length === 0) {
      return true
    } else {
      for (let matcher of this.matchers) {
        if (!matcher.check(context, robot, vars)) {
          return false
        }
      }
    }

    return true
  }

  run(context, robot, vars) {
    console.log(this.doer);
    robot.log('Performing action: ', this.doer)
    this.doer.forEach(doer =>
      doer.perform(context, robot, vars)
    )
  }
}

module.exports = WAction