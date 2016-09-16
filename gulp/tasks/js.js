var gulp = require('gulp')
var vm = require('vm')
var merge = require('deeply')
var rjs = require('gulp-requirejs-bundler')
var uglify = require('gulp-uglify')
var objectAssign = require('object-assign')
var es = require('event-stream')
var clean = require('gulp-clean')

import babelTranspile from '../babelTranspile'
import configuration from '../configuration'

gulp.task('js:babel', function() {
    return gulp.src(configuration.requireJsOptimizerConfig.baseUrl + '/**')
        .pipe(es.map(function(data, cb) {
            if (!data.isNull()) {
                babelTranspile(data.relative, function(err, res) {
                    if (res) {
                        data.contents = new Buffer(res.code);
                    }
                    cb(err, data);
                });
            } else {
                cb(null, data);
            }
        }))
        .pipe(gulp.dest(configuration.paths.temp));
});

gulp.task('js:optimize', ['js:babel'], function() {
    var config = objectAssign({}, configuration.requireJsOptimizerConfig, { baseUrl: 'temp' });
    return rjs(config)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest(configuration.paths.dist));
})

gulp.task('js', ['js:optimize'], function () {
    // Now clean up
    return gulp.src(configuration.paths.temp, { read: false }).pipe(clean());
});