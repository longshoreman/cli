'use strict';

var fs        = require('fs');
var parseArgs = require('minimist');
var path      = require('path');
var config    = require('./config');

function displayHelp() {
  var programName = process.argv[1].split('/').pop();
  console.log('usage: ' + programName + ' init -- Interactive configuration');
  console.log('       ' + programName + ' apps -- Lists applications');
  console.log('       ' + programName + ' --app <app-name> instances -- Lists all instances of an application');
  console.log('       ' + programName + ' --app <app-name> deploy <image-name> -- Deploys an image to the application');
  console.log('       ' + programName + ' --app <app-name> envs -- Displays all environment variables');
  console.log('       ' + programName + ' --app <app-name> envs:set <ENV=var> ... -- Sets environment(s) variable(s)');
  console.log('       ' + programName + ' --app <app-name> envs:rm <ENV> ... -- Removes environment(s) variable(s)');
}

exports.run = function() {
  config.load();

  var argv = parseArgs(process.argv.slice(2));

  if (argv.h || argv.help) {
    displayHelp();
    process.exit(1);
  }

  var args = argv._;
  var commands = args.shift().split(':');
  var command = commands[0];
  var subcommand = commands[1] || 'index';

  delete(argv._);

  var commandFile = path.join(__dirname, 'commands', command + '.js');
  if (!fs.existsSync(commandFile)) {
    console.error('Unknown command');
    process.exit(1);
  }

  var reqCommand = require(commandFile);
  reqCommand[subcommand](args, argv);
};
