var gulp = require('gulp')
var replace = require('gulp-replace')
var es = require('event-stream')
var concat = require('gulp-concat')

import configuration from '../configuration'



gulp.task('assetsJET', ['images:cordova', 'css:cordova', 'fonts:cordova'], function () {})
gulp.task('images:cordova', function () {
    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-android/images/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta-android'
    }).pipe(gulp.dest('app/merges/android'));
    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-ios/images/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta-ios'
    }).pipe(gulp.dest('app/merges/ios'));
    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-windows/images/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta-windows'
    }).pipe(gulp.dest('app/merges/windows'));
    gulp.src('./src/bower_modules/oraclejet/dist/css/alta/images/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta'
    }).pipe(gulp.dest('app/merges/browser'));
})
gulp.task('css:cordova', function () {
    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-android/oj-alta.css')
        .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'))
        .pipe(gulp.dest('app/merges/android'));

    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-ios/oj-alta.css')
        .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'))
        .pipe(gulp.dest('app/merges/ios'));

    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-windows/oj-alta.css')
        .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'))
        .pipe(gulp.dest('app/merges/windows'));

    gulp.src('./src/bower_modules/oraclejet/dist/css/alta/oj-alta.css')
        .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'))
        .pipe(gulp.dest('app/merges/browser'));
})

gulp.task('fonts:cordova', function () {
    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-android/fonts/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta-android'
    }).pipe(gulp.dest('app/merges/android'));

    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-ios/fonts/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta-ios'
    }).pipe(gulp.dest('app/merges/ios'));

    gulp.src('./src/bower_modules/oraclejet/dist/css/alta-windows/fonts/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta-windows'
    }).pipe(gulp.dest('app/merges/windows'));

    gulp.src('./src/bower_modules/oraclejet/dist/css/alta/fonts/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/alta'
    }).pipe(gulp.dest('app/merges/browser'));
})


///_______


gulp.task('css', function () {
    var appCss = gulp.src('src/css/*.css'),
        ojImgFilesCommon = gulp.src('./src/bower_modules/oraclejet/dist/css/common/**/*', {
            base: './src/bower_modules/oraclejet/dist/css/'
        }),
        ojImgFilesSpecific = gulp.src('./src/bower_modules/oraclejet/dist/js/libs/oj/resources/**/*', {
            base: './src/bower_modules/oraclejet/dist/js/libs/oj'
        });
    //Copy OJ NLS
    gulp.src('./src/bower_modules/oraclejet/dist/js/libs/oj/resources/nls/**/*', {
        base: './src/bower_modules/oraclejet/dist/js/libs/oj/resources'
    }).pipe(gulp.dest(configuration.paths.dist + 'ojtranslations/'))

    //Font awesome
    var faCss = gulp.src('src/bower_modules/font-awesome/css/font-awesome.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        faFonts = gulp.src('./src/bower_modules/font-awesome/fonts/**/*', {
            base: './src/bower_modules/font-awesome/'
        })

    var combinedCss = es.concat(appCss, faCss).pipe(concat('css.css'))

    return es.concat(combinedCss, faFonts, ojImgFilesCommon, ojImgFilesSpecific)
        .pipe(gulp.dest(configuration.paths.dist));
});