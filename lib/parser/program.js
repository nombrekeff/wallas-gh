const probot = require('probot')
const WEvent = require('./event')
const WVar = require('./var')

class Program {
  /**
   * @param {probot.Application} robot 
   */
  constructor(robot) {
    this.robot = robot
    this._events =/** @type {WEvent[]} */[]
    this._vars = {}
  }

  registerEvent(name, data) {
    this._events.push(
      new WEvent(name, data)
    )
  }

  registerVar(name, data) {
    this._vars[name] = new WVar(name, data)
  }

  start() {
    for (let evt of this._events) {
      let ghEvt = WEvent.getGHEvent(evt.name)
      this.robot.log('Listening for: ' + ghEvt)
      this.robot.on(ghEvt, (context) => {
        this.robot.log('Received ' + ghEvt)
        evt.process(context, this.robot, this._vars)
      })
    }
  }



  static isVariable(prop) {

  }
}

module.exports = Program;