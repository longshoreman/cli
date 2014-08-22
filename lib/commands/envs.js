'use strict';

var async      = require('async');
var colors     = require('colors');
var controller = require('../controller');

exports.index = function commandEnvs(args, options) {
  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  controller.get(app + '/envs', function(err, result) {
    result.envs.sort().forEach(function(env) {
      console.log(env);
    });
  });
};

exports.get = exports.index;

exports.set = function commandEnvsSet(args, options) {
  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  async.each(args, function(item, cb) {
    controller.post(app + '/envs', {env: item}, function(err, result) {
      if (err) {
        return cb(err);
      }
      console.log(item + ' added');
      cb();
    });
  });
};

exports.rm = function commandEnvsRm(args, options) {
  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  async.each(args, function(item, cb) {
    controller.del(app + '/envs/' + item, function(err, result) {
      if (err) {
        return cb(err);
      }
      console.log(item + ' removed');
      cb();
    });
  });
};
