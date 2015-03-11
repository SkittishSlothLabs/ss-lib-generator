'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            js: "<%= libSrcPath %>",
            test: "<%= libTestPath %>",
            build: "<%= libDestPath %>"
        },

        banner: "\n" +
            "/*\n" +
            " * -------------------------------------------------------\n" +
            " * Project: <%%= pkg.title %>\n" +
            " * Version: <%%= pkg.version %>\n" +
            " *\n" +
            " * Copyright (c) <%%= grunt.template.today(\"yyyy\") %>\n" +
            " * -------------------------------------------------------\n" +
            " */\n" +
            "\n",

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%%= dirs.js %>/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: '<%%= dirs.test %>/.jshintrc'
                },
                src: ['<%%= dirs.test %>/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= dirs.build %>/{,*/}*',
                        '!<%%= dirs.build %>/.git{,*/}*'
                    ]
                }]
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '<%%= banner %>'
            },
            dist: {
                files: {
                    "<%%= dirs.build %>/<%%= pkg.name %>.min.js": "<%%= dirs.js %>/**/*.js"
                }
            },
            build: {
                src: '<%%= dirs.js %>/<%%= pkg.name %>.js',
                dest: '<%%= dirs.build %>/<%%= pkg.name %>.min.js'
            }
        },

        watch: {
            js: {
                options: {
                    spawn: true,
                    interrupt: true,
                    debounceDelay: 250
                },
                files: ['Gruntfile.js', '<%%= dirs.js %>/**/*.js', '<%%= dirs.test %>/**/*.js'],
                tasks: ['default']
            }
        },

        browserify: {
            main: {
                src: ['<%%= dirs.js %>/**/*.js'],
                dest: '<%%= dirs.build %>/<%%= pkg.name %>.js'
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false) 
                    require: 'should'
                },
                src: ['<%%= dirs.test %>/**/*.js']
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['clean', 'mochaTest', 'browserify', 'uglify']);
};