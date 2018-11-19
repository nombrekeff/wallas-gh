const probot = require('probot')
const WAction = require('./action')
const WEvent = require('./event')
const WFilter = require('./filter')

class Program {
  /**
   * @param {probot.Application} robot 
   */
  constructor(robot, context) {
    this.robot = robot
    this.context = context


    this._events =/** @type {WEvent[]} */[]
  }

  addEvent(name, data) {
    this._events.push(
      new WEvent(name, data)
    )
  }

  start() {
    for (let evt of this._events) {
      this.robot.log('Listening for: ' + evt.getGHEvent())
      this.robot.on(evt.getGHEvent(), (context) => {
        this.robot.log('Received ' + evt.getGHEvent())
        evt.dispatch(context)
      })
    }
  }
}

module.exports = Program;