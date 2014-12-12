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
         },
        build: {
            //多文件压缩 !合并
            files: [{
                  expand: true,
                  cwd: '../trunk/static/js', 
                  src: ['*.js'], 
                  dest: '../trunk/static/js', 
                  ext: '.min.js' 
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
    //复制文件
    copy: {
      main: {
        src: 'max/*',
        dest: 'src/',
      },
    },
    //监测文件变化
    watch: {
      options: {
          livereload: true,
          spawn: false,
        },
       codes: {
        files: ['../trunk/static/js/*.js','../trunk/static/less/*.less'],
        tasks: ['uglify', 'less'],
       }
    }
  });
  //展示执行时间 
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  //载入concat和uglify插件，分别对于合并和压缩
  // grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
 
  //注册任务
  grunt.registerTask('default', ['less:production', 'uglify:build']);
  grunt.registerTask('check', ['jshint:files']);
  //grunt.registerTask('move', ['copy:main']);
  grunt.registerTask('live', ['watch:codes']);
}