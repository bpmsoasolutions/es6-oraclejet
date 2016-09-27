import shell from 'shelljs'

// $ copy [options] [source] [destination]

async function copy(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    shell.cp(...args)
}

export default copy;