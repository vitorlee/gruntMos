module.exports = function(grunt) {
  'use strict';
  //获取当前时间戳
  var timestamp = Date.parse(new Date()) / 1000;
  //配置路径
  var paths = {
    src: '../static/src/',
    dist: '../static/dist/'
  };
//配置参数
grunt.initConfig({
   //pkg: grunt.file.readJSON('package.json'),
   paths: paths,
   // 复制js
   copy: {
     script: {
       files:[{
         expand: true,
         cwd: '<%= paths.src %>js/',
         src: ['*.js'],
         dest: '<%= paths.dist %>js/',
         ext: '.min.js'
       }]
     }
   },
   //压缩JS
   uglify: {
    options: {
      mangle: true // 混淆
    },
    build: {
      //多文件压缩 !合并
      files: [{
        expand: true,
        cwd: '<%= paths.dist %>js/',
        src: ['**/*.js','!libs/*.js'],
        dest: '<%= paths.dist %>js/'
      }]
    }
   },
   //编译LESS文件
   less: {
    options: {
      strictMath: true,
      compress: true,
      cleancss: true
    },
    build: {
      files: [{
        expand: true,
        cwd: '<%= paths.src %>css/',
        src: ['**/*.less', '!base/*.less'],
        dest: '<%= paths.dist %>css/',
        ext: '.css'
      }]
    },
    product:{
      options: {
        modifyVars: {
         baseUrl: '"http://m.rrr.me/static/"',
         staticVersion: '?ver=' + timestamp
       }
     },
     files: [{
       expand: true,
       cwd: '<%= paths.src %>css/',
       src: ['**/*.less', '!base/*.less'],
       dest: '<%= paths.dist %>css/',
       ext: '.css'
     }]
    }
  },
  //压缩图片
  imagemin: {
    options: {
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    },
    build: {
      files: [{
        expand: true,
        cwd: '<%= paths.dist %>img/',
        src: ['**/*.{png,jpg,jpeg}'],
        dest: '<%= paths.dist %>img/'
      }]
    }
  },
  //压缩HTML文件
  htmlmin: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    build: {
      files: [{
        expand: true,
        cwd: '../wap/views/',
        src: ['**/*.html'],
        dest: '../wap/views/',
        ext: '.html'
      }]
    }
  },
  //代码检查
  jshint: {
    options: {
      eqeqeq: true,
      trailing: true
    },
    files: ['<%= paths.src %>js/*.js']
  },
  //监测文件变化
  watch: {
    options: {
      livereload: true,
      spawn: false,
      event: ['changed','added']
    },
    codes: {
      files: ['<%= paths.src %>css/**/*.less', '<%= paths.src %>js/**/*.js'],
      tasks: ['less:build', 'copy:script']
    }
  }
});
//展示执行时间
require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
require('time-grunt')(grunt);

//注册任务
grunt.registerTask('check', ['jshint:files']);
grunt.registerTask('img', ['imagemin:build']);
grunt.registerTask('live', ['watch:codes']);
grunt.registerTask('build', ['less:product','uglify:build']);
}
