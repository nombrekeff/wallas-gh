const actions = require('./actions')
const checks = require('./checks')

class Event {
  constructor(name, args, opts) {
    this.name = name
    this.opts = opts
    this.meta = this.opts.meta

    this.event_name = null
    this.actions = []
    this.checks = []

    this.processArgs(args)
  }

  processArgs(args) {
    let props = this.meta.props
    this.event_name = this.meta.github_event
    console.log("args: ", args)

    for (let key in args) {
      let argsProp = args[key]
      console.log("\nKey: ", key)
      console.log("argsProp: ", argsProp)

      let actionEnt = new actions.Action(key, [], []);
      if (key === 'do') {
        if (argsProp.if) {
          for (let check of argsProp.if) {
            let key = Object.getOwnPropertyNames(check).shift()
            actionEnt.checks.push(checks.get(check[key], key))
          }
        }
        if (argsProp.this) {
          for (let action of argsProp.this) {
            let key = Object.getOwnPropertyNames(action).shift()
            actionEnt.actions.push(actions.get(action[key], key))
          }
        }

        if (argsProp.length) {
          for (let action of argsProp) {
            let key = Object.getOwnPropertyNames(action).shift()
            actionEnt.actions.push(actions.get(action[key], key))
          }
        }
      }
      this.actions.push(actionEnt)
      console.log('checks: ', actionEnt.checks);
      console.log('actions: ', actionEnt.actions);
    }

    // console.log('prp: ', this.props);
  }

  /**
   * @param {probot.Application} robot 
   * @param {probot.Context} context 
   */
  performChecks(robot, context) {
    for (let check of this.checks) {
      check.test(robot, context)
    }
  }

  /**
   * @param {probot.Application} robot 
   * @param {probot.Context} context 
   */
  performActions(robot, context) {
    for (let action of this.actions) {
      robot.log('Performing action: ', action)
      action.perform(robot, context)
    }
  }

  /**
   * @param {probot.Application} robot 
   */
  _getActionFactory(robot) {
    return async (context) => {
      // Perform actions and checks
      let check = this.performChecks(robot, context)
      if (check && check.error) {
        robot.log.error(check.error)
      } else {
        this.performActions(robot, context)
      }
    }
  }

  /**
   * @param {probot.Application} robot 
   */
  setup(robot) {
    robot.log('Setting up event: ' + this.event_name)
    robot.on(this.event_name, this._getActionFactory(robot))
  }
}

module.exports = (function () {
  const onPushTo = {
    meta: {
      github_event: 'push',
      props: {
        do: 'action'
      },
      defaults: {}
    }
  }

  const onTag = {
    meta: {
      github_event: 'create',
      props: {
        do: 'action'
      },
      defaults: {
        check: [
          { ref: 'ref/tags' }
        ]
      }
    }
  }

  const events = {
    on_push_to: onPushTo,
    on_tag: onTag,
  }

  /**
   * @param {string} name
   * @return {object}
   */
  events.getDefault = (name) => {
    return events[name].meta ? events[name].meta.defaults : {}
  }

  events.get = (name, args) => {
    if (name in events) {
      let defArgs = events.getDefault(name)
      // console.log(name)
      // console.log(defArgs)
      // console.log(args)

      args = Object.assign(defArgs, args)
      // console.log(args)

      return new Event(name, args, events[name])
    }
  }

  return events
})()



