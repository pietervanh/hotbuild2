module.exports = function(grunt) {
  var target = grunt.option('target') || 'hotbuild2_test';
  var title = 'Hotbuild2 Test';
  if (target == 'hotbuild2') {
    title = 'Hotbuild2';
  }

  // Project configuration.
  grunt.initConfig({
    target: target,
    clean: {
      options: { force: true },
      src: ['modinfo.json','../<%= target %>/*/*/*/*','../<%= target %>/*/*/*','../<%= target %>/*/*','../<%= target %>/*']
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
            src: 'modinfo.dev.json',
            dest: '../<%= target %>/modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            var info = JSON.parse(content);
            info.date = require('dateformat')(new Date(), 'yyyy/mm/dd');
            info.display_name = title;
            info.id = target;
            info.identifier = "com.pa.proeleert." + target;
            /*
            for (var scene in info.scenes) {
              if (info.scenes[scene][0].match('require.js')) {
                info.scenes[scene].shift()
              }
              info[scene] = info.scenes[scene]
            }
            */
            console.log(info.version, info.date);
            return JSON.stringify(info, null, 2);
          }
        }
      },
      dev: {
        files: [
          {
            src: 'modinfo.dev.json',
            dest: 'modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            var info = JSON.parse(content);
            info.date = require('dateformat')(new Date(), 'yyyy/mm/dd');
            for (var scene in info.scenes) {
              info[scene] = info.scenes[scene];
            }
            console.log(info.id, info.version, info.date);
            return JSON.stringify(info, null, 2);
          }
        }
      }
    },
    /*
    requirejs: {
      target: {
        options: {
          baseUrl: 'ui/mods',
          mainConfigFile: 'ui/mods/instant_sandbox/bootstrap.js',
          skipDirOptimize: true,
          optimize: 'none',
          stubModules: ['text'],

          //name: 'lib/ext/almond',
          name: 'instant_sandbox/main',
          out: '../<%= target %>/ui/mods/instant_sandbox/bootstrap.js',

          skipModuleInsertion: true,
          onBuildWrite: function( name, path, contents ) {
            return require('amdclean').clean({
              code: contents,
              globalObject: true,
              globalObjectName: 'instant_sandbox',
            });
          },
        }
      }
    },
    */
    uglify:{
      release:{
        options: {
          mangle: false,
          compress: {
            drop_console: true
          }
        },
        files:{
          '../<%= target %>/ui/mods/hotbuild2/global_mod_list/hotbuild.js' : ['ui/mods/hotbuild2/global_mod_list/hotbuild.js'],
          '../<%= target %>/ui/mods/hotbuild2/live_game/hotbuild_core.js' : ['ui/mods/hotbuild2/live_game/hotbuild_core.js'],
          '../<%= target %>/ui/mods/hotbuild2/live_game/hotbuild_live.js' : ['ui/mods/hotbuild2/live_game/hotbuild_live.js'],
          '../<%= target %>/ui/mods/hotbuild2/settings/hotbuild_settings.js' : ['ui/mods/hotbuild2/settings/hotbuild_settings.js']
        }
      }
    },
    cssmin: {
      release: {
        files: { 
          '../<%= target %>/ui/mods/hotbuild2/live_game/hotbuild.css' : ['ui/mods/hotbuild2/live_game/hotbuild.css'],
          '../<%= target %>/ui/mods/hotbuild2/settings/hotbuild_settings.css' : ['ui/mods/hotbuild2/settings/hotbuild_settings.css']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint','clean','copy:simple', 'copy:modinfo','copy:test']);
  grunt.registerTask('release', ['jshint','clean','copy:simple', 'copy:modinfo','copy:test']);  
  //grunt.registerTask('release', ['jshint','clean','copy:simple', 'copy:modinfo','cssmin:release','uglify:release']);

};