import gulp from 'gulp'
import shell from 'shelljs'
import {argv} from 'yargs'
import path from 'path'
import del from 'del'

import configuration from '../configuration'

const logCommand = (error, stdout, stderr) => {
    if (error) console.error(error)

    console.log(stdout)
}

gulp.task('cordova:plugins', function () {

    let pluginPath = path.resolve(configuration.paths.cordovaPluginsFile)
    let plugins = require(pluginPath);

    shell.cd('app')

    // Loop in plugins
    Object.keys(plugins)
        .map((key)=>{
            let plugin = plugins[key]
            let id = (plugin.source.id) ? plugin.source.id : plugin.source.url
            let variables = ''

            // Manage variables
            if (plugin.variables && Object.keys(plugin.variables).length > 0) {
                variables += '--variable'
                Object.keys(plugin.variables)
                    .map((key)=>{
                        variables += ` ${key}=${plugin.variables[key]}`
                    })
            }

            shell.exec(`cordova plugin add ${id} ${variables}`, logCommand);
        })
    shell.cd('..')
});

gulp.task('cordova:prepare', function () {
    shell.cd('app')
    shell.exec('cordova prepare', logCommand);
    shell.cd('..')
})

gulp.task('cordova:compile', function () {

    let buildCfg = (argv.bcfg) ? `--build-config=${argv.bcfg}` : ''
    let buildType = (argv.release) ? '--release' : '--debug'
    let target = (argv.target) ? ` ${argv.target} ` : ''

    shell.cd('app')
    shell.exec(`cordova compile ${target} ${buildType} ${buildCfg}`, logCommand);
    shell.cd('..')
})

gulp.task('cordova:run', function () {
    if (!argv.target) console.log("No target specified.Exiting...")

    shell.cd('app')
    shell.exec(`cordova run ${argv.target}`, logCommand);
    shell.cd('..')
})

gulp.task('cordova:ripple', function () {
    let ripplePath = path.resolve('node_modules/.bin/ripple')

    shell.cd('app')
    shell.exec(`${ripplePath} emulate`, logCommand);
    shell.cd('..')
})

//Clean cordova files and folders

gulp.task('cordova clean platforms', (cb) => {
    return del([
        configuration.paths.cordovaPlatforms + configuration.allFiles,
        `!${configuration.paths.cordovaPlatforms}/platforms.json`
    ], cb)
});

gulp.task('cordova clean plugins', (cb) => {
    return del([
        configuration.paths.cordovaPlugins + configuration.allFiles,
        `!${configuration.paths.cordovaPlugins}/fetch.json`
    ], cb)
});

gulp.task('cordova clean merges', (cb) => {
    return del([
        configuration.paths.cordovaMerges + configuration.allFiles
    ], cb)
});

gulp.task('cordova clean www', (cb) => {
    return del([
        configuration.paths.cordovaWWW + configuration.allFiles
    ], cb)
});

gulp.task('cordova:clean', ['cordova clean platforms', 'cordova clean plugins', 'cordova clean merges', 'cordova clean www'])