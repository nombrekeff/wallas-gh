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
  check(robot, context) {
    return this.fn.apply(this, context, args, robot)
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

checks.register('branch', async (context, args, robot) => {
  robot.log('Check branch: ', args)
  robot.log('Repo: ', context.payload.repository)
})

module.exports = {
  Check,
  ...checks
}


