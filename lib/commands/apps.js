'use strict';

var controller = require('../controller');

module.exports = function commandApps(args, options) {

  controller.get('apps', function(err, result) {
    console.log(result);
  });
};
