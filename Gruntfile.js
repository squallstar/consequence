module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['assets/js/app.js'],
        dest: 'public/js/app.js'
      }
    },
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          ignore: ['node_modules/**'],
          ext: 'js',
          watch: ['app.js', 'libs', 'routes']
        }
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dev: {
        files: {
          'public/css/index.css': 'assets/scss/index.scss'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'public/js/app.js': ['public/js/app.js']
        }
      }
    },
    watch: {
      js: {
        files: ['assets/js/*.js'],
        tasks: ['concat:js'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Precompile-only task
  grunt.registerTask('precompile', ['sass:dev', 'concat:js']);

  // Build-only task
  grunt.registerTask('compile', ['uglify:js']);

  // Heroku tasks
  grunt.registerTask('postinstall', ['precompile', 'compile']);

  // Default task for development
  grunt.registerTask('default', 'Run the server with nodemon, precompile assets watches for changes', function() {
    // Spawns a nodemon task with the server and tails the output
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      args: ['nodemon']
    });

    // Appends server output to grunt stdout
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    // Precompile assets on task startup
    grunt.task.run('precompile');

    // Watches for changes
    grunt.task.run('watch');
  });
};