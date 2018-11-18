class Check {

  /**
   * 
   * @param {any} args 
   * @param {string} name 
   * @param {function} fn 
   */
  constructor(args, name, fn) {
    this.args = args
    this.name = name
    this.fn = fn
  }

  /**
   * @param {probot.Application} robot 
   * @param {probot.Context} context 
   */
  test(robot, context) {
    return this.fn(context, this.args, robot)
  }
}


const checks = {
  _checks: {},
  register(name, fn) {
    this._checks[name] = fn
  },
  get(args, name) {
    return new Check(args, name, this._checks[name])
  }
}

/**
 * check for branch name 
 */
checks.register('branch',
  ({ payload }, branch) => payload.ref === `refs/head/${branch}`)

/**
 * check ref
 */
checks.register('ref',
  ({ payload }, ref) => payload.ref.includes(ref))

module.exports = {
  Check,
  ...checks
}


