'use strict';

var request = require('request');
var config  = require('./config');


function controller(method, endpoint, payload, cb) {

  var controllerUrl = config.get('controller');
  var token         = config.get('token');

  var options = {
    method: method,
    url: controllerUrl + '/' + endpoint, // TODO: Make that more robust.
    headers: {
      'X-Auth': token
    },
    json: true,
    rejectUnauthorized: false
  };

  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  request(options, function(err, req, body) {

    if (err) {
      console.error('Error contacting controller. Aborting.');
      console.error(err);
      process.exit(1);
    }

    if (body && body.error) {
      console.error('Server encountered error: ' + body.error);
      process.exit(1);
    }

    cb(null, body);
  });
}

exports.get = function controllerGet(endpoint, cb) {
  controller('GET', endpoint, null, cb);
};

exports.post = function controllerPost(endpoint, payload, cb) {
  controller('POST', endpoint, payload, cb);
};

exports.del = function controllerDel(endpoint, cb) {
  controller('DELETE', endpoint, null, cb);
};
