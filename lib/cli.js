'use strict';

var parseArgs = require('minimist');
var config = require('./config');


exports.run = function() {
  config.load();

  var argv = parseArgs(process.argv.slice(2));
  var args = argv['_'];
  var command = args.shift();

  delete(argv['_']);

  switch(command) {
  case 'init':
    require('./commands/init')(args, argv);
    break;
  case 'apps':
    require('./commands/apps')(args, argv);
    break;
  default:
    console.error('Unknown command');
  }
}
