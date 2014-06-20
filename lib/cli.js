'use strict';

var fs        = require('fs');
var parseArgs = require('minimist');
var path      = require('path');
var config    = require('./config');


exports.run = function() {
  config.load();

  var argv = parseArgs(process.argv.slice(2));
  var args = argv['_'];
  var commands = args.shift().split(':');
  var command = commands[0];
  var subcommand = commands[1];

  delete(argv['_']);

  var commandFile = path.join(__dirname, 'commands', command + '.js');
  if (!fs.existsSync(commandFile)) {
    console.error('Unknown command');
    process.exit(1);
  }

  var reqCommand = require(commandFile);

  if (subcommand) {
    reqCommand[subcommand](args, argv);
  } else {
    reqCommand(args, argv);
  }
}
