'use strict';

var controller = require('../controller');

exports.index = function commandDeploy(args, options) {
  var app = options.app;
  var imageName = args.shift();
  var count = 2;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  if (options.count) {
    count = options.count;
  }

  if (!imageName) {
    console.error('Missing image name');
    process.exit(1);
  }

  controller.post(app + '/deploy', {
    image: imageName,
    count: count,
  }, function(err, result) {
    console.log("You're good!");
  });
};
