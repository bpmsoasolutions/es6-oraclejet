import shell from 'shelljs'

async function prepare() {
    shell.cd('app')
    shell.exec('cordova prepare')
    shell.cd('..')
}

export default prepare;