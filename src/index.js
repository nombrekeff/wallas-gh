
// For more information on building apps:
// https://probot.github.io/docs/
const probot = require('probot')
const getConfig = require('probot-config')
const parser = new (require('./parser.js'))()

/**
 * @param {probot.Application} robot 
 */
const main = async (robot) => {
  let prog;
  robot.on('push', async (context /**@type {probot.Context}*/) => {

    const payload = context.payload
    const config = await getConfig(context, 'better-issues.yml')
    robot.log(config)

    const settingsModified = payload.commits.find(commit => {
      return commit.added.includes('better-issue.yml') ||
        commit.modified.includes('better-issue.yml')
    })

    if (true || settingsModified) {
      robot.log('Settings modified, res-parsing')
      prog = parser.parse(config, robot, context)
      prog.start()
    } else if (prog) { }
  })
}


module.exports = main