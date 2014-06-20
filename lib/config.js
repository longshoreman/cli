'use strict';

var fs = require('fs');

var configFile = process.env.HOME + '/.deployer.json';
var configs    = {};


exports.get = function(name) {
  return configs[name];
};

exports.set = function(name, value) {
  configs[name] = value;
};

exports.load = function() {
  if (!fs.existsSync(configFile)) {
    return true;
  }

  var data = fs.readFileSync(configFile);

  try {
    configs = JSON.parse(data);
    return true;
  }
  catch(err) {
    console.error('Error loading config');
    console.error(err);
    return false;
  }
};

exports.save = function(cb) {
  cb = cb || function(){};

  fs.writeFile(configFile, JSON.stringify(configs), function(err) {
    if (err) {
      console.error('Error writing configuration file.');
      console.error(err);
      return cb(err);
    }

    cb(null);
  });
};
