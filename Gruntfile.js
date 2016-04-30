module.exports = function(grunt) {
  var target = grunt.option('target') || 'hotbuild2_dev';
  var title = 'Hotbuild2 Test';
  if (target == 'hotbuild2') {
    title = 'Hotbuild2';
  }

  // Project configuration.
  grunt.initConfig({
    target: target,
    clean: {
      options: { force: true },
      src: ['../<%= target %>/*/*/*/*','../<%= target %>/*/*/*','../<%= target %>/*/*','../<%= target %>/*']
    },
    jshint: {
      files:['Gruntfile.js','ui/mods/hotbuild2/global_mod_list/*.js','ui/mods/hotbuild2/live_game/*.js','ui/mods/hotbuild2/settings/*.js'],
      options: {
        globals: {
          jquery: true,
          devel: true,
          debug: true,
          expr:true
        }
      }
    },
    copy: {
      simple: {
        files: [
          {
            src: [
              'ui/mods/hotbuild2/defaults/*.json',
              'ui/mods/hotbuild2/lib/*.js',
              'ui/mods/hotbuild2/**/*.png',
              'ui/mods/hotbuild2/**/*.html'],
            dest: '../<%= target %>/',
          },
        ],
      },
      test: {
        files: [
          {
            src: [
              'ui/mods/hotbuild2/defaults/*.json',
              'ui/mods/hotbuild2/**/*.js',
              'ui/mods/hotbuild2/**/*.css',
              'ui/mods/hotbuild2/**/*.png'],
            dest: '../<%= target %>/',
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: 'modinfo.json',
            dest: '../<%= target %>/modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            var info = JSON.parse(content);
            info.date = require('dateformat')(new Date(), 'yyyy-mm-dd');
            info.display_name = title;
            info.identifier = "com.pa.proeleert." + target;
            console.log(info.version, info.date);
            return JSON.stringify(info, null, 2);
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['jshint','clean','copy:simple', 'copy:modinfo','copy:test']);
  grunt.registerTask('release', ['jshint','clean','copy:simple', 'copy:modinfo','copy:test']);
  
  //grunt.registerTask('deploy',['compress:main']);

};
