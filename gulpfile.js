var gulp = require('gulp'),
	inSequence = require('run-sequence'),
	del = require('del'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	typescript = require('gulp-typescript'),
	rename = require('gulp-rename'),
	electron  = require('gulp-atom-electron'),
    symdest = require('gulp-symdest');


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
		.pipe(gulp.dest('dist/frontend/scripts'));
});

gulp.task('private:build-app', function(){
    var project = typescript.createProject('tsconfig.json');
    var tsResult = project.src()
        .pipe(typescript(project));
    return tsResult.js.pipe(gulp.dest('dist/frontend'));
});

gulp.task('private:build-html', function(){
	var sources = gulp.src('dist/frontend/scripts/vendor.js');

	return gulp.src('src/index.html')
		.pipe(inject(sources, {ignorePath: 'dist/frontend',  addRootSlash: false }))
		.pipe(gulp.dest('dist/frontend'));
});

gulp.task('private:copy-templates', function(){
	return gulp.src('src/templates/**.html')
		.pipe(gulp.dest('dist/frontend/templates'));
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
            version: '0.36.2',
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
		'private:clear', 
		[
			'private:build-vendor', 
			'private:build-app', 
			'private:copy-templates', 
			'private:copy-app-package-file', 
			'private:copy-app-main-file'
		],
		'private:build-html',
		'private:package-app', 
		done);
});