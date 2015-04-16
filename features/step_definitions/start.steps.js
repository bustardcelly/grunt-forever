/*jshint unused:false*/
'use strict';
var chai = require('chai');
var expect = chai.expect;
var spawn = require('child_process').spawn;
var request = require('supertest');
var S = require('string');

module.exports = function() {
  'use strict';

  var response;
  this.hooks = require('../support/hooks');
  this.World = require('../support/world').World;

  this.When(/^I visit "([^"]*)"$/, function (url, callback) {
    request(url)
      .get('/')
      .expect(200)
      .end(function(error, res) {
        if(error) {
          expect(false, error).to.equal(true);
        }
        response = res;
        callback();
      });
  });

  this.Then(/^I should see the body text: "([^"]*)"$/, function (expectedText, callback) {
    expect(S(response.text.toString()).trim().s).to.equal(expectedText);
    callback();
  });

};