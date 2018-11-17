class Check {
  constructor(args, name, fn) {
    this.args = args
    this.name = name
    this.fn = fn
  }
}


const checks = {
  _checks: {},
  register(name, fn) {
    this._checks[name] = fn
  },
  get(args, name) {
    return new Check(args, name, this._checks[name]);
  }
}

checks.register('branch', async () => {

})

module.exports = {
  Check,
  ...checks
}


