'use strict';

var request = require('request');
var config  = require('./config');


function controller(endpoint, cb) {

  var controllerUrl = config.get('controller');
  var token         = config.get('token');

  var options = {
    url: controllerUrl + '/' + endpoint, // TODO: Make that more robust.
    headers: {
      'X-Auth': token
    }
  };

  request(options, function(err, req, body) {
    if (err) {
      console.error('Error contacting controller. Aborting...');
      console.error(err);
      process.exit(1);
    }

    cb(null, body);
  });
};

exports.get = function controllerGet(endpoint, cb) {
  controller('GET', endpoint, cb);
};
