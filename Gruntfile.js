module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            dev: {
                options: {
                    open: true,
                    port: 9000,
                    livereload: 35730,
                    middleware: function (connect) {
                        return [
                            connect.static('./build/tmp'),
                            connect.static('./src'),
                            connect.static('./bower_components')
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
            }
        },

        less: {
            options: {
                paths: [
                ]
            },
            files: {
                '<%= appConfig.tmp %>/styles/components.css': '<%= appConfig.app %>/**/*.less',
                '<%= appConfig.tmp %>/styles/layout.css': '<%= appConfig.resources %>/styles/layout.less',
                '<%= appConfig.tmp %>/styles/main.css': '<%= appConfig.resources %>/styles/main.less'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['connect:dev','watch']);

};