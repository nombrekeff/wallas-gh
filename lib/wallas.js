/*
 * Wallas Main File  
 *
 * Homepage: https://wallas.com  
 * Documentation: https://wallas.com/docs
 */

// Uses probot behind the scenes
const probot = require('probot')
const wgithub = require('./github')
const wparser = require('./parser')


/**
 * @param {probot.Application} robot 
 * @param {probot.Context} context 
 * @param {object|string} config 
 */
function wallas(robot, context, config) {
  let app = wparser.parse(config, robot)
  app.start()
  return app
}
wallas.version = require('../package.json').version

/* import github module */
wallas.github = wgithub

/* import parser module */
wallas.parser = wparser


module.exports = wallas