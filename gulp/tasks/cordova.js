var gulp = require('gulp')
var shell = require('shelljs/global')
var exec = require('child_process').exec;
var argv = require('yargs').argv;

import configuration from '../configuration'

function logCommand(error, stdout, stderr) {
    if (error)
        console.error(error)

    console.log(stdout)
}

gulp.task('cordova:plugins', function () {

    var plugins = require('../../' + configuration.paths.cordovaPluginsFile);
    var pluginlist = [];

    for( var prop in plugins) {
        let result = {}

        result['id'] = (plugins[prop].source.id) ? plugins[prop].source.id : plugins[prop].source.url
        result['vars'] = (plugins[prop].variables && Object.keys(plugins[prop].variables).length > 0) ? plugins[prop].variables : null

        pluginlist.push(result)
    }

    pluginlist.map(function(plug) {
        if (plug.vars){
            let text = " --variable "
            Object.keys(plug.vars)
                .map((key)=>{
                    text = `${text} ${key}=${plug.vars[key]}`
                })

            exec("cd app" + configuration.separatorCLI + "cordova plugin add " + plug.id + text, logCommand);
        } else {
            exec("cd app" + configuration.separatorCLI + "cordova plugin add " + plug.id, logCommand);
        }
    });
});

gulp.task('cordova:prepare', function () {
    exec("cd app" + configuration.separatorCLI + "cordova prepare")
})

gulp.task('cordova:compile', function () {

    let optional = ""
    if (argv.bcfg){
		console.log("asasasas")
        optional = optional + '--build-config=' + argv.bcfg
    }

    if (argv.release){
        optional = optional + ' --release'
    } else {
        optional = optional + ' --debug'
    }

    if(argv.target){
        exec("cd app" + configuration.separatorCLI + "cordova compile " + argv.target + optional, logCommand)
    } else {
        exec("cd app" + configuration.separatorCLI + "cordova compile" + optional, logCommand)
    }
})

gulp.task('cordova:run', function () {
    if(argv.target){
        exec("cd app" + configuration.separatorCLI + "cordova run " + argv.target, logCommand)
    } else {
        console.log("No target specified...")
    }
})
gulp.task('cordova:emuweb', function () {
	exec("cd app" + configuration.separatorCLI + "ripple emulate", logCommand)
})