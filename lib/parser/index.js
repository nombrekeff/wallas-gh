
const Program = require('./program')
const WAction = require('./action')
const WEvent = require('./event')
const WFilter = require('./filter')
const probot = require('probot')


/** 
 * Wallas Parser
 *
 * Homepage: https://wallas.com  
 * Documentation: https://wallas.com/docs/parser
 */
class Parser {

  /**
   * 
   * @param {object} json 
   * @param {probot.Application} robot 
   * @param {probot.Context} context 
   * @return {Program}
   */
  static parse(object, robot, context) {
    const program = new Program(robot, context)
    let props = Object.keys(object)

    for (let prop of props) {
      let value = object[prop]
      console.log('checking prop:', prop)
      console.log('        value:', value)

      if (WEvent.exists(prop)) {
        console.log('Adding event:')
        program.addEvent(prop, value)
      }
    }


    return program
  }
}


module.exports = Parser









