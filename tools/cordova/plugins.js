import path from 'path'
import shell from 'shelljs'

async function plugins() {
    let pluginPath = path.resolve('app/plugins/fetch.json')
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

            shell.exec(`cordova plugin add ${id} ${variables}`)
        })

    shell.cd('..')
}

export default plugins;