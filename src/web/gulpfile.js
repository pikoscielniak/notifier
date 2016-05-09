"use strict";

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var eventStream = require('event-stream');
var typescript = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var sourcemaps = require('gulp-sourcemaps');

var webroot = "./wwwroot/";

var config = {
    libBase: 'node_modules',
    lib: [
        require.resolve('es6-shim/es6-shim.min.js'),
        require.resolve('es6-shim/es6-shim.map'),
        require.resolve('zone.js/dist/zone.js'),
        require.resolve('reflect-metadata/Reflect.js'),
        require.resolve('systemjs/dist/system.src.js'),
        './node_modules/@angular/**/*.js',        
        './node_modules/rxjs/**/*.js',        
        require.resolve('material-design-lite/dist/material.blue-teal.min.css'),
        require.resolve('material-design-lite/material.min.js')
    ]
};

gulp.task('build.lib', ['clean'], function () {
  
    return gulp.src(config.lib, {base: config.libBase})
        .pipe(gulp.dest(webroot + 'lib'));
});

gulp.task('build-prod', ['build.lib'], function () {
    var tsProject = typescript.createProject('./tsconfig.json', { typescript: require('typescript') });
    var tsSrcInlined = gulp.src([webroot + '**/*.ts'], { base: webroot })
        .pipe(inlineNg2Template({ base: webroot }));
    return eventStream.merge(tsSrcInlined, gulp.src(['typings/browser/**/*.ts', 'typings/browser.d.ts']))
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(webroot));
});

gulp.task('build-dev', ['build.lib'], function () {

});

gulp.task('clean', function () {
    return del([webroot + 'lib']);
});

gulp.task('default', ['build-dev']);