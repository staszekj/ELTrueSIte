module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            dev: {
                options: {
                    open: true,
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35730,
                    middleware: function (connect) {
                        return [
                            connect.static('./'),
                            connect.static('./build/tmp'),
                            connect.static('./src')
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
                    livereload: 'true'
                },
                files: [
                    './src/{,*/}*.*',
                    './build/tmp/{,*/}*.*'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['connect','watch']);

};