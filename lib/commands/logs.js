'use strict';

var colors = require('colors');
var util = require('util');
var controller = require('../controller');

exports.index = function commandLogs(args, options) {

  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  controller.get(app + '/logs', function(err, result) {
    result.logs.forEach(function(line) {
      console.log(line);
    });
  });
};

exports.get = exports.index;
