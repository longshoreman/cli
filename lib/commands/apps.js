'use strict';

var controller = require('../controller');

exports.index = function commandApps(args, options) {

  controller.get('apps', function(err, result) {
    console.log(result);
  });
};
