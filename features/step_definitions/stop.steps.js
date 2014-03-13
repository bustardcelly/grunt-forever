/*jshint unused:false*/
'use strict';
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

module.exports = function() {
  'use strict';

  this.Then(/^I should be shown no content when visiting "([^"]*)"$/, function (url, callback) {
    request(url)
      .get('/')
      .end(function(error, response) {
        expect(error).to.not.equal(undefined);
        expect(error.code).to.equal('ECONNREFUSED');
        callback();
      });
  });

};