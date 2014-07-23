'use strict';

var fs        = require('fs');
var parseArgs = require('minimist');
var colors    = require('colors');
var _         = require('lodash');
var path      = require('path');
var config    = require('./config');

function displayHelp() {
  var name = process.argv[1].split('/').pop();

  console.log('Usage: ' + name + ' [COMMAND] [--app APP] [command-specific-options]');

  var commands = {
    init:        'Interactive configuration',
    apps:        'List all applications',
    'apps:add':  'Add a new application',
    'apps:rm':   'Remove an application',
    hosts:       'List all hosts in the cluster',
    'hosts:add': 'Add a host to the cluster',
    'hosts:rm':  'Remove a host from the cluster',
    instances:   'List all instances of an application on the cluster',
    deploy:      'Deploy an image to the application',
    envs:        'Displays all environmental variables for an application',
    'envs:set':  'Sets an environmental variable for an application',
    'envs:rm':   'Removes a variable from the application',
    'logs':      'Display log entries for an application',
    'kill':      'Terminate all application instances',
  }

  console.log("\nCommands:");
  _(commands).keys().each(function(key) {
    console.log((key + ": ").grey + commands[key]);
  });
}

function shouldDisplayHelp(argv) {
  return argv.h || argv.help || argv._.length < 1 || _.contains(argv._, 'help');
}

exports.run = function() {

  var argv = parseArgs(process.argv.slice(2));

  if (shouldDisplayHelp(argv)) {
    displayHelp();
    process.exit(1);
  }

  var configLoaded = config.load();
  var args = argv._;
  var commands = args.shift().split(':');
  var command = commands[0];
  var subcommand = commands[1] || 'index';

  if (!configLoaded && command !== 'init') {
    console.log('Please run the init command before continuing');
    process.exit(1);
  }

  delete(argv._);

  var commandFile = path.join(__dirname, 'commands', command + '.js');
  if (!fs.existsSync(commandFile)) {
    console.error('Unknown command\n');
    displayHelp();
    process.exit(1);
  }

  var reqCommand = require(commandFile);
  if (!_.isFunction(reqCommand[subcommand])) {
    console.error('Unknown command\n');
    displayHelp();
    process.exit(1);
  }
  reqCommand[subcommand](args, argv);
};
