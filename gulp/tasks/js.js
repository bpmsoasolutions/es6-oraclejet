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

gulp.task('js:bower_modules', function() {
    return  gulp.src(`${configuration.requireJsOptimizerConfig.baseUrl}/bower_modules/**/*`)
        .pipe(gulp.dest(`${configuration.paths.temp}/bower_modules`));
})

gulp.task('js:babel', function() {
    return gulp.src([
        `${configuration.requireJsOptimizerConfig.baseUrl}/**/*`,
        `!${configuration.requireJsOptimizerConfig.baseUrl}/bower_modules`,
        `!${configuration.requireJsOptimizerConfig.baseUrl}/bower_modules/**/*`
    ])
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

gulp.task('js:optimize', ['js:babel', 'js:bower_modules'], function() {
    var config = objectAssign({}, configuration.requireJsOptimizerConfig, { baseUrl: 'temp' });
    return rjs(config)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest(configuration.paths.dist));
})

gulp.task('js:no-optimize', ['js:babel', 'js:bower_modules'])

gulp.task('js', ['js:optimize']);