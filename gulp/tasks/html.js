'use strict';

var gulp = require('gulp')
var htmlreplace = require('gulp-html-replace')
var connect = require('gulp-connect')

import configuration from '../configuration'

gulp.task('html', function() {
    return gulp.src(configuration.paths.index)
        .pipe(htmlreplace(configuration.replaceHtmlConfig))
        .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('html:no-replace', function() {
    return gulp.src(configuration.paths.index)
        .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('html:livereload', function() {
    return gulp.src(configuration.paths.html)
        .pipe(connect.reload());
});