const probot = require('probot');
const parser = new (require('../src/parser'))()

const YAML = require('yaml');
const fs = require('fs');


const file = fs.readFileSync('./.github/better-issues.yml', 'utf8');
let cfig = YAML.parse(file);

let prog = parser.parse(cfig, {
  log: console.log,
  on(evt) {
    this.log('on: ' + evt);
  }
}, {});


console.log(prog);
prog.start();