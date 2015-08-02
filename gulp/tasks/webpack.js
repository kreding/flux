var gulp = require('gulp'),
    webpack = require('webpack'),
    gutil = require('gulp-util');

gulp.task('webpack', ['clean'], function(callback){
  webpack(require('../../webpack.config.js'), function(err, stats){
    if(err) throw gutil.pluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({colors: true}));
    callback()
  });
});
