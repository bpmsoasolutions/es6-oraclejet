

import gulp from 'gulp'
import requireDir from 'require-dir'
import configuration from  './gulp/configuration'

var clean = require('gulp-clean')
var chalk = require('chalk')

// Require all tasks in the 'gulp' folder.
requireDir('./gulp/tasks', { recurse: false });

// Default task; start local server & watch for changes.
//gulp.task('default', ['connect', 'watch']);

gulp.task('default', ['html', 'js', 'css'], (callback) => {
    //gulp.src('./temp/**/*', { read: false }).pipe(clean());
    console.log('\nPlaced optimized files in ' + chalk.magenta(configuration.paths.dist));
    callback()
});

gulp.task('cordova:no-min', ['html:no-replace', 'js:no-optimize'], (callback) => {
    console.log('\nPlaced files in ' + chalk.magenta(configuration.paths.dist));
    callback()
});

