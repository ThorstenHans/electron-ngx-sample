var gulp = require('gulp'),
	inSequence = require('run-sequence'),
	del = require('del'),
	inject = require('gulp-inject');


gulp.task('private:clear', function(done){
	del.sync(['dist/**/*', 'packaged-app/**/*'], { force: true});
	done();
});


gulp.task('default', function(done){
	inSequence('private:clear', done);
});