
// For more information on building apps:
// https://probot.github.io/docs/
const probot = require('probot')
const getConfig = require('probot-config')

// To get your app running against GitHub, see:
// https://probot.github.io/docs/development/
const octokit = require('@octokit/rest')()

const parser = new (require('./parser.js'))()
const Settings = require('./settings.js')


/**
 * @param {probot.Application} robot 
 */
const main = async (robot) => {
  robot.on('push', async (context/**@type {probot.Context}*/) => {

    const payload = context.payload
    const config = await getConfig(context, 'better-issues.yml')
    robot.log(config)

    const settingsModified = payload.commits.find(commit => {
      return commit.added.includes(Settings.FILE_NAME) ||
        commit.modified.includes(Settings.FILE_NAME)
    })

    if (settingsModified) {
      robot.log('Settings modified, res-parsing')
      let prog = parser.parse(config, robot, context)
      prog.start()
    }
  })
}


module.exports = main