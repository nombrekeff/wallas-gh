const YAML = require('yaml');
const fs = require('fs');


const file = fs.readFileSync('./test/tests.yml', 'utf8');
let cfig = YAML.parse(file);
console.log(file);
console.log(JSON.stringify(cfig, null, 2));