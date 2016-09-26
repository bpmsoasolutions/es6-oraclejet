import shell from 'shelljs'

async function serve() {
    shell.cd('app')
    shell.exec(`cordova serve`);
    shell.cd('..')
}

export default serve;