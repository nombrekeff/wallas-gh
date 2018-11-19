const probot = require('probot');
const wallas = require('../lib/wallas')

const YAML = require('yaml');
const fs = require('fs');


const file = fs.readFileSync('C:\\Users\\keff\\Desktop\\cosas\\Dev\\LibsJS\\dummy-repo\\.github\\better-issues.yml', 'utf8');
let cfig = YAML.parse(file);

let prog = wallas({
  log: console.log,
  on(evt) {
    this.log('on: ' + evt);
  }
}, {}, cfig);