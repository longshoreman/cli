'use strict';

var Table      = require('cli-table');
var controller = require('../controller');

exports.index = function commandDescribe(args, options) {
  controller.get('describe', function(err, result) {
    var table = new Table({
      head: ['Name', 'Image', 'Instances'],
      style: {head: ['cyan']}
    });

    var desc = result.description;
    Object.keys(desc).forEach(function(app) {
      table.push([app, desc[app].image, desc[app].instances.length]);
    });

    console.log(table.toString());
  });
};
