/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app':                        'app',
        '@angular':                   'vendor/@angular',
        'rxjs':                       'vendor/rxjs'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
    ];

    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
    }
 
    ngPackageNames.forEach(packUmd);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
