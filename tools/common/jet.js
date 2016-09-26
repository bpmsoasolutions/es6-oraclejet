import shell from 'shelljs'

import recreateDir from '../utils/recreateDir'
import copyFolders from '../utils/copyFolders'
import copy from '../utils/copy'

import run from '../run'


const platforms = [
    { in: 'alta-android', out: 'android'},
    { in: 'alta-ios', out: 'ios'},
    { in: 'alta-windows', out: 'windows'},
    { in: 'alta', out: 'browser'}
]

const jetPath = './src/bower_modules/oraclejet/dist'

// $ jetAssets [cordova]

async function jetAssets(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    let cordova = (args.indexOf('--cordova') > -1)

    let destination = (cordova) ? 'app/www' : 'dist'

    if (cordova) {
        platforms.map((platform) => {
            run(recreateDir, `app/merges/${platform.out} app/merges/${platform.out}/images app/merges/${platform.out}/fonts`)
            run(copy, `-f ${jetPath}/css/${platform.in}/oj-alta.css app/merges/${platform.out}`)
            run(copyFolders, `${jetPath}/css/${platform.in}/images app/merges/${platform.out}/images`)
            run(copyFolders, `${jetPath}/css/${platform.in}/fonts app/merges/${platform.out}/fonts`)
        })
    } else {
        await run(copyFolders, `${jetPath}/css/alta/fonts ${destination}/fonts`)
        await run(copy, `-f ${jetPath}/css/alta/oj-alta.css ${destination}`)
        await run(copyFolders, `${jetPath}/css/alta/images ${destination}/images`)
    }

    await run(copyFolders, `${jetPath}/css/common ${destination}/common`)
    await run(copyFolders, `${jetPath}/js/libs/oj/resources ${destination}/resources`)
    await run(recreateDir, `${destination}/ojtranslations`)
    await run(copyFolders, `${jetPath}/js/libs/oj/resources/nls ${destination}/ojtranslations/nls`)
}

export default jetAssets;




