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

exports.add = function commandAppsAdd(args, options) {

  console.log(arguments)

  controller.post('apps', {app: 1}, function(err, result) {
    result.apps.sort().forEach(function(app) {
      console.log(app);
    });
  });
};
