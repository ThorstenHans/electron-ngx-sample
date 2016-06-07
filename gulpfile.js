var gulp = require('gulp'),
	inSequence = require('run-sequence'),
	del = require('del'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	ts = require('gulp-typescript'),
	rename = require('gulp-rename'),
	electron  = require('gulp-atom-electron'),
    symdest = require('gulp-symdest');


gulp.task('private:clean', function(done){
	del.sync(['dist/**/*', 'packaged-app/**/*'], { force: true});
	done();
});

gulp.task('private:copy-ng2', function(){
	return gulp.src('./node_modules/@angular/**/*')
		.pipe(gulp.dest('dist/frontend/vendor/@angular'));
});

gulp.task('private:copy-rxjs', function(){
  return gulp.src('./node_modules/rxjs/**/*')
	  .pipe(gulp.dest('dist/frontend/vendor/rxjs'));
});

gulp.task('private:build-vendor', function(){
	return gulp.src([
		"node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js"
		])
		.pipe(concat('base.js'))
		.pipe(gulp.dest('dist/frontend/vendor'));
});

gulp.task('private:build-app', function(){
    var project = ts.createProject('./tsconfig.json', {
		typescript: require('typescript')
	});
    var tsResult = project.src()
        .pipe(ts(project));
    return tsResult.js.pipe(gulp.dest('dist/frontend/app'));
});

gulp.task('private:build-html', function(){
	var sources = gulp.src('dist/frontend/vendor/base.js');

	return gulp.src('src/index.html')
		.pipe(inject(sources, {ignorePath: 'dist/frontend',  addRootSlash: false }))
		.pipe(gulp.dest('dist/frontend'));
});

gulp.task('private:copy-templates', function(){
	return gulp.src('src/app/**/*.html')
		.pipe(gulp.dest('dist/frontend/app'));
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

var buildApp = function(platform, slug){
    gulp.src(['dist/**/*'])
        .pipe(electron({
            version: '1.2.1',
            platform: platform }))
        .pipe(symdest('packaged-app/ng2-electron-' + slug));
};

gulp.task('private:package-app', function(){
    var platforms = [{ platform: 'darwin', slug: 'osx'}, { platform: 'win32', slug: 'windows'}, { platform: 'linux', slug: 'linux'}];
    platforms.map(function(p){
        buildApp(p.platform, p.slug);
    });
});

gulp.task('default', function(done){
	inSequence(
		'private:clean',
		[
			'private:build-vendor',
			'private:copy-rxjs',
			'private:copy-ng2',
			'private:build-app',
			'private:copy-templates',
			'private:copy-app-package-file',
			'private:copy-app-main-file'
		],
		'private:build-html',
		'private:package-app',
		done);
});
