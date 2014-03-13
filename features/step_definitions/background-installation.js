module.exports = function() {
  'use strict';

  this.hooks = require('../support/hooks');
  this.World = require('../support/world').World;

  this.Given(/^I have the grunt\-task plugin installed$/, function (callback) {
    // assumed. pass.
    callback();
  });

};