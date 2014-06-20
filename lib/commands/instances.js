'use strict';

var controller = require('../controller');

module.exports = function commandInstances(args, options) {
  var app = options.app;

  controller.get(app + '/instances', function(err, result) {
    console.log(result);
  });
};
