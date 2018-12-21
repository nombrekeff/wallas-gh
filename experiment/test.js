const wparser = require('../lib/parser')

const YAML = require('yaml')
const fs = require('fs')
const robot = {
  log: console.log,
  pubs: {},
  on(evt, fn) {
    this.log('on: ' + evt);
    this.pubs[evt] = fn
  },
  emit(evt, data) {
    this.pubs[evt](data)
  }
}

const file = fs.readFileSync('./experiment/test-yaml.yml', 'utf8')
let config = YAML.parse(file)
let app = wparser.parse(config, robot, {})
app.start()

setTimeout(() => {
  robot.emit('push', {})
}, 5000)