class Action {
  constructor(args, name, fn) {
    this.args = args
    this.name = name
    this.fn = fn

    // console.log("\nAction args: ", args)
    // console.log("Action name: ", name)
    // console.log("Action fn  : ", fn)
  }
}


const actions = {
  _actions: {},
  register(name, fn) {
    this._actions[name] = fn
  },
  get(args, name) {
    return new Action(args, name, this._actions[name]);
  }
}

actions.register('version', async () => {

})

actions.register('create', async () => {

})


module.exports = {
  Action,
  ...actions
}

