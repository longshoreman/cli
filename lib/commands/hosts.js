'use strict';

var colors = require('colors');
var util = require('util');
var controller = require('../controller');

exports.index = function commandHosts(args, options) {
  controller.get('hosts', function(err, result) {
    result.hosts.sort().forEach(function(host) {
      console.log(host);
    });
  });
};

exports.get = exports.index;

exports.add = function commandHostsAdd(args, options) {
  var host = args.shift();

  if (!host) {
    console.error('Missing host');
    process.exit(1);
  }

  controller.post('hosts', {host: host}, function(err) {
    console.log(host + ' added');
  });
};

exports.rm = function commandHostsRm(args, options) {
  var host = args.shift();

  if (!host) {
    console.error('Missing host');
    process.exit(1);
  }

  controller.del('hosts/' + host, function(err) {
    console.log(host + ' removed');
  });
};
