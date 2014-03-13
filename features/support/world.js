'use strict';

var World = function World(callback) {

  this.target = undefined;
  this.createTaskCommand = function(target, command) {
    return ['forever', target, command].join(':');
  };

  callback();
};

module.exports.World = World;