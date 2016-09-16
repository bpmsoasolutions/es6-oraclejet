var gulp = require('gulp')
var clean = require('gulp-clean')

import configuration from '../configuration'

gulp.task('clean', function() {
    return gulp.src(configuration.paths.dist + configuration.allFiles, { read: false })
        .pipe(clean());
});

gulp.task('clean:temp', function() {
    return gulp.src(configuration.paths.temp + configuration.allFiles, { read: false })
        .pipe(clean());
});