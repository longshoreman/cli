'use strict';

var prompt = require('prompt');
var config = require('../config');

module.exports = function commandInit(args, options) {

  var promptSchema = {
    properties: {
      controller: {
        message: 'Controller URL:',
        default: config.get('controller')
      },
      token: {
        message: 'Secret Token:',
        default: config.get('token')
      }
    }
  };

  prompt.message = '';
  prompt.delimiter = '';
  prompt.get(promptSchema, function(err, results) {
    config.set('controller', results.controller);
    config.set('token', results.token);
    config.save();
  });
}
