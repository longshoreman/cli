'use strict';

var controller = require('../controller');

exports.index = function commandInstances(args, options) {
  var app = options.app;

  controller.get(app + '/instances', function(err, result) {
    console.log(result);
  });
};
