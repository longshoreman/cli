'use strict';

var colors = require('colors');
var util = require('util');
var controller = require('../controller');

exports.index = function commandApps(args, options) {
  controller.get('hosts', function(err, result) {
    console.log('Hosts'.blue);
    result.hosts.sort().forEach(function(host) {
      console.log(host.grey);
    });
  });
};
