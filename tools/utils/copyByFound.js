import shell from 'shelljs'

const copyWithPath = function(filePath, sourceBase, destinationBase){
    let arrFullyPath = filePath.replace(sourceBase, destinationBase).split('/')
    let destArrPath = arrFullyPath.slice(0, arrFullyPath.length-1)
    let destPath = destArrPath.join('/')

    if (!shell.test('-e', destPath)){
        destArrPath.reduce((last, actual, index, arr) => {
            last.push(actual)

            if (shell.test('-e', last.join('/'))){
                return last
            }

            shell.mkdir(last.join('/'))
            return last
        },[])
    }

    return shell.cp('-Rf', filePath, destPath)
}

// $ copyByFound [regex to find] [source base] [destination base] [regex to omit files found]

async function copyByFound(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    let files = shell.ls(args[0])

    if (args[3]){
        files.filter(e => e.indexOf(args[3])<0 )
    }

    files
        .map(f=>{
            return copyWithPath(f, args[1], args[2])
        })
}

export default copyByFound;
