module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
 
 // tasks
    uglify: {
      build: {
        src: ['js/global.js'], //input
        dest: 'js/build/global.min.js' //output
      }
    },

    sass:{
     dist: {
        options: {
          style: 'expanded'
        },
        files: { 
          'css/build/global.css': 'css/sass/global.scss',
        }
      }
    },

    connect: {
      server: {
       options: {
          port: 8000,
          base: './'
        }
      }
    },

    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "css/build/*.css",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/build/*.css',
        dest: 'css/build/prefixed/'
      }
    },

    concat: {
      dist: {
        src: 'js/libs/*.js',
        dest: 'js/global.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/build/minified/global.css': ['css/build/prefixed/global.css']
        }
      }
    },


    watch: {
             options: {
              livereload: true,
            },
            
            
            scripts: {
              files: ['js/build/*.js'],
              tasks: ['uglify'],
              options: {
                spawn: false,
              }
            },

            css: {
              files: ['css/sass/bootstrap/*.scss', 'css/sass/bootstrap/mixins/*.scss',  'css/sass/*.scss'],
              tasks: ['sass', 'autoprefixer', 'cssmin',],
              options: {
                spawn: false,
              }
            },


            html:{
              files: ['*.html'],
              tasks: [],
              options: {
                spawn: false,
              }
            }
    }

  });

  // Load the plugin that provides task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  
  
  // register a default task.
  grunt.registerTask('default', ['browserSync', 'watch']);

  // build task(s).
  grunt.registerTask('build', ['concat', 'uglify', 'sass', 'imagemin', 'autoprefixer', 'cssmin']);



};