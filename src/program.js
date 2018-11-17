const probot = require('probot')

class Program {

  /**
   * @param {probot.Context} context 
   * @param {probot.Application} robot 
   */
  constructor(context, robot) {
    this._events = []
    this.context = context
    this.robot = robot
  }

  add(event) {
    this._events.push(event)
  }

  remove(event) {
    let index = this._events.indexOf(event)
    if (index !== -1) return this._events.splice(index, 1)
  }

  start() {
    for (let event of this._events) {
      event.setup(this.robot, this.context)
    }
  }
}

module.exports = Program;