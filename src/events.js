const actions = require('./actions')
const checks = require('./checks')

class Event {
  constructor(name, args, fn) {
    this.name = name
    this.fn = fn
    this.meta = this.fn.meta

    this.event_name = null
    // this.props = {}
    this.actions = []
    this.checks = []

    this.processArgs(args)
  }

  processArgs(args) {
    let props = this.meta.props
    this.event_name = this.meta.github_event
    console.log("args: ", args)

    for (let key in args) {
      let propMeta = props[key]
      let argsProp = args[key]
      // console.log("\nKey: ", key)
      // console.log("propMeta: ", propMeta)
      // console.log("argsProp: ", argsProp)

      switch (propMeta) {
        case 'check':
          for (let check of argsProp) {
            let key = Object.getOwnPropertyNames(check).shift()
            this.checks.push(checks.get(check[key], key))
          };
          break
        case 'action':
          for (let act of argsProp) {
            let key = Object.getOwnPropertyNames(act).shift()
            this.actions.push(actions.get(act[key], key))
          };
          break
      }
    }

    console.log('act: ', this.actions);
    console.log('chk: ', this.checks);
    // console.log('prp: ', this.props);
  }

  _getActionFactory() {
    return async (context) => {
      // Perform actions and cheks
    }
  }

  /**
   * @param {probot.Context} context 
   */
  setup(robot) {
    robot.log('Setting up event: ' + this.event_name)
    robot.on(this.event_name, this._getActionFactory())
  }
}

module.exports = (function () {
  const onPushTo = async (context) => {

  }
  onPushTo.meta = {
    github_event: 'push',
    props: {
      check: 'check',
      do: 'action'
    }
  }

  const events = {
    names: [
      'on_push_to'
    ],
    map: { on_push_to: onPushTo }
  }

  events.get = (name, args) => {
    if (events.names.includes(name)) {
      return new Event(name, args, events.map[name])
    }
  }

  return events
})()



