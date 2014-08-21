'use strict';

var controller = require('../controller');
var Table      = require('cli-table');

exports.index = function commandDescribe(args, options) {
  controller.get('describe', function(err, result) {
    var table = new Table({
      head: ['Name', 'Image', 'Instances', 'ENVs'],
      style: {head: ['cyan']}
    });

    var desc = result.description;
    Object.keys(desc).forEach(function(app) {
      var envs = desc[app].envs.join('\n');
      table.push([app, desc[app].image, desc[app].instances.length, envs]);
    });

    console.log(table.toString());
  });
};
