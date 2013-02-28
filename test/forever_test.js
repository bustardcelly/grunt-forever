var grunt   = require('grunt'),
    forever = require('forever');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.forever = {
  document: function(test) {
    test.expect(1);
    test.ok(true, 'Due to the asynchronous nature of the forever task, test setup is proving to be difficult. Need to find a way to pause setup and teardown until forever has started/stopped.');
    test.done();
  }
};


/*
exports['forever'] = {
  setUp: function(done) {
    grunt.task.run('forever:start');
    forever.list(false, function(context, list) {
      done();
    });
  },
  index: function(test) {
    test.expect(2);
    forever.list(false, function(context, list) {
      test.equal(true, false, 'should default to index.js as the main file if not provided');
      test.equal(true, false, 'should use the provided main file option if provided');
      test.done();
    });
  },
  start: function(test) {
    test.expect(2);
    test.equal(true, false, 'should start if not previously started');
    test.equal(true, false, 'should not start a new process if previously started');
    test.done();
  },
  stop: function(test) {
    test.expect(2);
    test.equal(true, false, 'should not throw exception if process not found');
    test.equal(true, false, 'should kill process from previously started daemon');
    test.done();
  },
  restart: function(test) {
    test.expect(2);
    test.equal(true, false, 'should start a new process if one not found');
    test.equal(true, false, 'should stop and restart process and not create a new one');
    test.done();
  },
  tearDown: function(done) {
    grunt.task.run('forever:stop');
    done();
  }
};
*/