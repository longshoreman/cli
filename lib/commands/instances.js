'use strict';

var colors = require('colors');
var controller = require('../controller');

exports.index = function commandInstances(args, options) {
  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  controller.get(app + '/instances', function(err, result) {
    result.instances.sort().forEach(function(instance) {
      console.log(instance);
    });
  });
};
