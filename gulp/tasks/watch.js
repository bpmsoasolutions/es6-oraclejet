'use strict';

var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');

import configuration from '../configuration'

// Watch for changes.
gulp.task('watch', function(){
    gulp.watch([
        configuration.paths.index,
        configuration.paths.components + configuration.allFiles,
        configuration.paths.containers + configuration.allFiles,
        configuration.paths.app + configuration.allFiles,
        configuration.paths.css + configuration.allFiles
    ], ['html:livereload']).on('change', logChanges);
});

function logChanges(event) {
    util.log(
        util.colors.green('File ' + event.type + ': ') +
        util.colors.magenta(path.basename(event.path))
    );
}