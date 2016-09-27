const gulp = require('gulp'),
    run = require('run-sequence'),
    del = require('del'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    ts = require('gulp-typescript'),
    rename = require('gulp-rename'),
    electron = require('gulp-atom-electron'),
    uglify = require('gulp-uglify'),
    symdest = require('gulp-symdest');

gulp.task('clean-dist', () => {
    return del(['dist/**/*'], { force: true });

});

gulp.task('copy-angular2', function () {
    return gulp.src('./node_modules/@angular/**/*.umd.min.js')
        .pipe(gulp.dest('dist/app/renderer/vendor/@angular'));
});

gulp.task('copy-rxjs', function () {
    return gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest('dist/app/renderer/vendor/rxjs'));
});

gulp.task('copy-app-styles', function () {
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css', './styles/app.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/app/renderer/styles'));
});

gulp.task('bundle-js-dependencies', function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.min.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.js',
        'src/systemjs.config.js'
    ])
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/app/renderer/vendor'));
});

gulp.task('bundle-app', function () {
    var project = ts.createProject('./tsconfig.json', {
        typescript: require('typescript')
    });
    var tsResult = project.src()
        .pipe(ts(project));
    return tsResult.js.pipe(gulp.dest('dist/app/renderer/app'));
});

gulp.task('build-index-html', function () {
    var sources = gulp.src(['dist/app/renderer/vendor/vendor.min.js',
        'dist/app/renderer/styles/all.css']);

    return gulp.src('src/index.html')
        .pipe(inject(sources, { ignorePath: 'dist/app/renderer', addRootSlash: false }))
        .pipe(gulp.dest('dist/app/renderer'));
});

gulp.task('copy-angular-templates', function () {
    return gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('dist/app/renderer/app'));
});

gulp.task('copy-electron-src', function () {
    return gulp.src('src-electron/**/*')
        .pipe(gulp.dest('dist/app'));
});

gulp.task('bundle-desktop-all', function () {
    var platforms = [
        { platform: 'darwin', slug: 'osx' },
        { platform: 'win32', slug: 'windows' },
        { platform: 'linux', slug: 'linux' }
    ];
    platforms.map(function (p) {
        buildApp(p.platform, p.slug);
    });
});

gulp.task('default', function (done) {
    run(
        'clean-dist',
        [
            'copy-angular2',
            'copy-rxjs',
            'copy-app-styles',
            'bundle-js-dependencies',
            'bundle-app'
        ],
        'build-index-html',
        [
            'copy-angular-templates',
            'copy-electron-src'
        ],
        'bundle-desktop-all',
        done);
});


gulp.task('build-web', function (done) {
    run(
        'clean-dist',
        [
            'copy-angular2',
            'copy-rxjs',
            'copy-app-styles',
            'bundle-js-dependencies',
            'bundle-app'
        ],
        ['build-index-html', 'copy-angular-templates'],
        done);
});

var buildApp = function (platform, slug) {
    gulp.src(['dist/app/**/*'])
        .pipe(electron({
            version: '1.4.0',
            platform: platform
        }))
        .pipe(symdest('dist/output/ng2-electron-' + slug));
};
