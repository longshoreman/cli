'use strict';

var controller = require('../controller');

exports.index = function commandDeploy(args, options) {
  var app = options.app;
  var imageName = args.shift();

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  if (!imageName) {
    console.error('Missing image name');
    process.exit(1);
  }

  controller.post(app + '/deploy', {image: imageName}, function(err, result) {
    console.log(result);
  });
};
