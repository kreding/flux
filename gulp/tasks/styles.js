var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var config = require('../config.js').stylus;

gulp.task('styles', ['webpack'], function(){
    gulp.src(config.src)
        .pipe(stylus(config.settings))
        .pipe(gulp.dest(config.dest))
        .pipe(connect.reload())
});
