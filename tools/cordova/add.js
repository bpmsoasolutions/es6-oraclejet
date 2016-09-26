import shell from 'shelljs'

// $ add [array(PLATFORMS)]

async function add(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    shell.cd('app')
    args.map(target=>{
        shell.exec(`cordova platform rm ${target}`);
        shell.exec(`cordova platform add ${target}`);
    })
    shell.cd('..')
}

export default add;


