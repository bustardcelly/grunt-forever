var forever     = require('forever'),
  logFile     = process.cwd() + '/forever.log',
  commandMap  = {
    start:      startForeverWithIndex,
    stop:       stopOnProcess,
    restart:    restartOnProcess
  },
  done, gruntRef;

function log( message ) {
  gruntRef.log.writeln( message );
}

function warn( message ) {
  gruntRef.warn( message );
}

function error( message ) {
  gruntRef.log.error( message ).error();
}

function prettyPrint( id, object ) {
  log(id + ' : ' + JSON.stringify(object, null, 2));
}

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

function startForeverWithIndex( index ) {
  log( 'Attempting to start ' + index + ' as daemon.');

  done = this.async;
  findProcessWithIndex( index, function(process) {
    if( typeof process !== 'undefined' ) {
      warn( index + ' is already running.');
      log( forever.format(true, [process]) );
      done();
    }
    else {
      // 'forever start -o out.log -e err.log -a -m 3 index.js';
      forever.startDaemon( index, {
        logFile: logFile
      });
      log( 'Logs can be found at ' + logFile );
      done();
    }
  });
}

function stopOnProcess( index ) {
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

function restartOnProcess( index ) {
  log( 'Attempting to restart ' + index + '...' );
  
  var startRequest = (function(context, index) {
    return function() {
        startForeverWithIndex.call(context, index);
    };
  }(this, index));

  done = this.async();
  findProcessWithIndex( index, function(process) {
    if( typeof process !== 'undefined' ) {
      log( forever.format(true,[process]) );

      forever.restart( index )
        .on('error', function(message) {
          error( 'Error restarting ' + index + '. [REASON] :: ' + message );
          done(false);
        });
      done();
    }
    else {
      log( index + ' not found in list of processes in forever. Starting new instance...' );
      startRequest();
      done();
    }
  });
}

module.exports = function( grunt ) {

  gruntRef = grunt;
  grunt.registerTask( 'forever', 'Starts node app as a daemon.', function() {

      var index       = grunt.config('forever.main') || 'index.js',
          operation   = this.args[0];

      try {
        if( commandMap.hasOwnProperty(operation) ) {
          commandMap[operation].call( this, index );
        }
        else {
          warn( 'Operation ' + operation + ' is not supported currently. Only forever:start, forever:stop or forever:restart.' );
        }
      }
      catch( e ) {
          error( 'Exception thrown in attempt to ' + operation + ' on ' + index + ': ' + e );
      }
  });
};