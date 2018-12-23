
// For more information on building apps:
// https://probot.github.io/docs/
const probot = require('probot')
const getConfig = require('probot-config')
const wallas = require('./lib/wallas')

/**
 * @param {probot.Application} robot 
 */
const main = async (robot) => {
  let prog
  console.log("Up and runnning...");
  robot.on('push', async (context /**@type {probot.Context}*/) => {
    const payload = context.payload
    const config = await getConfig(context, 'wallas.yml')
    robot.log(payload.commits)

    const settingsModified = payload.commits.find(commit => {
      return commit.added.includes('.github/wallas.yml') ||
        commit.modified.includes('.github/wallas.yml')
    })
    robot.log('Modified: ' + settingsModified)

    
    if (settingsModified) {
      delete prog
      prog = wallas(robot, context, config)
    } else if (prog) { }
  })
}


module.exports = main