import path from 'path'
import shell from 'shelljs'

async function fontAwesome(css, output){
    await run(copyFolders, `src/bower_modules/font-awesome/fonts ${output}/fonts`)

    let faCss = fs.readFileSync('src/bower_modules/font-awesome/css/font-awesome.css', 'utf-8')
    faCss = faCss.replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')

    css += faCss
}

async function assets(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    let output = (args[0]) ? args[0] : 'temp'
    let minize = (args.indexOf('-m') > -1)
    let bowerModules = (args.indexOf('--bower-modules') > -1)

    //Parse scss
    let css = shell.exec(`${path.resolve('node_modules/.bin/node-sass')} src/scss/styles.scss`, {silent: true})

    //Join css and other assets bower_module tasks
    if (bowerModules){
        await fontAwesome(css, output)
    }

    if (minize){
        shell.ShellString(css)
            .exec(`${path.resolve('node_modules/.bin/uglifycss')}`, {silent: true})
            .to(`${output}/styles.css`)
    } else {
        shell.ShellString(css)
            .to(`${output}/styles.css`)
    }
}

export default assets;