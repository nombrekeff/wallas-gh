
// For more information on building apps:
// https://probot.github.io/docs/
const probot = require('probot');
const getConfig = require('probot-config')

// To get your app running against GitHub, see:
// https://probot.github.io/docs/development/
// const octokit = require('octokit');

// Lib
const actions = require('./actions')
const check = require('./check')
const events = require('./events')


/**
 * @param {probot.Application} robot 
 */
const main = (robot) => {
  const config = await getConfig(context, 'better-issues.yml')
  robot.log(config)
}


module.exports = main