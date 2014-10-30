module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                open: true,
                port: 9000,
                hostname: 'localhost',
                livereload: 35730
            },

            dev: {
                options: {
                    open: true,
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35730,
                    middleware: function (connect, options) {
                        return [
                            connect.static('./build/tmp'),
                            connect.static('./src'),
                            connect().use('/node_modules', connect.static('./node_modules')),
                            require('../api')
                        ];
                    }
                }
            },

            dist: {
                options: {
                    base: 'dist',
                    keepalive: true,
                    livereload: false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};