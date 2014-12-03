'use strict';

var Table      = require('cli-table');
var controller = require('../controller');

exports.index = function commandDescribe(args, options) {

  controller.get('describe', function(err, result) {

    var rows = [];
    var head = ['Name', 'Image', 'Instances'];
    var desc = result.description;
    Object.keys(desc).sort().forEach(function(app) {
      rows.push([app, desc[app].image || '', desc[app].instances.length]);
    });

    if (options.csv) {
      console.log(head.join(','));
      rows.forEach(function(row) {
        console.log(row.join(','));
      });
    } else {
      var table = new Table({
        head: head,
        style: {head: ['cyan']}
      });

      rows.forEach(function(row) {
        table.push(row);
      });

      console.log(table.toString());
    }

  });
};
