grunt-forever [![Build Status](https://travis-ci.org/bustardcelly/grunt-forever.png)](https://travis-ci.org/bustardcelly/grunt-forever)
=============

> forever task for grunt to start, stop and restart an application as a daemon.

## Updated for Grunt 0.4.0
This grunt task plugin has been updated to work with [Grunt 0.4.0](https://github.com/gruntjs/grunt/wiki/Getting-started) release. The working version for Grunt 0.3.x has been tagged [0.2.2](https://github.com/bustardcelly/grunt-forever/tree/0.2.2).

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile](https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md) with: `npm install grunt-forever`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-forever');
```

### Overview

Inside your `grunt.js` file add a section named `forever`. This section specifies the `forever` task and provides the main application filepath option that will be run. The main filepath defaults to `index.js` if not provided.

#### Named Arguments
grunt-forever uses colon-separated arguments for the `forever` task described in the [grunt API](https://github.com/gruntjs/grunt/wiki/grunt.task#wiki-grunt-task-registerTask). Supported name arguments are:

* forever:start
* forever:stop
* forever:restart

##### start 

Attempts to start the main application file as a daemon if not currently running.

##### stop

Attempts to stop the process started previously by `forever`.

##### restart

Attempts to restart the process previously started. If not currently running, starts a new one.

#### Options

##### index ```string```

The option specifies the main application file that will be run under a daemon using `forever`.

##### command ```string```

The command to execute, defaults to 'node'. Set this to 'coffee' to run
coffeescript applications.

##### logDir ```string```

The directory log files are saved, defaults to 'forever'.

##### errFile ```string```

File stderr is logged into, defaults to 'err.log'.

##### logFile ```string```

File stdout is logged into, defaults to 'out.log'.

### Config Example
```javascript
forever: {
  options: {
    index: 'index.js',
    logDir: 'logs'
  }
}
```

### Command example
```bash
grunt forever:start
```

```bash
grunt forever:stop
```

```bash
grunt forever:restart
```
