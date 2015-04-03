var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var config = require('../config').browserify;

var bundler = watchify(browserify(config.src, watchify.args));

config.settings.transform.forEach(function(t){
    bundler.transform(t);
});

gulp.task('borwserify', bundle);
bundler.on('update', bundle);

function bundle(){
    return bundler.bundle()
        .on('update', gutil.log.bind(gutil, 'Browserif Error'))
        .pipe(source(config.outputName))
        .pipe(gulp.dest(config.dest))
        .pipe(connect.reload());
}
