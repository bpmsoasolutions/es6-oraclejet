import shell from 'shelljs'
import path from 'path'

async function ripple() {
    let ripplePath = path.resolve('node_modules/.bin/ripple')

    shell.cd('app')
    shell.exec(`${ripplePath} emulate`);
    shell.cd('..')
}

export default ripple;