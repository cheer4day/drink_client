module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            all: {
                options: {
                    port: 63342,
                    hostname: 'localhost',
                    path: 'http://localhost:63342/cheer4day/drink_client/home.html',
                    keepalive: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/app_modules/controllers/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/app_modules/*.js'],
            options: {
                globals: {
                    jquery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        open: {
            all: {
                // Gets the port from the connect configuration
               // path: 'http://localhost:<%= connect.all.options.port%>/cheer4day/drink_client/home.html'
                path: 'http://localhost:63342/cheer4day/drink_client/home.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jshint', 'connect', 'concat', 'uglify']);
    grunt.registerTask('server',['open', 'connect']);
};