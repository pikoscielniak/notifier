"use strict";

var path = require('path');
var gulp = require('gulp');
var del = require('del');

var webroot = "./wwwroot/";

var config = {
    libBase: 'node_modules',
    lib: [
        require.resolve('es6-shim/es6-shim.min.js'),
        require.resolve('es6-shim/es6-shim.map'),
        require.resolve('systemjs/dist/system-polyfills.js'),
        require.resolve('systemjs/dist/system-polyfills.js.map'),
        require.resolve('angular2/es6/dev/src/testing/shims_for_IE.js'),
        require.resolve('systemjs/dist/system.src.js'),
        require.resolve('angular2/bundles/angular2-polyfills.js'),
        require.resolve('rxjs/bundles/Rx.js'),
        require.resolve('angular2/bundles/angular2.dev.js'),
        require.resolve('angular2/bundles/router.dev.js'),
        require.resolve('angular2/bundles/http.dev.js')
    ]
};

gulp.task('build.lib', ['clean'], function() {
    return gulp.src(config.lib, { base: config.libBase })
        .pipe(gulp.dest(webroot + 'lib'));
});

gulp.task('build-dev', ['build.lib'], function() {

});

gulp.task('clean', function() {
    return del([webroot + 'lib']);
});

gulp.task('default', ['build-dev']);