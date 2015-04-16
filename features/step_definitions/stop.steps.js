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
        expect(error, 'Error should be provided from access on stopped process.').to.not.equal(undefined);
        expect(error.code, 'Error code should be provided as \'EXONNREFUSED\' on access of stopped process.').to.equal('ECONNREFUSED');
        callback();
        });
  });

};