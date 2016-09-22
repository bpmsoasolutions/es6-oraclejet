import gulp from 'gulp'
import replace from 'gulp-replace'
import es from 'event-stream'
import concat from 'gulp-concat'
import sass from 'gulp-sass'

import configuration from '../configuration'

gulp.task('assetsJET', ['images:jet-merges', 'css:jet-merges', 'fonts:jet-merges', 'assets:jet-common'], function () {})

const jetCssPath = './src/bower_modules/oraclejet/dist/css'
const platforms = [
    { in: 'alta-android', out: 'android'},
    { in: 'alta-ios', out: 'ios'},
    { in: 'alta-windows', out: 'windows'},
    { in: 'alta', out: 'browser'}
]
gulp.task('images:jet-merges', function () {
    platforms.map((platform)=>{
        gulp.src(`${jetCssPath}/${platform.in}/images/**/*`, {
            base: `${jetCssPath}/${platform.in}`
        }).pipe(gulp.dest(`${configuration.paths.cordovaMerges}${platform.out}`));
    })
})

gulp.task('css:jet-merges', function () {
    platforms.map((platform)=>{
        gulp.src(`${jetCssPath}/${platform.in}/oj-alta.css`, {
            base: `${jetCssPath}/${platform.in}`
        }).pipe(gulp.dest(`${configuration.paths.cordovaMerges}${platform.out}`));
    })
})

gulp.task('fonts:jet-merges', function () {
    platforms.map((platform)=>{
        gulp.src(`${jetCssPath}/${platform.in}/fonts/**/*`, {
            base: `${jetCssPath}/${platform.in}`
        }).pipe(gulp.dest(`${configuration.paths.cordovaMerges}${platform.out}`));
    })
})

gulp.task('assets:jet-common', function () {
    let ojImgFilesCommon = gulp.src('./src/bower_modules/oraclejet/dist/css/common/**/*', {
        base: './src/bower_modules/oraclejet/dist/css/'
    })
    let ojImgFilesSpecific = gulp.src('./src/bower_modules/oraclejet/dist/js/libs/oj/resources/**/*', {
        base: './src/bower_modules/oraclejet/dist/js/libs/oj'
    })

    gulp.src('./src/bower_modules/oraclejet/dist/js/libs/oj/resources/nls/**/*', {
        base: './src/bower_modules/oraclejet/dist/js/libs/oj/resources'
    }).pipe(gulp.dest(configuration.paths.dist + 'ojtranslations/'))

    return es.concat(ojImgFilesCommon, ojImgFilesSpecific)
        .pipe(gulp.dest(configuration.paths.dist));
})

///_______
gulp.task('css', function () {
    let appCss = gulp.src('src/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))

    //Font awesome
    let faCss = gulp.src('src/bower_modules/font-awesome/css/font-awesome.min.css')
        .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'))
    let faFonts = gulp.src('./src/bower_modules/font-awesome/fonts/**/*', {
        base: './src/bower_modules/font-awesome/'
    })

    let combinedCss = es.concat(appCss, faCss).pipe(concat('css.css'))

    return es.concat(combinedCss, faFonts)
        .pipe(gulp.dest(configuration.paths.dist));
});