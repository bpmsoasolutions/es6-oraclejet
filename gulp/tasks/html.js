'use strict';

var gulp = require('gulp')
var htmlreplace = require('gulp-html-replace')

import configuration from '../configuration'

gulp.task('html', function() {
    return gulp.src(configuration.paths.index)
        .pipe(htmlreplace(configuration.replaceHtmlConfig))
        .pipe(gulp.dest(configuration.paths.dist));
});