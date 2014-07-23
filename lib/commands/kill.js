'use strict';

var colors = require('colors');
var util = require('util');
var controller = require('../controller');

exports.index = function commandKill(args, options) {

  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  controller.get(app + '/kill', function(err, result) {
    console.log('All app instances killed');
  });
};

exports.get = exports.index;
