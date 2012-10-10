grunt-forever
=============

> forever task for grunt to start, stop and restart an application as a daemon.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-forever`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-forever');
```

### Overview

Inside your `grunt.js` file add a section named `forever`. This section specifies the `forever` task and provides the main application filepath option that will be run. The main filepath defaults to `index.js` if not provided.

#### Named Arguments
grunt-forever uses colon-separated arguments for the `forever` task described in the [grunt API](https://github.com/gruntjs/grunt/blob/master/docs/api.md). Supported name arguments are:

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

##### main ```string```

The option specifies the main application file that will be run under a daemon using `forever`.

### Config Example
```javascript
forever: {
  main: 'index.js'
}
```