# generator-ss-lib-generator [![Build Status](https://travis-ci.org/SkittishSlothLabs/ss-lib-generator.svg?branch=master)](https://travis-ci.org/SkittishSlothLabs/ss-lib-generator)

> [Yeoman](http://yeoman.io) generator for creating simple javascript libraries.

## Getting Started

### Installation

To install generator-ss-lib-generator from npm, run:

```bash
npm install -g generator-ss-lib-generator
```

Finally, initiate the generator:

```bash
yo ss-lib-generator
```

### What it does

This generator is pretty simple.  It'll create the basic package.json file, Gruntfile.js file, a source directory, and a test directory (it'll prompt you for the paths).  It'll set up basic configuration for running `mocha` (with `ShouldJS`), `browserify`, `uglify`, and a `watch` task, and it'll use `time-grunt` to give you a purty display of how long your tasks take.

Everything else?  You're on your own -- at least for now.  The point of this was to have a generator for a simple javascript library with some basic testing built into it; no other frameworks or servers or tasks or anything like that.  That said, suggestions are always welcome.

## License

MIT
