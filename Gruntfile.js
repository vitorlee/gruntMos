  module.exports = function(grunt) {
  //配置参数
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     concat: {
         options: {
             separator: ';',
             stripBanners: true
         },
         dist: {
             src: [
                 "js/config.js",
                 "js/smeite.js",
                 "js/index.js"
             ],
             dest: "assets/js/default.js"
         }
     },
     uglify: {
         options: {
          mangle: false
         },
        build: {
            //多文件压缩 !合并
            files: [{
                  expand: true,
                  cwd: '../trunk/static/script', 
                  src: ['*.js'], 
                  dest: '../trunk/static/js', 
                  ext: '.js' 
              }]
          }
     },
     less: {
      options: {
        strictMath: true,
        compress: true,
        cleancss: true
      },
      production: {
          files: [{
                  expand: true,
                  cwd: '../trunk/static/less', 
                  src: ['*.less'], 
                  dest: '../trunk/static/css', 
                  ext: '.css' 
              }]
      },
    },
     //代码检查
    jshint: {
      options: {
        eqeqeq: true,
        trailing: true
      },
      files: ['../trunk/static/js/*.js']
    },
    //监测文件变化
    watch: {
      options: {
          livereload: true,
          spawn: false,
        },
       codes: {
        files: ['../trunk/static/script/*.js','../trunk/static/less/*.less'],
        tasks: ['uglify', 'less'],
        // files: ['../trunk/static/less/*.less'],
        // tasks: ['less'],
       }
    }
  });
  //展示执行时间 
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  //注册任务
  grunt.registerTask('default', ['less:production', 'uglify:build']);
  grunt.registerTask('check', ['jshint:files']);
  grunt.registerTask('live', ['watch:codes']);
}