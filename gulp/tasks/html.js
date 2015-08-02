var gulp = require('gulp');
var config = require('../config').html;

gulp.task('html', ['styles'], function(){
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
