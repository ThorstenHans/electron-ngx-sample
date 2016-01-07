var gulp = require('gulp'),
	inSequence = require('run-sequence'),
	del = require('del'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	typescript = require('gulp-typescript'),
	rename = require('gulp-rename');


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

gulp.task('private:build-html', function(){
	var sources = gulp.src('dist/scripts/vendor.js');

	return gulp.src('src/index.html')
		.pipe(inject(sources, {ignorePath: 'dist'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('private:copy-templates', function(){
	return gulp.src('src/templates/**.html')
		.pipe(gulp.dest('dist/templates'));
});

gulp.task('private:copy-app-package-file', function(){
	return gulp.src('src/app.package.json')
		.pipe(rename('package.json'))
		.pipe(gulp.dest('dist'));
});

gulp.task('private:copy-app-main-file', function(){
	return gulp.src('src/main.js')
		.pipe(gulp.dest('dist'));
});

gulp.task('default', function(done){
	inSequence('private:clear', ['private:build-vendor', 'private:build-app', 'private:copy-templates', 'private:copy-app-package-file', 'private:copy-app-main-file'],'private:build-html', done);
});