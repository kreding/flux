var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').watch;
var del = require('del');

gulp.task('clean', function(){
  del(['dist/**/*'])
});

gulp.task('build', ['clean', 'webpack', 'styles', 'html'], function(){
    gulp.src(config.src).pipe(connect.reload());
});
