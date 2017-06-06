var fs = require('fs');

var babelrc = fs.readFileSync(__dirname + '/.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
  config.ignore = function ignoreFn(filename) {
    if (/node_module/.test(filename)) return true;
    return false;
  }
} catch (error) {
  console.log('): ==> ERROR: Error parsing your .babelrc');
  console.error(error);
}

require('babel-register')(config);