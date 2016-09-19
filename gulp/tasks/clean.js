var gulp = require('gulp')
var clean = require('gulp-clean')
var del = require('del');

import configuration from '../configuration'

gulp.task('clean', function() {
    return gulp.src(configuration.paths.dist + configuration.allFiles, { read: false })
        .pipe(clean());
});

gulp.task('clean:temp', function() {
    return gulp.src(configuration.paths.temp + configuration.allFiles, { read: false })
        .pipe(clean());
});


gulp.task('clean:cordova', function(cb) {
    return del([
        configuration.paths.cordovaPlatforms + '/' +configuration.allFiles,
        `!${configuration.paths.cordovaPlatforms}/platforms.json`
    ], cb)
});

gulp.task('clean:cordovaPlugins', function(cb) {
    return del([
        configuration.paths.cordovaPlugins + '/' +configuration.allFiles,
        `!${configuration.paths.cordovaPlugins}/fetch.json`
    ], cb)
});