var gulp = require('gulp'),
	inSequence = require('run-sequence'),
	del = require('del'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	typescript = require('gulp-typescript');


gulp.task('private:clear', function(done){
	del.sync(['dist/**/*', 'packaged-app/**/*'], { force: true});
	done();
});

gulp.task('private:build-vendor', function(){
	return gulp.src([
		"node_modules/angular2/bundles/angular2-polyfills.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/rxjs/bundles/Rx.js",
        "node_modules/angular2/bundles/angular2.dev.js",
        "node_modules/angular2/bundles/http.dev.js",
        "node_modules/angular2/bundles/router.dev.js"
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('private:build-app', function(){
    var project = typescript.createProject('tsconfig.json');
    var tsResult = project.src()
        .pipe(typescript(project));
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('default', function(done){
	inSequence('private:clear', ['private:build-vendor', 'private:build-app'], done);
});