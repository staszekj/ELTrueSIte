
'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
          build: './build'
        },

        connect: {
            dev: {
                options: {
                    open: true,
                    port: 9000,
                    livereload: 35730,
                    middleware: function (connect) {
                        return [
                            connect().use('/', connect.static('./build/tmp')),
                            connect().use('/', connect.static('./src')),
                            connect().use('/bower_components', connect.static('./bower_components'))
                        ];
                    }
                }
            },

            dist: {
                options: {
                    port: 9001,
                    base: 'dist',
                    keepalive: true,
                    livereload: false
                }
            }
        },

        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.dev.options.livereload %>'
                },
                files: [
                    './src/{,*/}*.*',
                    './build/tmp/{,*/}*.*'
                ]
            },
            less: {
                files: ['./src/{,*/}*.less'],
                tasks: ['less']
            }
        },

        less: {
            main: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'main.css.map',
                    sourceMapFilename: './build/tmp/main/main.css.map'
                },
                src: './src/main/*.less',
                dest: './build/tmp/main/main.css'
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'less', 'connect:dev','watch']);

};