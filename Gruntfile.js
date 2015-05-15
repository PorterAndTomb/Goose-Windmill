module.exports = function(grunt) {

  grunt.initConfig({
   pkg: grunt.file.readJSON('package.json'),
     concat: {
      dist: {
        files: {
          'public/dist/production.js':
             ['public/app/services/**.js',
              'public/app/auth/auth.js',
              'public/app/currentlyFollowing/currentlyFollowing.js',
              'public/app/personal/personal.js',
              'public/app/tabs/tabs.js',
              'public/app/topStories/topStories.js',
              'public/app/ask/ask.js',
              'public/app/show/show.js',
              'public/app/app.js'],
          'public/dist/production.css': ['public/styles/*.css']
       },
     }
       },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    uglify: {
      build: {
        src:  'public/dist/production.js',
        dest: 'public/dist/production.min.js'
     }
    },

    cssmin: {
      css:{
        src: 'public/dist/production.css',
        dest: 'public/dist/production.min.css'
          }
    },

    jshint: {
      files: [
         'public/app/**/*.js', 'server/**/*.js',
      ],
      options: {
        force: 'false',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    // this task needs to be run after concat (and before uglify) is called on any angular files,
    ngAnnotate: {
        options: {
            add:true,
        },
        dist: {
          files: {
                'public/dist/production.js': ['public/dist/production.js'],
            }
        },
    },

    watch: {
      scripts: {
        files: [
          'public/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'jshint',
          'concat',
          'ngAnnotate',
          'uglify',
          'cssmin'
        ]
      },
      css: {
        files: 'public/**/*.css',
        tasks: ['cssmin']
      },
    },

    shell: {
      pull: {
          command: 'git pull --rebase upstream master'
        },
      runDB: {
        command: 'mongod',
        options: {
            async: true
         }
        },
      newTab:{
        command: 'osascript -e \'tell application \"Terminal\" to activate\' -e \'tell application \"System Events\" to tell process \"Terminal\" to keystroke \"t\" using command down\''
        },
      push: {
        command: function(branch) {
           return 'git push origin ' + branch;
         }
       },
     },

    open: {
      all: {
        path: 'http://localhost:3000/#/'
      }
    },

    karma: {

      options: {
        // point all tasks to karma config file
        configFile: 'karma.conf.js'
      },
      single: {
        // run tests once instead of continuously
        singleRun: true
      },
      continuous: {
        // keep karma running in the background
        background: true

      }
    }


   });

   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-nodemon');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-ng-annotate');
   grunt.loadNpmTasks('grunt-shell');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-shell-spawn');
   grunt.loadNpmTasks('grunt-run');
   grunt.loadNpmTasks('grunt-services');
   grunt.loadNpmTasks('grunt-open');
   grunt.loadNpmTasks('grunt-karma');

   //To run this function, call the task gitFunctions and pass in the name of the branch that
   // will be pushed up to github
   //For example, grunt gitFunctions:newFeatureBranch
   //if no branch name is passed in, nothing happens
   grunt.registerTask('gitFunctions', 'Pull and push from github', function(n) {
     if (n){
       grunt.task.run('shell:pull');
       grunt.task.run('shell:push:' + n);
      }
   });

   // this is to start and stop the Mongo server
   grunt.registerTask('start', 'Start all required services', ['startMongo']);
   grunt.registerTask('stop', 'Stop all services', ['stopMongo']);

   grunt.registerTask('server', function (target) {
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: ['nodemon']
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    // here you can run other tasks e.g.
     grunt.task.run([ 'watch' ]);

    });

   //call this task to start the mongo server and the node server
   grunt.registerTask('startApp', [
     'start',
     'server',
   ]);

   //call this task before something is pushed to github
   grunt.registerTask('build', [
     'jshint',
     'concat',
     'ngAnnotate',
     'uglify',
     'cssmin'
   ]);


   //test with karma
   grunt.registerTask('test', ['karma:single']);




  
};





