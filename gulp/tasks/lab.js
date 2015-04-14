var gulp = require('gulp'),
	utils = require('gulp-util');

gulp.task('lab', function(){
	utils.log('This is logs', ', second sentence.', utils.colors.blue(',color logs'))
})

