'use strict';

var controller = require('../controller');

exports.index = function commandDeploy(args, options) {
  var app = options.app;
  var imageName = args.shift();

  controller.post(app + '/deploy', {image: imageName}, function(err, result) {
    console.log(result);
  });
};
