'use strict';

var Table = require('cli-table');
var moment = require('moment');
var controller = require('../controller');

exports.index = function commandHistory(args, options) {
  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  controller.get(app + '/history', function(err, result) {

    var table = new Table({
      head: ['Date', 'Image', 'Instances'],
      style: {head: ['cyan']}
    });

    result.history.forEach(function(deploy) {
      var date = moment.unix(deploy.timestamp).format();
      table.push([date, deploy.image, deploy.count]);
    });

    console.log(table.toString());

  });
};
