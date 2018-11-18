const actions = require('./actions')
const checks = require('./checks')
const events = require('./events')
const Program = require('./program')
const probot = require('probot')



module.exports = class Parser {

  /**
   * 
   * @param {obejct} object 
   * @param {probot.Context} context 
   * @param {probot.Application} robot 
   */
  parse(object, robot, context) {
    const program = new Program(context, robot)

    let objEvents = Object.keys(object)
    // console.log(objEvents)


    if (objEvents.length > 0) {
      objEvents.filter(name => (name in events))
        .map(name => ({ name, args: object[name] }))
        .forEach(({ name, args }) => {
          console.log('Event ' + name + ' args: ', args)
          let event = events.get(name, args)
          program.add(event);
        });
    }
    return program;
    // Series of events 
    // Wich have either a check->action or just an action
    // console.log(events.names)
  }
}

