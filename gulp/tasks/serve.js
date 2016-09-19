var gulp = require('gulp')
var connect = require('gulp-connect')
var path = require('path')
var url = require('url')

import babelTranspile from '../babelTranspile'
import configuration from '../configuration'

gulp.task('serve:src', ['html:livereload', 'watch'], function() {
    return connect.server({
        root: configuration.transpilationConfig.root,
        middleware: function(connect, opt) {
            return [
                 function (req, res, next) {
                     var pathname = path.normalize(url.parse(req.url).pathname);
                     babelTranspile(pathname, function(err, result) {
                        if (err) {
                            next(err);
                        } else if (result) {
                            res.setHeader('Content-Type', 'application/javascript');
                            res.end(result.code);
                        } else {
                            next();
                        }
                     });
                 }
            ];
        },
        livereload: true
    });
});

gulp.task('serve:dist', ['default'], function() {
    return connect.server({ root: configuration.paths.dist });
});