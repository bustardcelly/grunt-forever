'use strict';

var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var rm = require('rimraf');

module.exports = function() {

  'use strict';

  this.World = require('../support/world').World;

  this.Given(/^I have not specified an "([^"]*)" option$/, function (arg1, callback) {
    rm('forever', callback);
  });

  this.Then(/^the "([^"]*)" file is not generated$/, function (filename, callback) {
    expect(fs.existsSync(['forever', filename].join(path.sep)), filename + ' exists.').to.equal(false);
    callback();
  });

};
