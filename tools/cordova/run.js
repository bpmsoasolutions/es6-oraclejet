import shell from 'shelljs'

// $ cordovaCompile --target=''

async function run(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    shell.cd('app')
    shell.exec(`cordova run ${args.join(' ')}`);
    shell.cd('..')
}

export default run;