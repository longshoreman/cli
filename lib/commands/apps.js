'use strict';

var util       = require('util');
var controller = require('../controller');

exports.index = function commandApps(args, options) {
  controller.get('apps', function(err, result) {
    result.apps.sort().forEach(function(app) {
      console.log(app);
    });
  });
};

exports.get = exports.index;

exports.add = function commandAppsAdd(args, options) {
  if (!args[0]) {
    console.log('Application name is required');
    process.exit(1);
  }

  var app = args[0];

  controller.post('apps', {app: app}, function(err, result) {
    console.log(app + ' added');
  });
};

exports.rm = function commandAppsRm(args, options) {

  if (!args[0]) {
    console.log('Application name is required');
    process.exit(1);
  }

  var app = args[0];

  controller.del('apps/' + app, function(err, result) {
    console.log(app + ' removed');
  });
};
