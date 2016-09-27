import shell from 'shelljs'

import recreateDir from './utils/recreateDir'
import copyByFound from './utils/copyByFound'
import copyFolders from './utils/copyFolders'
import clean from './utils/clean'

import jet from './common/jet'
import rjsOptimizer from './common/rjsOptimizer'
import components from './common/components'
import htmlReplace from './common/htmlReplace'

import prepare from './cordova/prepare'
import compile from './cordova/compile'

import run from './run'

// $ devCordova

async function devCordova(args) {
    await run(recreateDir, 'temp app/www')
    await run(assets, 'temp')
    await run(components, 'temp')
    await run(htmlReplace, '--cordova')
    await run(copyFolders, 'src/bower_modules temp/bower_modules')
    await run(copyFolders, 'temp app/www')
    await run(clean, 'temp')
    await run(prepare)
    await run(compile)
}

export default devCordova;


