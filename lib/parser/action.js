const WPEBase = require('./base')
const github = require('../github')

class WAction extends WPEBase {
  constructor(matchers, doer) {
    super('WAction')
    this.matchers = matchers
    this.doer = doer
  }

  passesChecks(context, robot) {
    if (!this.matchers || this.matchers.length === 0) {
      return true
    } else {
      for (let matcher of this.matchers) {
        if (!matcher.check(context, robot)) {
          return false
        }
      }
    }

    return true
  }
}

module.exports = WAction