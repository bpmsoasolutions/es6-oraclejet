import gulp from 'gulp'
import clean from 'gulp-clean'
import del from 'del'

import configuration from '../configuration'

gulp.task('clean', function(cb) {
    return del([
        configuration.paths.dist + configuration.allFiles
    ], cb)
});

gulp.task('clean:temp', function(cb) {
    return del([
        configuration.paths.temp + configuration.allFiles
    ], cb)
});


