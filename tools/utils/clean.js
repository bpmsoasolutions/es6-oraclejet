import del from 'del';

async function clean(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    await del(args)
}

export default clean;