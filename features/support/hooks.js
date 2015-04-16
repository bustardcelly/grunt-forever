/*jshint unused:false*/
'use strict';
var chai = require('chai'),
    expect = chai.expect,
    spawn = require('child_process').spawn;

module.exports = function() {

  this.World = require('./world').World;

  this.Before(function(callback) {
    // pass
    callback();
  });

  this.After(function(callback) {
    // ensure we kill daemon
		spawn('grunt', [this.createTaskCommand(this.target, 'stop')])
		.on('close', function() {
			callback();
		});
  });

  // Common hooks.
  this.Given(/^I invoke "([^"]*)" on target:"([^"]*)" through grunt task$/, function (command, target, callback) {
    var child;
    this.target = target;
    child = spawn('grunt', [this.createTaskCommand(target, command)]);
    child.on('close', function() {
      var timeout = setTimeout(function() {
        clearTimeout(timeout);
        callback();
      }, 500);
    });
  });

};