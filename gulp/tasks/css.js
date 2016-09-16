var gulp = require('gulp')
var replace = require('gulp-replace')
var es = require('event-stream')
var concat = require('gulp-concat')

import configuration from '../configuration'

gulp.task('css', function () {
    //JET css
    var bowerCss = gulp.src('src/bower_modules/oraclejet/dist/css/alta/oj-alta-min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/*.css'),
        ojFonts = gulp.src('./src/bower_modules/oraclejet/dist/css/alta/fonts/**/*', {
            base: './src/bower_modules/oraclejet/dist/css/alta/'
        }),
        ojImgFiles = gulp.src('./src/bower_modules/oraclejet/dist/css/alta/images/**/*', {
            base: './src/bower_modules/oraclejet/dist/css/alta/'
        }),
        ojImgFilesCommon = gulp.src('./src/bower_modules/oraclejet/dist/css/common/**/*', {
            base: './src/bower_modules/oraclejet/dist/css/'
        }),
        ojImgFilesSpecific = gulp.src('./src/bower_modules/oraclejet/dist/js/libs/oj/resources/**/*', {
            base: './src/bower_modules/oraclejet/dist/js/libs/oj'
        });


    //Copy OJ NLS
    gulp.src('./src/bower_modules/oraclejet/dist/js/libs/oj/resources/nls/**/*', {
        base: './src/bower_modules/oraclejet/dist/js/libs/oj/resources'
    }).pipe(gulp.dest('./dist/ojtranslations/'))

    //Font awesome
    var faCss = gulp.src('src/bower_modules/font-awesome/css/font-awesome.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        faFonts = gulp.src('./src/bower_modules/font-awesome/fonts/**/*', {
            base: './src/bower_modules/font-awesome/'
        })

    var combinedCss = es.concat(bowerCss, appCss, faCss).pipe(concat('css.css'))

    return es.concat(combinedCss, ojFonts, faFonts, ojImgFiles, ojImgFilesCommon, ojImgFilesSpecific)
        .pipe(gulp.dest(configuration.paths.dist));
});