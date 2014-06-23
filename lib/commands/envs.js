'use strict';

var async      = require('async');
var controller = require('../controller');


exports.index = function commandEnvs(args, options) {
  var app = options.app;

  if (!app) {
    console.error('Missing --app argument');
    process.exit(1);
  }

  controller.get(app + '/envs', function(err, result) {
    console.log(result);
  });
};

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

      console.log(item + ' added. (' + result + ')');
      cb();
    });
  }, function(err) {
    console.log('Done.');
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

      console.log(item + ' removed. (' + result + ')');
      cb();
    });
  }, function(err) {
    console.log('Done.');
  });
};
