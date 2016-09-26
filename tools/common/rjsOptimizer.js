import shell from 'shelljs'
import require from 'requirejs'
import path from 'path'
import fs from 'fs'
import vm from 'vm'

import {requireJsConfig} from '../config/rjs'

var requirejsDev = fs.readFileSync('src/app/require.config.js')
const bowerCfg =  JSON.parse(fs.readFileSync(path.resolve('.bowerrc')))

let optimize = function(cfg){
    return new Promise((resolve, reject)=>{
        cfg.output = resolve
        try {
            require.optimize(
                cfg,
                function (success) {
                    console.log(success)
                    resolve(success)
                },
                function (err) {
                    reject(err)
                });
        } catch (e) {
            reject(e)
        }

    })
}

async function rjsOptimizer(args) {
    //Take bower_modules from src
    let requirejsDevCfg = vm.runInNewContext( `${requirejsDev}; require`)

    let mergedPaths = Object.assign(requireJsConfig.paths, requirejsDevCfg.paths)
    Object.keys(mergedPaths)
        .map(f=>{
            mergedPaths[f] = mergedPaths[f].replace('bower_modules', `../${bowerCfg.directory}`)
        })

    // Includes all modules used explicity
    // Remains the native requireJS deps that are excluded
    let includes = requireJsConfig.include
    let exclude = ["jqueryui-amd","ojs","ojtranslations"]
    Object.keys(mergedPaths)
        .filter(f=>exclude.indexOf(f)<0)
        .map(f=>{
            includes.push(mergedPaths[f])
        })

    await optimize({
        out: './temp/scripts.js',
        baseUrl: './temp',
        name: 'app/startup',
        paths: mergedPaths,
        include: requireJsConfig.include,
        insertRequire: ['app/startup'],
        shim: requirejsDevCfg.shim,
        bundles: {}
    })
}



export default rjsOptimizer;