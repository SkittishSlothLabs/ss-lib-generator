'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Skittish Sloth Library Generator') + '.'
    ));

    var prompts = [{
      type: 'input',
      name: 'libName',
      message: 'What is the name of the library?',
      default: this.appname
    }, {
      type: 'input',
      name: 'libVersion',
      message: 'What version is the library?',
      default: '0.0.1'
    }, {
      type: 'input',
      name: 'libDescription',
      message: 'Description?',
      default: 'Super Awesome JS lib'
    }, {
      type: 'input',
      name: 'libSrcPath',
      message: 'What path do you want to use for your library?',
      default: 'src/'
    }, {
      type: 'input',
      name: 'libTestPath',
      message: 'What path do you want to use for your tests?',
      default: 'test/'
    }, {
      type: 'input',
      name: 'libDestPath',
      message: 'What path do you want for your output?',
      default: 'dist/'
    }];

    this.prompt(prompts, function(props) {
      this.libName = props.libName;
      this.libVersion = props.libVersion;
      this.libSrcPath = props.libSrcPath;
      this.libTestPath = props.libTestPath;
      this.libDestPath = props.libDestPath;
      this.libDescription = props.libDescription;

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );
      this.template(
        this.templatePath('_gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
        this
      );
      this.template(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'), 
        this
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      this.mkdir(this.libSrcPath);
      this.mkdir(this.libTestPath);
    }
  },

  install: function() {
    console.log("In install.");
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install'],
      callback: function() {
        console.log("All done -- happy coding!");
      }
    });
  }
});
