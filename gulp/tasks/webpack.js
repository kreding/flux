var gulp = require('gulp'),
    webpack = require('webpack'),
    gutil = require('gulp-util');

gulp.task('webpack', function(){
  webpack(require('../../webpack.config.js'), function(err, stats){
    if(err) throw gutil.pluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
  });
});
