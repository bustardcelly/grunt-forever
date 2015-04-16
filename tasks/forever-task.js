var forever     = require('forever'),
    path        = require('path'),
    logDir      = path.join(process.cwd(), 'forever'),
    outFile     = undefined,
    errFile     = undefined,
    logFile     = undefined,
    killSignal  = 'SIGKILL',
    commandName = 'node',
    commandMap  = {
      start:      startForeverWithIndex,
      stop:       stopOnProcess,
      restart:    restartOnProcess
    },
    done, gruntRef;

/**
 * Logs message to console using log.writeln() from grunt.
 * @param  {String} message Message to print with log formatting.
 */
function log( message ) {
  gruntRef.log.writeln( message );
}
/**
 * Logs message to console using warn() from grunt.
 * @param  {String} message Message to print with warn formatting.
 */
function warn( message ) {
  gruntRef.warn( message );
}
/**
 * Logs message to console using log.error() and raises error from grunt.
 * @param  {String} message Message to print in error formatting.
 */
function error( message ) {
  gruntRef.log.error( message ).error();
}
/**
 * Pretty prints supplied object in JSON notation using grunt logging.
 * @param  {String} id     String description of object
 * @param  {Object} object Generic Object to be JSON-ified.
 */
function prettyPrint( id, object ) {
  log(id + ' : ' + JSON.stringify(object, null, 2));
}
/**
 * Locates running process previously started by forever based on index file, and notifies callback. Will notify of undefined if not found, other wise the unformatted process object.
 * @param  {String}   index    Index filename.
 * @param  {Function} callback Delegate method to invoke with either the found process object or undefined if not found.
 */
function findProcessWithIndex( index, callback ) {
  var i, process;
  try {
    forever.list(false, function(context, list) {
      i = list ? list.length : 0;
      while( --i > -1 ) {
        process = list[i];
        if( process.hasOwnProperty('file') &&
          process.file === index ) {
          break;
        }
        process = undefined;
      }
      callback.call(null, process);
    });
  }
  catch( e ) {
    error( 'Error in trying to find process ' + index + ' in forever. [REASON] :: ' + e.message );
    callback.call(null, undefined);
  }
}
/**
 * Attempts to start process using the index file.
 * @param  {String} index Filename.
 */
function startForeverWithIndex( index, doneCB ) {
  log( 'Attempting to start ' + index + ' as daemon.');

  var config;
  var appendConfig = function(prop, value) {
    log('Adding to config: ' + prop + ', ' + value);
    if(value !== undefined) {
      config[prop] = value;
    }
  };
  done = doneCB || this.async();
  findProcessWithIndex( index, function(process) {
    // if found, be on our way without failing.
    if( typeof process !== 'undefined' ) {
      warn( index + ' is already running.');
      log( forever.format(true, [process]) );
      done();
    }
    else {
      gruntRef.file.mkdir(logDir);
      // 'forever start -o out.log -e err.log -c node -a -m 3 index.js';
      config = {
        command: commandName,
        append: true,
        max: 3,
        killSignal: killSignal
      };
      appendConfig('errFile', errFile);
      appendConfig('outFile', outFile);
      appendConfig('logFile', logFile);
      forever.startDaemon( index, config );
      log( 'Logs can be found at ' + logDir + '.' );
      done();
    }
  });
}
/**
 * Attempts to stop a process previously started associated with index.
 * @param  {String} index Filename associated with previously started process.
 */
function stopOnProcess(index) {
  log( 'Attempting to stop ' + index + '...' );

  done = this.async();
  findProcessWithIndex( index, function(process) {
    if( typeof process !== 'undefined' ) {
      log( forever.format(true,[process]) );

      forever.stop( index )
        .on('stop', function() {
          done();
        })
        .on('error', function(message) {
          error( 'Error stopping ' + index + '. [REASON] :: ' + message );
          done(false);
        });
    }
    else {
      gruntRef.warn( index + ' not found in list of processes in forever.' );
      done();
    }
  });
}
/**
 * Attempts to stop and restart a process previously started associated with index. If no process found as previously started, just starts a new one.
 * @param  {String} index Filename associated with previously started process.
 */
function restartOnProcess( index ) {
  log( 'Attempting to restart ' + index + '...' );

  // generate delegate function to pass with proper contexts.
  var startRequest = (function(context, index) {
    return function(cb) {
        startForeverWithIndex.call(context, index, cb);
    };
  }(this, index));

  done = this.async();
  findProcessWithIndex( index, function(process) {
    if(typeof process !== 'undefined') {
      log(forever.format(true,[process]));
      forever.restart(index, false);
      done();
    }
    else {
      log(index + ' not found in list of processes in forever. Starting new instance...');
      startRequest(done);
    }
  });
}

/**
 * grunt-future task
 * @param  {Object} grunt Grunt
 */
module.exports = function(grunt) {

  gruntRef = grunt;
  grunt.registerMultiTask( 'forever', 'Starts node app as a daemon.', function(target) {

      var index = this.options().index || 'index.js',
          operation = target || 'start';

      commandName = this.options().command;
      logDir = undefined !== this.options().logDir ? path.join(process.cwd(), this.options().logDir) : logDir;
      outFile = undefined !== this.options().outFile ? path.join(logDir, this.options().outFile) : outFile;
      errFile = undefined !== this.options().errFile ? path.join(logDir, this.options().errFile) : errFile;
      logFile = undefined !== this.options().logFile ? path.join(logDir, this.options().logFile) : logFile;
      killSignal = this.options().killSignal || killSignal;

      try {
        if(commandMap.hasOwnProperty(operation)) {
          commandMap[operation].call(this, index);
        }
        else {
          warn('Operation ' + operation + ' is not supported currently. Only forever:start, forever:stop or forever:restart.');
        }
      }
      catch(e) {
          error('Exception thrown in attempt to ' + operation + ' on ' + index + ': ' + e);
      }
  });
};
